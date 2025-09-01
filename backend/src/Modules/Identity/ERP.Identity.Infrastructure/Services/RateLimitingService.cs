using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ERP.Identity.Domain.Services;

namespace ERP.Identity.Infrastructure.Services;

public class RateLimitingService : IRateLimitingService
{
    private readonly ILogger<RateLimitingService> _logger;
    private readonly Dictionary<RateLimitType, RateLimitConfiguration> _configurations;

    // In-memory storage for demonstration - replace with Redis or database
    private static readonly Dictionary<string, RateLimitStatus> _rateLimits = new();
    private static readonly Dictionary<string, DateTime> _blockedKeys = new();

    public RateLimitingService(ILogger<RateLimitingService> logger, IConfiguration configuration)
    {
        _logger = logger;
        _configurations = InitializeConfigurations(configuration);
    }

    private static Dictionary<RateLimitType, RateLimitConfiguration> InitializeConfigurations(IConfiguration configuration)
    {
        return new Dictionary<RateLimitType, RateLimitConfiguration>
        {
            [RateLimitType.Login] = new RateLimitConfiguration
            {
                Type = RateLimitType.Login,
                MaxRequests = int.Parse(configuration["RateLimit:Login:MaxRequests"] ?? "5"),
                WindowSize = TimeSpan.FromMinutes(int.Parse(configuration["RateLimit:Login:WindowMinutes"] ?? "15")),
                BlockDuration = TimeSpan.FromMinutes(int.Parse(configuration["RateLimit:Login:BlockMinutes"] ?? "30")),
                EnableAutoBlock = bool.Parse(configuration["RateLimit:Login:EnableAutoBlock"] ?? "true")
            },
            [RateLimitType.TokenRefresh] = new RateLimitConfiguration
            {
                Type = RateLimitType.TokenRefresh,
                MaxRequests = int.Parse(configuration["RateLimit:TokenRefresh:MaxRequests"] ?? "10"),
                WindowSize = TimeSpan.FromMinutes(int.Parse(configuration["RateLimit:TokenRefresh:WindowMinutes"] ?? "5")),
                BlockDuration = TimeSpan.FromMinutes(int.Parse(configuration["RateLimit:TokenRefresh:BlockMinutes"] ?? "15")),
                EnableAutoBlock = bool.Parse(configuration["RateLimit:TokenRefresh:EnableAutoBlock"] ?? "true")
            },
            [RateLimitType.PasswordReset] = new RateLimitConfiguration
            {
                Type = RateLimitType.PasswordReset,
                MaxRequests = int.Parse(configuration["RateLimit:PasswordReset:MaxRequests"] ?? "3"),
                WindowSize = TimeSpan.FromHours(int.Parse(configuration["RateLimit:PasswordReset:WindowHours"] ?? "1")),
                BlockDuration = TimeSpan.FromHours(int.Parse(configuration["RateLimit:PasswordReset:BlockHours"] ?? "24")),
                EnableAutoBlock = bool.Parse(configuration["RateLimit:PasswordReset:EnableAutoBlock"] ?? "true")
            },
            [RateLimitType.Registration] = new RateLimitConfiguration
            {
                Type = RateLimitType.Registration,
                MaxRequests = int.Parse(configuration["RateLimit:Registration:MaxRequests"] ?? "3"),
                WindowSize = TimeSpan.FromHours(int.Parse(configuration["RateLimit:Registration:WindowHours"] ?? "1")),
                BlockDuration = TimeSpan.FromHours(int.Parse(configuration["RateLimit:Registration:BlockHours"] ?? "6")),
                EnableAutoBlock = bool.Parse(configuration["RateLimit:Registration:EnableAutoBlock"] ?? "true")
            },
            [RateLimitType.PermissionCheck] = new RateLimitConfiguration
            {
                Type = RateLimitType.PermissionCheck,
                MaxRequests = int.Parse(configuration["RateLimit:PermissionCheck:MaxRequests"] ?? "100"),
                WindowSize = TimeSpan.FromMinutes(int.Parse(configuration["RateLimit:PermissionCheck:WindowMinutes"] ?? "1")),
                BlockDuration = TimeSpan.FromMinutes(int.Parse(configuration["RateLimit:PermissionCheck:BlockMinutes"] ?? "5")),
                EnableAutoBlock = bool.Parse(configuration["RateLimit:PermissionCheck:EnableAutoBlock"] ?? "false")
            },
            [RateLimitType.ApiCall] = new RateLimitConfiguration
            {
                Type = RateLimitType.ApiCall,
                MaxRequests = int.Parse(configuration["RateLimit:ApiCall:MaxRequests"] ?? "1000"),
                WindowSize = TimeSpan.FromHours(int.Parse(configuration["RateLimit:ApiCall:WindowHours"] ?? "1")),
                BlockDuration = TimeSpan.FromMinutes(int.Parse(configuration["RateLimit:ApiCall:BlockMinutes"] ?? "15")),
                EnableAutoBlock = bool.Parse(configuration["RateLimit:ApiCall:EnableAutoBlock"] ?? "false")
            },
            [RateLimitType.DataAccess] = new RateLimitConfiguration
            {
                Type = RateLimitType.DataAccess,
                MaxRequests = int.Parse(configuration["RateLimit:DataAccess:MaxRequests"] ?? "500"),
                WindowSize = TimeSpan.FromHours(int.Parse(configuration["RateLimit:DataAccess:WindowHours"] ?? "1")),
                BlockDuration = TimeSpan.FromMinutes(int.Parse(configuration["RateLimit:DataAccess:BlockMinutes"] ?? "30")),
                EnableAutoBlock = bool.Parse(configuration["RateLimit:DataAccess:EnableAutoBlock"] ?? "false")
            }
        };
    }

