namespace ERP.Identity.Domain.Services;

public interface IRateLimitingService
{
    Task<bool> IsRequestAllowedAsync(string key, RateLimitType type, string? additionalContext = null);
    Task IncrementRequestCountAsync(string key, RateLimitType type);
    Task BlockKeyAsync(string key, TimeSpan duration, string reason);
    Task UnblockKeyAsync(string key);
    Task<bool> IsKeyBlockedAsync(string key);
    Task<RateLimitStatus> GetRateLimitStatusAsync(string key, RateLimitType type);
    Task ResetRateLimitAsync(string key, RateLimitType type);
    void ClearAllRateLimits(); // For testing purposes
}

public enum RateLimitType
{
    Login = 1,
    TokenRefresh = 2,
    PasswordReset = 3,
    Registration = 4,
    PermissionCheck = 5,
    ApiCall = 6,
    DataAccess = 7
}

public class RateLimitStatus
{
    public string Key { get; set; } = string.Empty;
    public RateLimitType Type { get; set; }
    public int CurrentCount { get; set; }
    public int MaxCount { get; set; }
    public TimeSpan WindowSize { get; set; }
    public DateTime WindowStart { get; set; }
    public DateTime? NextResetTime { get; set; }
    public bool IsBlocked { get; set; }
    public DateTime? BlockedUntil { get; set; }
    public string? BlockReason { get; set; }
}

public class RateLimitConfiguration
{
    public RateLimitType Type { get; set; }
    public int MaxRequests { get; set; }
    public TimeSpan WindowSize { get; set; }
    public TimeSpan BlockDuration { get; set; }
    public bool EnableAutoBlock { get; set; }
}
