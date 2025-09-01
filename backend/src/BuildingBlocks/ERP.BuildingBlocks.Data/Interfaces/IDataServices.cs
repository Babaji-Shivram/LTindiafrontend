using ERP.BuildingBlocks.Data.DTOs;

namespace ERP.BuildingBlocks.Data.Interfaces;

public interface IUserDataService
{
    Task<UserAuthDto?> AuthenticateAsync(string email, string password);
    Task<UserDto?> GetUserByIdAsync(int userId);
    Task<UserDto?> GetUserByEmailAsync(string email);
    Task<UserDto?> GetUserByUsernameAsync(string username);
    Task<IEnumerable<UserDto>> GetAllUsersAsync();
    Task<UserDto> CreateUserAsync(UserRegistrationDto userDto);
    Task<UserDto> UpdateUserAsync(UserDto userDto);
    Task<bool> DeleteUserAsync(int userId);
    Task<bool> UserExistsAsync(string email);
    Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword);
}

public interface IRoleDataService
{
    Task<IEnumerable<RoleDto>> GetUserRolesAsync(int userId);
    Task<IEnumerable<PermissionDto>> GetUserPermissionsAsync(int userId);
    Task<RoleDto?> GetRoleByIdAsync(int roleId);
    Task<IEnumerable<RoleDto>> GetAllRolesAsync();
    Task<bool> AssignRoleToUserAsync(int userId, int roleId);
    Task<bool> RemoveRoleFromUserAsync(int userId, int roleId);
}
