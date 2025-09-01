using Microsoft.Extensions.Caching.Memory;

namespace ERP.BuildingBlocks.Data.Caching;

/// <summary>
/// Interface for SqlDependency-based caching service that provides automatic cache invalidation
/// when database changes occur
/// </summary>
public interface ISqlDependencyCacheService
{
    /// <summary>
    /// Get data from cache with SqlDependency monitoring
    /// </summary>
    /// <typeparam name="T">Type of data to cache</typeparam>
    /// <param name="key">Cache key</param>
    /// <param name="query">SQL query to execute if cache miss</param>
    /// <param name="connectionString">Database connection string</param>
    /// <param name="parameters">Query parameters</param>
    /// <param name="expiry">Cache expiration time (optional)</param>
    /// <returns>Cached or fresh data</returns>
    Task<T?> GetOrSetAsync<T>(
        string key,
        string query,
        string connectionString,
        Dictionary<string, object>? parameters = null,
        TimeSpan? expiry = null) where T : class;

    /// <summary>
    /// Get data from cache with SqlDependency monitoring using a data factory function
    /// </summary>
    /// <typeparam name="T">Type of data to cache</typeparam>
    /// <param name="key">Cache key</param>
    /// <param name="dataFactory">Function to retrieve data if cache miss</param>
    /// <param name="query">SQL query for SqlDependency monitoring</param>
    /// <param name="connectionString">Database connection string</param>
    /// <param name="expiry">Cache expiration time (optional)</param>
    /// <returns>Cached or fresh data</returns>
    Task<T?> GetOrSetAsync<T>(
        string key,
        Func<Task<T?>> dataFactory,
        string query,
        string connectionString,
        TimeSpan? expiry = null) where T : class;

    /// <summary>
    /// Remove specific cache entry
    /// </summary>
    /// <param name="key">Cache key to remove</param>
    void Remove(string key);

    /// <summary>
    /// Clear all cache entries
    /// </summary>
    void Clear();

    /// <summary>
    /// Get cache statistics
    /// </summary>
    /// <returns>Cache statistics</returns>
    CacheStatistics GetStatistics();
}

/// <summary>
/// Cache statistics information
/// </summary>
public class CacheStatistics
{
    public int TotalEntries { get; set; }
    public long TotalHits { get; set; }
    public long TotalMisses { get; set; }
    public double HitRatio => TotalHits + TotalMisses > 0 ? (double)TotalHits / (TotalHits + TotalMisses) * 100 : 0;
    public DateTime LastUpdated { get; set; } = DateTime.UtcNow;
}
