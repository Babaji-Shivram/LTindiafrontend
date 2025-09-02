using ERP.Identity.Domain.Models;

namespace ERP.Identity.Domain.Services;

public interface IUserService
{
    Task<UserDetail?> GetUserDetailAsync(int userId);
    Task<bool> UserExistsAsync(int userId);
    Task<UserDetail?> UpdateUserAsync(UpdateUserModel request);
    Task<TwoFactorDetails?> GetTwoFactorDetailsAsync(int userId);
    Task<UserRole?> GetUserRoleAsync(int userId);
}

public interface ILoginHistoryService
{
    Task<List<LoginAttempt>> GetRecentLoginAttemptsAsync(int userId, int limit);
    Task<List<LoginAttempt>> GetLoginHistoryAsync(int userId, DateTime fromDate);
}

public interface ISessionService
{
    Task<List<UserSession>> GetActiveSessionsAsync(int userId);
    Task<bool> TerminateSessionAsync(string sessionId);
    Task<int> TerminateAllUserSessionsAsync(int userId);
}
