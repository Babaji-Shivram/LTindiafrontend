using ERP.BuildingBlocks.Data.Caching;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Caching.Memory;

namespace ERP.BuildingBlocks.Data.Extensions;

/// <summary>
/// Extension methods for registering SqlDependency caching services
/// </summary>
public static class SqlDependencyCacheExtensions
{
    /// <summary>
    /// Add SqlDependency caching services to the service collection
    /// </summary>
    /// <param name="services">The service collection</param>
    /// <param name="configureMemoryCache">Optional configuration for memory cache</param>
    /// <returns>The service collection for chaining</returns>
    public static IServiceCollection AddSqlDependencyCache(
        this IServiceCollection services,
        Action<MemoryCacheOptions>? configureMemoryCache = null)
    {
        // Add memory cache if not already registered
        if (configureMemoryCache != null)
        {
            services.AddMemoryCache(configureMemoryCache);
        }
        else
        {
            services.AddMemoryCache(options =>
            {
                options.SizeLimit = 1000; // Max 1000 cache entries
                options.CompactionPercentage = 0.25; // Remove 25% when limit reached
                options.ExpirationScanFrequency = TimeSpan.FromMinutes(5); // Check for expired entries every 5 minutes
            });
        }

        // Register SqlDependency cache service
        services.AddSingleton<ISqlDependencyCacheService, SqlDependencyCacheService>();

        return services;
    }

    /// <summary>
    /// Add SqlDependency caching services with custom configuration
    /// </summary>
    /// <param name="services">The service collection</param>
    /// <param name="sizeLimit">Maximum number of cache entries</param>
    /// <param name="compactionPercentage">Percentage of entries to remove when size limit is reached</param>
    /// <param name="expirationScanFrequency">How often to scan for expired entries</param>
    /// <returns>The service collection for chaining</returns>
    public static IServiceCollection AddSqlDependencyCache(
        this IServiceCollection services,
        int sizeLimit = 1000,
        double compactionPercentage = 0.25,
        TimeSpan? expirationScanFrequency = null)
    {
        return services.AddSqlDependencyCache(options =>
        {
            options.SizeLimit = sizeLimit;
            options.CompactionPercentage = compactionPercentage;
            options.ExpirationScanFrequency = expirationScanFrequency ?? TimeSpan.FromMinutes(5);
        });
    }
}
