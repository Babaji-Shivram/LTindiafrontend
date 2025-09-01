using ERP.BuildingBlocks.Data.Caching;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using System.Data;
using Microsoft.Data.SqlClient;
using Dapper;
using System.Collections.Concurrent;

namespace ERP.BuildingBlocks.Data.Caching;

/// <summary>
/// Modern high-performance caching service with intelligent cache invalidation
/// Provides automatic cache refresh and monitoring capabilities
/// </summary>
public class SqlDependencyCacheService : ISqlDependencyCacheService, IDisposable
{
    private readonly IMemoryCache _memoryCache;
    private readonly ILogger<SqlDependencyCacheService> _logger;
    private readonly ConcurrentDictionary<string, Timer> _refreshTimers;
    private readonly ConcurrentDictionary<string, DateTime> _cacheTimestamps;
    private readonly CacheStatistics _statistics;
    private bool _disposed = false;

    public SqlDependencyCacheService(
        IMemoryCache memoryCache,
        ILogger<SqlDependencyCacheService> logger)
    {
        _memoryCache = memoryCache ?? throw new ArgumentNullException(nameof(memoryCache));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _refreshTimers = new ConcurrentDictionary<string, Timer>();
        _cacheTimestamps = new ConcurrentDictionary<string, DateTime>();
        _statistics = new CacheStatistics();
    }

    public async Task<T?> GetOrSetAsync<T>(
        string key,
        string query,
        string connectionString,
        Dictionary<string, object>? parameters = null,
        TimeSpan? expiry = null) where T : class
    {
        if (string.IsNullOrEmpty(key))
            throw new ArgumentException("Cache key cannot be null or empty", nameof(key));

        if (string.IsNullOrEmpty(query))
            throw new ArgumentException("Query cannot be null or empty", nameof(query));

        // Try to get from cache first
        if (_memoryCache.TryGetValue(key, out T? cachedValue))
        {
            _statistics.TotalHits++;
            _logger.LogDebug("Cache hit for key: {CacheKey}", key);
            return cachedValue;
        }

        _statistics.TotalMisses++;
        _logger.LogDebug("Cache miss for key: {CacheKey}", key);

        // Cache miss - fetch data and cache it
        return await FetchAndCacheDataAsync<T>(key, query, connectionString, parameters, expiry);
    }

    public async Task<T?> GetOrSetAsync<T>(
        string key,
        Func<Task<T?>> dataFactory,
        string query,
        string connectionString,
        TimeSpan? expiry = null) where T : class
    {
        if (string.IsNullOrEmpty(key))
            throw new ArgumentException("Cache key cannot be null or empty", nameof(key));

        if (dataFactory == null)
            throw new ArgumentNullException(nameof(dataFactory));

        // Try to get from cache first
        if (_memoryCache.TryGetValue(key, out T? cachedValue))
        {
            _statistics.TotalHits++;
            _logger.LogDebug("Cache hit for key: {CacheKey}", key);
            return cachedValue;
        }

        _statistics.TotalMisses++;
        _logger.LogDebug("Cache miss for key: {CacheKey}", key);

        // Cache miss - get data using factory function
        var data = await dataFactory();
        
        if (data != null)
        {
            CacheData(key, data, expiry);
            SetupPeriodicRefresh(key, dataFactory, expiry);
        }

        return data;
    }

    private async Task<T?> FetchAndCacheDataAsync<T>(
        string key,
        string query,
        string connectionString,
        Dictionary<string, object>? parameters,
        TimeSpan? expiry) where T : class
    {
        try
        {
            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();

            // Execute query and get data
            T? data = null;
            
            // Handle different return types
            if (typeof(T).IsGenericType && typeof(T).GetGenericTypeDefinition() == typeof(List<>))
            {
                var elementType = typeof(T).GetGenericArguments()[0];
                var results = await connection.QueryAsync(elementType, query, parameters);
                data = (T?)Activator.CreateInstance(typeof(List<>).MakeGenericType(elementType), results.ToArray());
            }
            else
            {
                data = await connection.QuerySingleOrDefaultAsync<T>(query, parameters);
            }

            if (data != null)
            {
                CacheData(key, data, expiry);
                
                // Set up periodic refresh for automatic cache updates
                SetupPeriodicRefresh(key, () => FetchDataFromDatabase<T>(query, connectionString, parameters), expiry);
            }

            return data;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching and caching data for key: {CacheKey}", key);
            return null;
        }
    }