    public async Task<bool> IsRequestAllowedAsync(string key, RateLimitType type, string? additionalContext = null)
    {
        try
        {
            // Check if key is blocked
            if (await IsKeyBlockedAsync(key))
            {
                _logger.LogWarning("Request blocked for key {Key}, type {Type} - key is blocked", key, type);
                return false;
            }

            var config = _configurations[type];
            var rateLimitKey = $"{key}:{type}";

            if (!_rateLimits.TryGetValue(rateLimitKey, out var status))
            {
                status = new RateLimitStatus
                {
                    Key = key,
                    Type = type,
                    CurrentCount = 0,
                    MaxCount = config.MaxRequests,
                    WindowSize = config.WindowSize,
                    WindowStart = DateTime.UtcNow,
                    NextResetTime = DateTime.UtcNow.Add(config.WindowSize)
                };
                _rateLimits[rateLimitKey] = status;
            }

            // Check if window has expired
            if (DateTime.UtcNow >= status.WindowStart.Add(status.WindowSize))
            {
                status.CurrentCount = 0;
                status.WindowStart = DateTime.UtcNow;
                status.NextResetTime = DateTime.UtcNow.Add(config.WindowSize);
            }

            // Check if request is allowed
            if (status.CurrentCount >= status.MaxCount)
            {
                _logger.LogWarning("Rate limit exceeded for key {Key}, type {Type}. Count: {CurrentCount}, Max: {MaxCount}", 
                    key, type, status.CurrentCount, status.MaxCount);

                // Auto-block if configured
                if (config.EnableAutoBlock)
                {
                    await BlockKeyAsync(key, config.BlockDuration, $"Rate limit exceeded for {type}");
                }

                return false;
            }

            // Increment the counter for allowed requests
            status.CurrentCount++;
            _logger.LogDebug("Rate limit incremented for key {Key}, type {Type}. Count: {CurrentCount}/{MaxCount}", 
                key, type, status.CurrentCount, status.MaxCount);

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking rate limit for key {Key}, type {Type}", key, type);
            // Allow request on error to prevent service disruption
            return true;
        }
    }

