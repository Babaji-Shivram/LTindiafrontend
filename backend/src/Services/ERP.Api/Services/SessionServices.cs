using ERP.Api.DTOs;
using ERP.Api.Services.Interfaces;

namespace ERP.Api.Services
{
    public class LoginHistoryService : ILoginHistoryService
    {
        private readonly ILogger<LoginHistoryService> _logger;

        public LoginHistoryService(ILogger<LoginHistoryService> logger)
        {
            _logger = logger;
        }

        public async Task<List<LoginHistoryDto>> GetUserLoginHistoryAsync(int userId, int limit = 10)
        {
            await Task.Delay(50); // Simulate database call
            
            // Mock login history data
            var loginHistory = new List<LoginHistoryDto>();
            var random = new Random();
            
            for (int i = 0; i < Math.Min(limit, 5); i++)
            {
                loginHistory.Add(new LoginHistoryDto
                {
                    Id = i + 1,
                    UserId = userId,
                    LoginTime = DateTime.Now.AddDays(-i).AddHours(-random.Next(0, 12)),
                    LogoutTime = i == 0 ? null : DateTime.Now.AddDays(-i).AddHours(-random.Next(0, 8)),
                    IpAddress = $"192.168.1.{100 + random.Next(0, 50)}",
                    UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                    DeviceType = random.Next(0, 3) switch
                    {
                        0 => "Desktop",
                        1 => "Mobile",
                        _ => "Tablet"
                    },
                    BrowserName = random.Next(0, 3) switch
                    {
                        0 => "Chrome",
                        1 => "Firefox",
                        _ => "Safari"
                    },
                    Location = random.Next(0, 3) switch
                    {
                        0 => "Mumbai, India",
                        1 => "Pune, India",
                        _ => "Delhi, India"
                    },
                    IsSuccessful = random.Next(0, 10) > 1 // 90% successful logins
                });
            }

            _logger.LogInformation("Retrieved {Count} login history records for user {UserId}", 
                loginHistory.Count, userId);

            return loginHistory.OrderByDescending(l => l.LoginTime).ToList();
        }

        public async Task<LoginHistoryDto> RecordLoginAttemptAsync(int userId, string ipAddress, string? userAgent, bool isSuccessful, string? failureReason = null)
        {
            await Task.Delay(100); // Simulate database call
            
            var loginRecord = new LoginHistoryDto
            {
                Id = new Random().Next(1000, 9999),
                UserId = userId,
                LoginTime = DateTime.Now,
                IpAddress = ipAddress,
                UserAgent = userAgent,
                DeviceType = "Unknown",
                BrowserName = "Unknown",
                Location = "Unknown",
                IsSuccessful = isSuccessful,
                FailureReason = failureReason
            };

            _logger.LogInformation("Recorded login attempt for user {UserId}: {Success}", 
                userId, isSuccessful ? "Success" : $"Failed - {failureReason}");

            return loginRecord;
        }

        public async Task RecordLogoutAsync(int loginHistoryId)
        {
            await Task.Delay(50); // Simulate database call
            
            _logger.LogInformation("Recorded logout for login history ID: {LoginHistoryId}", loginHistoryId);
        }
    }

    public class SessionService : ISessionService
    {
        private readonly ILogger<SessionService> _logger;
        private static readonly Dictionary<string, SessionDto> _activeSessions = new();

        public SessionService(ILogger<SessionService> logger)
        {
            _logger = logger;
        }

        public async Task<List<SessionDto>> GetActiveSessionsAsync(int userId)
        {
            await Task.Delay(50); // Simulate database call
            
            var userSessions = _activeSessions.Values
                .Where(s => s.UserId == userId && s.IsActive)
                .OrderByDescending(s => s.LastActivityTime)
                .ToList();

            // Add mock session if none exist
            if (!userSessions.Any())
            {
                var mockSession = new SessionDto
                {
                    Id = Guid.NewGuid().ToString(),
                    UserId = userId,
                    LoginTime = DateTime.Now.AddHours(-2),
                    LastActivityTime = DateTime.Now.AddMinutes(-5),
                    IpAddress = "192.168.1.100",
                    DeviceType = "Desktop",
                    BrowserName = "Chrome",
                    Location = "Mumbai, India",
                    IsActive = true
                };
                
                _activeSessions[mockSession.Id] = mockSession;
                userSessions.Add(mockSession);
            }

            _logger.LogInformation("Retrieved {Count} active sessions for user {UserId}", 
                userSessions.Count, userId);

            return userSessions;
        }

        public async Task<SessionDto?> GetSessionAsync(string sessionId)
        {
            await Task.Delay(30); // Simulate database call
            
            _activeSessions.TryGetValue(sessionId, out var session);
            return session;
        }

        public async Task<SessionDto> CreateSessionAsync(int userId, string ipAddress, string? userAgent)
        {
            await Task.Delay(100); // Simulate database call
            
            var session = new SessionDto
            {
                Id = Guid.NewGuid().ToString(),
                UserId = userId,
                LoginTime = DateTime.Now,
                LastActivityTime = DateTime.Now,
                IpAddress = ipAddress,
                DeviceType = "Desktop", // Could parse from userAgent
                BrowserName = "Chrome", // Could parse from userAgent
                Location = "Mumbai, India", // Could get from IP geolocation
                IsActive = true
            };

            _activeSessions[session.Id] = session;
            
            _logger.LogInformation("Created new session {SessionId} for user {UserId}", 
                session.Id, userId);

            return session;
        }

        public async Task<bool> TerminateSessionAsync(string sessionId)
        {
            await Task.Delay(50); // Simulate database call
            
            if (_activeSessions.TryGetValue(sessionId, out var session))
            {
                session.IsActive = false;
                _logger.LogInformation("Terminated session {SessionId} for user {UserId}", 
                    sessionId, session.UserId);
                return true;
            }

            _logger.LogWarning("Attempted to terminate non-existent session {SessionId}", sessionId);
            return false;
        }

        public async Task<bool> TerminateAllUserSessionsAsync(int userId)
        {
            await Task.Delay(100); // Simulate database call
            
            var userSessions = _activeSessions.Values
                .Where(s => s.UserId == userId && s.IsActive)
                .ToList();

            foreach (var session in userSessions)
            {
                session.IsActive = false;
            }

            _logger.LogInformation("Terminated {Count} sessions for user {UserId}", 
                userSessions.Count, userId);

            return userSessions.Any();
        }

        public async Task UpdateSessionActivityAsync(string sessionId)
        {
            await Task.Delay(30); // Simulate database call
            
            if (_activeSessions.TryGetValue(sessionId, out var session))
            {
                session.LastActivityTime = DateTime.Now;
                _logger.LogDebug("Updated activity for session {SessionId}", sessionId);
            }
        }
    }
}