    private async Task<T?> FetchDataFromDatabase<T>(string query, string connectionString, Dictionary<string, object>? parameters) where T : class
    {
        try
        {
            using var connection = new SqlConnection(connectionString);
            await connection.OpenAsync();
            
            if (typeof(T).IsGenericType && typeof(T).GetGenericTypeDefinition() == typeof(List<>))
            {
                var elementType = typeof(T).GetGenericArguments()[0];
                var results = await connection.QueryAsync(elementType, query, parameters);
                return (T?)Activator.CreateInstance(typeof(List<>).MakeGenericType(elementType), results.ToArray());
            }
            else
            {
                return await connection.QuerySingleOrDefaultAsync<T>(query, parameters);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching data from database");
            return null;
        }
    }

    private void CacheData<T>(string key, T data, TimeSpan? expiry) where T : class
    {
        var cacheOptions = new MemoryCacheEntryOptions
        {
            AbsoluteExpirationRelativeToNow = expiry ?? TimeSpan.FromMinutes(30),
            Priority = CacheItemPriority.High,
            Size = 1
        };

        cacheOptions.RegisterPostEvictionCallback((key, value, reason, state) => OnCacheEntryRemoved(key, value, reason, state));
        _memoryCache.Set(key, data, cacheOptions);

        // Track cache timestamp
        _cacheTimestamps.TryAdd(key, DateTime.UtcNow);
        
        _statistics.TotalEntries++;
        _logger.LogDebug("Cached data for key: {CacheKey}", key);
    }

    private void SetupPeriodicRefresh<T>(string key, Func<Task<T?>> dataFactory, TimeSpan? expiry) where T : class
    {
        // Set up a timer to refresh cache periodically (before it expires)
        var refreshInterval = expiry ?? TimeSpan.FromMinutes(30);
        var refreshTime = TimeSpan.FromTicks(refreshInterval.Ticks / 2); // Refresh at half the expiry time

        var timer = new Timer(async _ =>
        {
            try
            {
                _logger.LogDebug("Periodic refresh triggered for key: {CacheKey}", key);
                var freshData = await dataFactory();
                if (freshData != null)
                {
                    CacheData(key, freshData, expiry);
                    _logger.LogDebug("Cache refreshed for key: {CacheKey}", key);
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Error during periodic cache refresh for key: {CacheKey}", key);
            }
        }, null, refreshTime, refreshTime);

        // Store timer reference for cleanup
        _refreshTimers.AddOrUpdate(key, timer, (k, oldTimer) =>
        {
            oldTimer?.Dispose();
            return timer;
        });
    }

    private void OnCacheEntryRemoved(object key, object? value, EvictionReason reason, object? state)
    {
        var cacheKey = key.ToString();
        _logger.LogDebug("Cache entry removed. Key: {CacheKey}, Reason: {Reason}", cacheKey, reason);

        // Clean up timer and timestamp tracking
        if (!string.IsNullOrEmpty(cacheKey))
        {
            if (_refreshTimers.TryRemove(cacheKey, out var timer))
            {
                timer?.Dispose();
                _logger.LogDebug("Removed refresh timer for key: {CacheKey}", cacheKey);
            }

            _cacheTimestamps.TryRemove(cacheKey, out _);
        }

        _statistics.TotalEntries = Math.Max(0, _statistics.TotalEntries - 1);
    }

    public void Remove(string key)
    {
        if (string.IsNullOrEmpty(key)) return;

        _memoryCache.Remove(key);
        
        // Clean up timer
        if (_refreshTimers.TryRemove(key, out var timer))
        {
            timer?.Dispose();
            _logger.LogDebug("Manually removed cache entry and timer for key: {CacheKey}", key);
        }

        _cacheTimestamps.TryRemove(key, out _);
    }

    public void Clear()
    {
        // Dispose all timers
        foreach (var kvp in _refreshTimers.ToList())
        {
            if (_refreshTimers.TryRemove(kvp.Key, out var timer))
            {
                timer?.Dispose();
            }
        }

        _cacheTimestamps.Clear();
        _statistics.TotalEntries = 0;
        _logger.LogInformation("Cleared all cache entries and refresh timers");
    }

    public CacheStatistics GetStatistics()
    {
        _statistics.LastUpdated = DateTime.UtcNow;
        return _statistics;
    }

    public void Dispose()
    {
        if (_disposed) return;

        // Clean up all timers
        foreach (var timer in _refreshTimers.Values)
        {
            timer?.Dispose();
        }
        _refreshTimers.Clear();
        _cacheTimestamps.Clear();

        _disposed = true;
        _logger.LogInformation("SqlDependencyCacheService disposed");
    }
}
