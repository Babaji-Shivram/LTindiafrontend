using ERP.Identity.Domain.Models;
using ERP.Identity.Domain.Services;
using Microsoft.Extensions.Logging;

namespace ERP.Identity.Infrastructure.Services;

public class SessionService : ISessionService
{
    private readonly ILogger<SessionService> _logger;
    private static readonly Dictionary<int, List<UserSession>> _userSessions = new();

    public SessionService(ILogger<SessionService> logger)
    {
        _logger = logger;
    }

    public async Task<List<UserSession>> GetActiveSessionsAsync(int userId)
    {
        // TODO: Implement actual database/cache query
        await Task.Delay(100);

        if (_userSessions.ContainsKey(userId))
        {
            return _userSessions[userId].Where(s => s.IsActive).ToList();
        }

        // Return mock data for testing
        var mockSessions = GetMockSessions(userId);
        _userSessions[userId] = mockSessions;
        
        return mockSessions.Where(s => s.IsActive).ToList();
    }

    public async Task<bool> TerminateSessionAsync(string sessionId)
    {
        // TODO: Implement actual database/cache update
        await Task.Delay(50);

        // Find and terminate the session
        foreach (var userSessions in _userSessions.Values)
        {
            var session = userSessions.FirstOrDefault(s => s.SessionId == sessionId);
            if (session != null)
            {
                session.IsActive = false;
                _logger.LogInformation("Session {SessionId} terminated", sessionId);
                return true;
            }
        }

        return false;
    }

    public async Task<int> TerminateAllUserSessionsAsync(int userId)
    {
        // TODO: Implement actual database/cache update
        await Task.Delay(100);

        if (!_userSessions.ContainsKey(userId))
        {
            return 0;
        }

        var activeSessions = _userSessions[userId].Where(s => s.IsActive).ToList();
        var terminatedCount = activeSessions.Count;

        foreach (var session in activeSessions)
        {
            session.IsActive = false;
        }

        _logger.LogInformation("Terminated {Count} sessions for user {UserId}", terminatedCount, userId);
        return terminatedCount;
    }

    private static List<UserSession> GetMockSessions(int userId)
    {
        return new List<UserSession>
        {
            new UserSession
            {
                SessionId = $"sess_{Guid.NewGuid():N}",
                UserId = userId,
                StartTime = DateTime.UtcNow.AddHours(-4),
                LastActivity = DateTime.UtcNow.AddMinutes(-15),
                IpAddress = "192.168.1.100",
                UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                Location = "Mumbai, India",
                IsActive = true
            },
            new UserSession
            {
                SessionId = $"sess_{Guid.NewGuid():N}",
                UserId = userId,
                StartTime = DateTime.UtcNow.AddDays(-1),
                LastActivity = DateTime.UtcNow.AddHours(-2),
                IpAddress = "203.192.123.45",
                UserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)",
                Location = "Delhi, India",
                IsActive = true
            },
            new UserSession
            {
                SessionId = $"sess_{Guid.NewGuid():N}",
                UserId = userId,
                StartTime = DateTime.UtcNow.AddDays(-2),
                LastActivity = DateTime.UtcNow.AddDays(-2),
                IpAddress = "10.0.0.50",
                UserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
                Location = "Bangalore, India",
                IsActive = false // Expired session
            }
        };
    }
}
