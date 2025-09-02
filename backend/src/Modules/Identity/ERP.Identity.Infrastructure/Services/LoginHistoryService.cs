using ERP.Identity.Domain.Models;
using ERP.Identity.Domain.Services;
using Microsoft.Extensions.Logging;

namespace ERP.Identity.Infrastructure.Services;

public class LoginHistoryService : ILoginHistoryService
{
    private readonly ILogger<LoginHistoryService> _logger;

    public LoginHistoryService(ILogger<LoginHistoryService> logger)
    {
        _logger = logger;
    }

    public async Task<List<LoginAttempt>> GetRecentLoginAttemptsAsync(int userId, int limit)
    {
        // TODO: Implement actual database query
        await Task.Delay(100);

        var mockData = GetMockLoginAttempts(userId);
        return mockData.Take(limit).ToList();
    }

    public async Task<List<LoginAttempt>> GetLoginHistoryAsync(int userId, DateTime fromDate)
    {
        // TODO: Implement actual database query
        await Task.Delay(100);

        var mockData = GetMockLoginAttempts(userId);
        return mockData.Where(x => x.AttemptTime >= fromDate).ToList();
    }

    private static List<LoginAttempt> GetMockLoginAttempts(int userId)
    {
        return new List<LoginAttempt>
        {
            new LoginAttempt
            {
                Id = 1,
                UserId = userId,
                AttemptTime = DateTime.UtcNow.AddHours(-2),
                IpAddress = "192.168.1.100",
                UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                Location = "Mumbai, India",
                IsSuccessful = true,
                TwoFactorUsed = false
            },
            new LoginAttempt
            {
                Id = 2,
                UserId = userId,
                AttemptTime = DateTime.UtcNow.AddDays(-1),
                IpAddress = "192.168.1.100",
                UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                Location = "Mumbai, India",
                IsSuccessful = true,
                TwoFactorUsed = false
            },
            new LoginAttempt
            {
                Id = 3,
                UserId = userId,
                AttemptTime = DateTime.UtcNow.AddDays(-2),
                IpAddress = "203.192.123.45",
                UserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X)",
                Location = "Delhi, India",
                IsSuccessful = false,
                FailureReason = "Invalid password",
                TwoFactorUsed = false
            },
            new LoginAttempt
            {
                Id = 4,
                UserId = userId,
                AttemptTime = DateTime.UtcNow.AddDays(-3),
                IpAddress = "192.168.1.105",
                UserAgent = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
                Location = "Bangalore, India",
                IsSuccessful = true,
                TwoFactorUsed = true
            }
        };
    }
}
