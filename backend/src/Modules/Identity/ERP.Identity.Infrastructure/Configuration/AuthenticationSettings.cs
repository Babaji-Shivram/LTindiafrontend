namespace ERP.Identity.Infrastructure.Configuration;

/// <summary>
/// Configuration settings for refresh token management
/// </summary>
public class RefreshTokenSettings
{
    public const string SectionName = "RefreshTokenSettings";

    /// <summary>
    /// Number of days before refresh tokens expire
    /// Default: 7 days
    /// </summary>
    public int ExpirationDays { get; set; } = 7;

    /// <summary>
    /// Interval in minutes between cleanup operations for expired tokens
    /// Default: 60 minutes (1 hour)
    /// </summary>
    public int CleanupIntervalMinutes { get; set; } = 60;

    /// <summary>
    /// Maximum number of active refresh tokens per user
    /// Default: 5 tokens
    /// </summary>
    public int MaxActiveTokensPerUser { get; set; } = 5;

    /// <summary>
    /// Whether to automatically revoke old tokens when creating new ones
    /// Default: true
    /// </summary>
    public bool AutoRevokeOldTokens { get; set; } = true;
}

/// <summary>
/// Configuration settings for audit logging
/// </summary>
public class AuditSettings
{
    public const string SectionName = "AuditSettings";

    /// <summary>
    /// Whether audit logging is enabled
    /// Default: true
    /// </summary>
    public bool EnableAuditLogging { get; set; } = true;

    /// <summary>
    /// Number of days to retain audit logs
    /// Default: 90 days
    /// </summary>
    public int RetentionDays { get; set; } = 90;

    /// <summary>
    /// Interval in hours between cleanup operations for old audit logs
    /// Default: 24 hours (daily)
    /// </summary>
    public int CleanupIntervalHours { get; set; } = 24;

    /// <summary>
    /// Maximum number of audit log entries to retain (prevents unbounded growth)
    /// Default: 1,000,000 entries
    /// </summary>
    public int MaxLogEntries { get; set; } = 1_000_000;
}

/// <summary>
/// Configuration settings for rate limiting
/// </summary>
public class RateLimitingSettings
{
    public const string SectionName = "RateLimitingSettings";

    /// <summary>
    /// Rate limiting configuration for login attempts
    /// </summary>
    public RateLimitConfig LoginAttempts { get; set; } = new()
    {
        MaxAttempts = 5,
        WindowMinutes = 15
    };

    /// <summary>
    /// Rate limiting configuration for token refresh
    /// </summary>
    public RateLimitConfig TokenRefresh { get; set; } = new()
    {
        MaxAttempts = 10,
        WindowMinutes = 5
    };

    /// <summary>
    /// Rate limiting configuration for password reset requests
    /// </summary>
    public RateLimitConfig PasswordReset { get; set; } = new()
    {
        MaxAttempts = 3,
        WindowMinutes = 60
    };

    /// <summary>
    /// Rate limiting configuration for email verification requests
    /// </summary>
    public RateLimitConfig EmailVerification { get; set; } = new()
    {
        MaxAttempts = 5,
        WindowMinutes = 10
    };
}

/// <summary>
/// Rate limiting configuration for a specific action
/// </summary>
public class RateLimitConfig
{
    /// <summary>
    /// Maximum number of attempts allowed within the time window
    /// </summary>
    public int MaxAttempts { get; set; }

    /// <summary>
    /// Time window in minutes for rate limiting
    /// </summary>
    public int WindowMinutes { get; set; }
}
