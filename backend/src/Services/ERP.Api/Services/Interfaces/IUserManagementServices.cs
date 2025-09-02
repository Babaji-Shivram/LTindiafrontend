using ERP.Api.DTOs;

namespace ERP.Api.Services.Interfaces
{
    public interface IUserService
    {
        Task<UserListResponse> GetUsersAsync(int page = 1, int pageSize = 10, string? search = null, int? roleId = null, bool? isActive = null);
        Task<UserDetailResponse?> GetUserDetailAsync(int id);
        Task<UserDto?> GetUserByIdAsync(int id);
        Task<UserDto> CreateUserAsync(UserDto user);
        Task<UserDto?> UpdateUserAsync(int id, UserDto user);
        Task<bool> DeleteUserAsync(int id);
    }

    public interface ILoginHistoryService
    {
        Task<List<LoginHistoryDto>> GetUserLoginHistoryAsync(int userId, int limit = 10);
        Task<LoginHistoryDto> RecordLoginAttemptAsync(int userId, string ipAddress, string? userAgent, bool isSuccessful, string? failureReason = null);
        Task RecordLogoutAsync(int loginHistoryId);
    }

    public interface ISessionService
    {
        Task<List<SessionDto>> GetActiveSessionsAsync(int userId);
        Task<SessionDto?> GetSessionAsync(string sessionId);
        Task<SessionDto> CreateSessionAsync(int userId, string ipAddress, string? userAgent);
        Task<bool> TerminateSessionAsync(string sessionId);
        Task<bool> TerminateAllUserSessionsAsync(int userId);
        Task UpdateSessionActivityAsync(string sessionId);
    }
}
