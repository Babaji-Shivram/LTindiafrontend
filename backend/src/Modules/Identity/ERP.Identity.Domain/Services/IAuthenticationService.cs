using ERP.Identity.Domain.Entities;

namespace ERP.Identity.Domain.Services;

public interface IAuthenticationService
{
    Task<User?> AuthenticateUserAsync(string email, string password);
    Task<User?> GetUserByEmailAsync(string email);
    Task<User?> GetUserByIdAsync(int userId);
    Task<List<string>> GetUserRolesAsync(int userId);
    Task<List<string>> GetUserPermissionsAsync(int userId);
    Task UpdateLastLoginAsync(int userId);
}
