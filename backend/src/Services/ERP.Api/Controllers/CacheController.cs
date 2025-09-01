using ERP.BuildingBlocks.Data.Caching;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ERP.Api.Controllers;

/// <summary>
/// Controller to demonstrate and manage SqlDependency caching functionality
/// </summary>
[ApiController]
[Route("api/v1/[controller]")]
[Authorize]
public class CacheController : ControllerBase
{
    private readonly ISqlDependencyCacheService _cacheService;
    private readonly ILogger<CacheController> _logger;

    public CacheController(
        ISqlDependencyCacheService cacheService,
        ILogger<CacheController> logger)
    {
        _cacheService = cacheService ?? throw new ArgumentNullException(nameof(cacheService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
    }

    /// <summary>
    /// Get cache statistics
    /// </summary>
    /// <returns>Cache statistics including hit ratio and entry count</returns>
    [HttpGet("statistics")]
    public ActionResult<CacheStatistics> GetStatistics()
    {
        try
        {
            var stats = _cacheService.GetStatistics();
            _logger.LogInformation("Cache statistics requested - Entries: {Entries}, Hit Ratio: {HitRatio}%", 
                stats.TotalEntries, stats.HitRatio.ToString("F2"));
            
            return Ok(stats);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving cache statistics");
            return StatusCode(500, new { message = "Error retrieving cache statistics" });
        }
    }

    /// <summary>
    /// Clear all cache entries
    /// </summary>
    /// <returns>Success confirmation</returns>
    [HttpDelete("clear")]
    [Authorize(Roles = "Administrator")]
    public ActionResult ClearCache()
    {
        try
        {
            _cacheService.Clear();
            _logger.LogWarning("All cache entries cleared by user");
            
            return Ok(new { message = "Cache cleared successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error clearing cache");
            return StatusCode(500, new { message = "Error clearing cache" });
        }
    }

    /// <summary>
    /// Remove specific cache entry
    /// </summary>
    /// <param name="key">Cache key to remove</param>
    /// <returns>Success confirmation</returns>
    [HttpDelete("remove/{key}")]
    [Authorize(Roles = "Administrator")]
    public ActionResult RemoveCacheEntry(string key)
    {
        if (string.IsNullOrEmpty(key))
        {
            return BadRequest(new { message = "Cache key cannot be empty" });
        }

        try
        {
            _cacheService.Remove(key);
            _logger.LogInformation("Cache entry removed: {CacheKey}", key);
            
            return Ok(new { message = $"Cache entry '{key}' removed successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error removing cache entry: {CacheKey}", key);
            return StatusCode(500, new { message = "Error removing cache entry" });
        }
    }

    /// <summary>
    /// Test SqlDependency caching with a sample query
    /// </summary>
    /// <returns>Sample cached data</returns>
    [HttpGet("test")]
    public async Task<ActionResult<object>> TestCache()
    {
        try
        {
            var cacheKey = "test_cache_entry";
            var connectionString = HttpContext.RequestServices
                .GetRequiredService<IConfiguration>()
                .GetConnectionString("DefaultConnection");

            var result = await _cacheService.GetOrSetAsync<dynamic>(
                cacheKey,
                async () =>
                {
                    // Simulate data retrieval
                    await Task.Delay(100); // Simulate database delay
                    
                    return new
                    {
                        Id = 1,
                        Name = "Test Item",
                        Description = "This is a test cache entry",
                        CreatedAt = DateTime.UtcNow,
                        CachedAt = DateTime.UtcNow
                    };
                },
                "SELECT 1", // Simple query for SqlDependency monitoring
                connectionString!,
                TimeSpan.FromMinutes(5)
            );

            return Ok(new
            {
                data = result,
                fromCache = true,
                timestamp = DateTime.UtcNow
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error testing cache");
            return StatusCode(500, new { message = "Error testing cache" });
        }
    }
}
