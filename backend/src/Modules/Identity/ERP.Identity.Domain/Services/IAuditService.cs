namespace ERP.Identity.Domain.Services;

public interface IAuditService
{
    Task LogLoginAttemptAsync(string username, bool successful, string? ipAddress = null, string? userAgent = null);
    Task LogLogoutAsync(int userId, string? ipAddress = null);
    Task LogTokenRefreshAsync(int userId, string? ipAddress = null);
    Task LogPasswordChangeAsync(int userId, string? ipAddress = null);
    Task LogSecurityEventAsync(SecurityEventType eventType, int? userId = null, string? description = null, string? ipAddress = null, string? userAgent = null);
    Task LogPermissionCheckAsync(int userId, string resource, string action, bool granted, string? ipAddress = null);
    Task<List<AuditLog>> GetUserAuditLogsAsync(int userId, DateTime? fromDate = null, DateTime? toDate = null, int pageSize = 50, int pageNumber = 1);
    Task<List<AuditLog>> GetSecurityAuditLogsAsync(DateTime? fromDate = null, DateTime? toDate = null, SecurityEventType? eventType = null, int pageSize = 50, int pageNumber = 1);
    Task<int> CleanupOldLogsAsync(int retentionDays);
}

public enum SecurityEventType
{
    LoginSuccess,
    LoginFailed,
    Logout,
    TokenRefresh,
    TokenRevoked,
    PasswordChanged,
    PasswordResetRequested,
    PasswordResetCompleted,
    PermissionGranted,
    PermissionDenied,
    AccountLocked,
    AccountUnlocked,
    RoleChanged,
    PermissionChanged,
    SuspiciousActivity,
    DataAccess,
    DataModification,
    SystemAccess
}

public class AuditLog
{
    public int Id { get; set; }
    public SecurityEventType EventType { get; set; }
    public int? UserId { get; set; }
    public string? Username { get; set; }
    public string? Description { get; set; }
    public string? IpAddress { get; set; }
    public string? UserAgent { get; set; }
    public string? Resource { get; set; }
    public string? Action { get; set; }
    public bool? Success { get; set; }
    public DateTime Timestamp { get; set; }
    public string? AdditionalData { get; set; }
}