    public async Task IncrementRequestCountAsync(string key, RateLimitType type)
    {
        try
        {
            var rateLimitKey = $"{key}:{type}";

            if (_rateLimits.TryGetValue(rateLimitKey, out var status))
            {
                status.CurrentCount++;
                _logger.LogDebug("Incremented request count for key {Key}, type {Type}. Current count: {CurrentCount}", 
                    key, type, status.CurrentCount);
            }

            await Task.CompletedTask;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error incrementing request count for key {Key}, type {Type}", key, type);
        }
    }

    public async Task BlockKeyAsync(string key, TimeSpan duration, string reason)
    {
        try
        {
            _blockedKeys[key] = DateTime.UtcNow.Add(duration);
            
            _logger.LogWarning("Blocked key {Key} for {Duration}. Reason: {Reason}", key, duration, reason);
            
            await Task.CompletedTask;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error blocking key {Key}", key);
        }
    }

    public async Task UnblockKeyAsync(string key)
    {
        try
        {
            if (_blockedKeys.Remove(key))
            {
                _logger.LogInformation("Unblocked key {Key}", key);
            }
            
            await Task.CompletedTask;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error unblocking key {Key}", key);
        }
    }

    public async Task<bool> IsKeyBlockedAsync(string key)
    {
        try
        {
            if (_blockedKeys.TryGetValue(key, out var blockedUntil))
            {
                if (DateTime.UtcNow >= blockedUntil)
                {
                    // Block has expired, remove it
                    _blockedKeys.Remove(key);
                    return false;
                }
                return true;
            }
            
            return await Task.FromResult(false);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking if key {Key} is blocked", key);
            return false;
        }
    }

    public async Task<RateLimitStatus> GetRateLimitStatusAsync(string key, RateLimitType type)
    {
        try
        {
            var rateLimitKey = $"{key}:{type}";
            var config = _configurations[type];

            if (_rateLimits.TryGetValue(rateLimitKey, out var status))
            {
                // Check if key is blocked
                var isBlocked = await IsKeyBlockedAsync(key);
                DateTime? blockedUntil = null;
                if (isBlocked && _blockedKeys.TryGetValue(key, out var blockTime))
                {
                    blockedUntil = blockTime;
                }

                return new RateLimitStatus
                {
                    Key = key,
                    Type = type,
                    CurrentCount = status.CurrentCount,
                    MaxCount = status.MaxCount,
                    WindowSize = status.WindowSize,
                    WindowStart = status.WindowStart,
                    NextResetTime = status.NextResetTime,
                    IsBlocked = isBlocked,
                    BlockedUntil = blockedUntil,
                    BlockReason = isBlocked ? $"Rate limit exceeded for {type}" : null
                };
            }

            return new RateLimitStatus
            {
                Key = key,
                Type = type,
                CurrentCount = 0,
                MaxCount = config.MaxRequests,
                WindowSize = config.WindowSize,
                WindowStart = DateTime.UtcNow,
                NextResetTime = DateTime.UtcNow.Add(config.WindowSize),
                IsBlocked = await IsKeyBlockedAsync(key)
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting rate limit status for key {Key}, type {Type}", key, type);
            throw;
        }
    }

    public async Task ResetRateLimitAsync(string key, RateLimitType type)
    {
        try
        {
            var rateLimitKey = $"{key}:{type}";
            
            if (_rateLimits.Remove(rateLimitKey))
            {
                _logger.LogInformation("Reset rate limit for key {Key}, type {Type}", key, type);
            }
            
            await Task.CompletedTask;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error resetting rate limit for key {Key}, type {Type}", key, type);
        }
    }

    public void ClearAllRateLimits()
    {
        _rateLimits.Clear();
        _blockedKeys.Clear();
    }
}
