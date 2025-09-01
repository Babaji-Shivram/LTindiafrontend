using ERP.BuildingBlocks.Data.DTOs;
using ERP.BuildingBlocks.Data.Interfaces;
using ERP.Identity.Domain.Entities;
using ERP.Identity.Domain.Services;

namespace ERP.Identity.Application.Services;

public class AuthenticationAppService : IAuthenticationService
{
    private readonly IUserDataService _userDataService;
    private readonly IRoleDataService _roleDataService;

    public AuthenticationAppService(
        IUserDataService userDataService,
        IRoleDataService roleDataService)
    {
        _userDataService = userDataService;
        _roleDataService = roleDataService;
    }

    public async Task<User?> AuthenticateUserAsync(string email, string password)
    {
        // Use BuildingBlocks.Data service to authenticate
        var userAuthDto = await _userDataService.AuthenticateAsync(email, password);
        
        if (userAuthDto == null)
            return null;

        // Get user roles and permissions
        var roles = await _roleDataService.GetUserRolesAsync(userAuthDto.Id);
        var permissions = await _roleDataService.GetUserPermissionsAsync(userAuthDto.Id);

        // Map to domain entity
        return new User
        {
            Id = userAuthDto.Id,
            Username = userAuthDto.Username,
            Email = userAuthDto.Email,
            FirstName = userAuthDto.FirstName,
            LastName = userAuthDto.LastName,
            Roles = roles.Select(r => r.RoleName).ToList(),
            Permissions = permissions.Select(p => p.PermissionName).ToList()
        };
    }

    public async Task<User?> GetUserByIdAsync(int userId)
    {
        var userDto = await _userDataService.GetUserByIdAsync(userId);
        
        if (userDto == null)
            return null;

        // Get user roles and permissions
        var roles = await _roleDataService.GetUserRolesAsync(userDto.Id);
        var permissions = await _roleDataService.GetUserPermissionsAsync(userDto.Id);

        // Map to domain entity
        return new User
        {
            Id = userDto.Id,
            Username = userDto.Username,
            Email = userDto.Email,
            FirstName = userDto.FirstName,
            LastName = userDto.LastName,
            Roles = roles.Select(r => r.RoleName).ToList(),
            Permissions = permissions.Select(p => p.PermissionName).ToList()
        };
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        var userDto = await _userDataService.GetUserByEmailAsync(email);
        
        if (userDto == null)
            return null;

        // Get user roles and permissions
        var roles = await _roleDataService.GetUserRolesAsync(userDto.Id);
        var permissions = await _roleDataService.GetUserPermissionsAsync(userDto.Id);

        // Map to domain entity
        return new User
        {
            Id = userDto.Id,
            Username = userDto.Username,
            Email = userDto.Email,
            FirstName = userDto.FirstName,
            LastName = userDto.LastName,
            Roles = roles.Select(r => r.RoleName).ToList(),
            Permissions = permissions.Select(p => p.PermissionName).ToList()
        };
    }

    public async Task<List<string>> GetUserRolesAsync(int userId)
    {
        var roles = await _roleDataService.GetUserRolesAsync(userId);
        return roles.Select(r => r.RoleName).ToList();
    }

    public async Task<List<string>> GetUserPermissionsAsync(int userId)
    {
        var permissions = await _roleDataService.GetUserPermissionsAsync(userId);
        return permissions.Select(p => p.PermissionName).ToList();
    }

    public async Task UpdateLastLoginAsync(int userId)
    {
        // This could be implemented in UserDataService if needed
        // For now, we'll use a placeholder implementation
        await Task.CompletedTask;
        // TODO: Implement last login update logic
    }
}
