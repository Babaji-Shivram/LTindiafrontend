using Microsoft.Extensions.Logging;
using ERP.Identity.Domain.Services;

namespace ERP.Identity.Infrastructure.Services;

public class AuditService : IAuditService
{
    private readonly ILogger<AuditService> _logger;

    // In-memory storage for demonstration - replace with database repository
    private static readonly List<AuditLog> _auditLogs = new();

    public AuditService(ILogger<AuditService> logger)
    {
        _logger = logger;
    }

    public async Task LogLoginAttemptAsync(string username, bool successful, string? ipAddress = null, string? userAgent = null)
    {
        try
        {
            var auditLog = new AuditLog
            {
                Id = _auditLogs.Count + 1,
                EventType = successful ? SecurityEventType.LoginSuccess : SecurityEventType.LoginFailed,
                Username = username,
                Description = successful ? "User logged in successfully" : "Failed login attempt",
                IpAddress = ipAddress,
                UserAgent = userAgent,
                Success = successful,
                Timestamp = DateTime.UtcNow
            };

            _auditLogs.Add(auditLog);
            
            _logger.LogInformation("Login attempt logged: {Username}, Success: {Success}, IP: {IpAddress}", 
                username, successful, ipAddress);
                
            await Task.CompletedTask;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error logging login attempt for user {Username}", username);
        }
    }

    public async Task LogLogoutAsync(int userId, string? ipAddress = null)
    {
        try
        {
            var auditLog = new AuditLog
            {
                Id = _auditLogs.Count + 1,
                EventType = SecurityEventType.Logout,
                UserId = userId,
                Description = "User logged out",
                IpAddress = ipAddress,
                Success = true,
                Timestamp = DateTime.UtcNow
            };

            _auditLogs.Add(auditLog);
            
            _logger.LogInformation("Logout logged for user {UserId}, IP: {IpAddress}", userId, ipAddress);
            
            await Task.CompletedTask;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error logging logout for user {UserId}", userId);
        }
    }

    public async Task LogTokenRefreshAsync(int userId, string? ipAddress = null)
    {
        try
        {
            var auditLog = new AuditLog
            {
                Id = _auditLogs.Count + 1,
                EventType = SecurityEventType.TokenRefresh,
                UserId = userId,
                Description = "Access token refreshed",
                IpAddress = ipAddress,
                Success = true,
                Timestamp = DateTime.UtcNow
            };

            _auditLogs.Add(auditLog);
            
            _logger.LogInformation("Token refresh logged for user {UserId}, IP: {IpAddress}", userId, ipAddress);
            
            await Task.CompletedTask;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error logging token refresh for user {UserId}", userId);
        }
    }

    public async Task LogPasswordChangeAsync(int userId, string? ipAddress = null)
    {
        try
        {
            var auditLog = new AuditLog
            {
                Id = _auditLogs.Count + 1,
                EventType = SecurityEventType.PasswordChanged,
                UserId = userId,
                Description = "Password changed",
                IpAddress = ipAddress,
                Success = true,
                Timestamp = DateTime.UtcNow
            };

            _auditLogs.Add(auditLog);
            
            _logger.LogInformation("Password change logged for user {UserId}, IP: {IpAddress}", userId, ipAddress);
            
            await Task.CompletedTask;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error logging password change for user {UserId}", userId);
        }
    }

    public async Task LogSecurityEventAsync(SecurityEventType eventType, int? userId = null, string? description = null, 
        string? ipAddress = null, string? userAgent = null)
    {
        try
        {
            var auditLog = new AuditLog
            {
                Id = _auditLogs.Count + 1,
                EventType = eventType,
                UserId = userId,
                Description = description,
                IpAddress = ipAddress,
                UserAgent = userAgent,
                Success = true,
                Timestamp = DateTime.UtcNow
            };

            _auditLogs.Add(auditLog);
            
            _logger.LogInformation("Security event logged: {EventType}, User: {UserId}, Description: {Description}", 
                eventType, userId, description);
                
            await Task.CompletedTask;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error logging security event {EventType} for user {UserId}", eventType, userId);
        }
    }

    public async Task LogPermissionCheckAsync(int userId, string resource, string action, bool granted, string? ipAddress = null)
    {
        try
        {
            var auditLog = new AuditLog
            {
                Id = _auditLogs.Count + 1,
                EventType = granted ? SecurityEventType.PermissionGranted : SecurityEventType.PermissionDenied,
                UserId = userId,
                Resource = resource,
                Action = action,
                Description = $"Permission {(granted ? "granted" : "denied")} for {action} on {resource}",
                IpAddress = ipAddress,
                Success = granted,
                Timestamp = DateTime.UtcNow
            };

            _auditLogs.Add(auditLog);
            
            _logger.LogInformation("Permission check logged: User {UserId}, Resource: {Resource}, Action: {Action}, Granted: {Granted}", 
                userId, resource, action, granted);
                
            await Task.CompletedTask;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error logging permission check for user {UserId}", userId);
        }
    }

    public async Task<List<AuditLog>> GetUserAuditLogsAsync(int userId, DateTime? fromDate = null, DateTime? toDate = null, 
        int pageSize = 50, int pageNumber = 1)
    {
        try
        {
            var query = _auditLogs.Where(log => log.UserId == userId);

            if (fromDate.HasValue)
                query = query.Where(log => log.Timestamp >= fromDate.Value);

            if (toDate.HasValue)
                query = query.Where(log => log.Timestamp <= toDate.Value);

            var result = query
                .OrderByDescending(log => log.Timestamp)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return await Task.FromResult(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user audit logs for user {UserId}", userId);
            return new List<AuditLog>();
        }
    }

    public async Task<List<AuditLog>> GetSecurityAuditLogsAsync(DateTime? fromDate = null, DateTime? toDate = null, 
        SecurityEventType? eventType = null, int pageSize = 50, int pageNumber = 1)
    {
        try
        {
            var query = _auditLogs.AsQueryable();

            if (fromDate.HasValue)
                query = query.Where(log => log.Timestamp >= fromDate.Value);

            if (toDate.HasValue)
                query = query.Where(log => log.Timestamp <= toDate.Value);

            if (eventType.HasValue)
                query = query.Where(log => log.EventType == eventType.Value);

            var result = query
                .OrderByDescending(log => log.Timestamp)
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return await Task.FromResult(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting security audit logs");
            return new List<AuditLog>();
        }
    }

    public Task<int> CleanupOldLogsAsync(int retentionDays)
    {
        try
        {
            var cutoffDate = DateTime.UtcNow.AddDays(-retentionDays);
            var oldLogs = _auditLogs.Where(log => log.Timestamp < cutoffDate).ToList();
            
            if (oldLogs.Any())
            {
                foreach (var log in oldLogs)
                {
                    _auditLogs.Remove(log);
                }
                
                _logger.LogInformation("Cleaned up {Count} audit logs older than {CutoffDate}", 
                    oldLogs.Count, cutoffDate);
                
                return Task.FromResult(oldLogs.Count);
            }
            
            return Task.FromResult(0);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error cleaning up old audit logs");
            return Task.FromResult(0);
        }
    }
}
