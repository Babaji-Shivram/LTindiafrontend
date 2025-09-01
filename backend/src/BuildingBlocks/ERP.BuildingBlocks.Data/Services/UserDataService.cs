using ERP.BuildingBlocks.Data.DTOs;
using ERP.BuildingBlocks.Data.Interfaces;
using ERP.BuildingBlocks.Data.Context;
using ERP.BuildingBlocks.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using BCrypt.Net;

namespace ERP.BuildingBlocks.Data.Services;

public class UserDataService : IUserDataService
{
    private readonly ImportUatDbContext _context;
    private readonly ILogger<UserDataService> _logger;

    public UserDataService(ImportUatDbContext context, ILogger<UserDataService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<UserAuthDto?> AuthenticateAsync(string email, string password)
    {
        try
        {
            var dbUser = await _context.BsUserMs
                .FirstOrDefaultAsync(u => 
                    (u.SEmail == email || u.SCode == email) && 
                    u.LoginActive && !u.BDel);

            if (dbUser == null)
            {
                _logger.LogWarning("User not found or inactive for email: {Email}", email);
                return null;
            }

            // For now, we'll use a simple password check since the existing system might not use BCrypt
            // In production, you should implement proper password hashing
            if (dbUser.SCode == password || BCrypt.Net.BCrypt.Verify(password, dbUser.SCode ?? ""))
            {
                var userDto = new UserAuthDto
                {
                    Id = dbUser.LId,
                    Username = dbUser.SCode ?? "",
                    Email = dbUser.SEmail ?? "",
                    FirstName = dbUser.SName ?? "",
                    LastName = "",
                    Roles = new List<string>(), // TODO: Implement role mapping
                    Permissions = new List<string>() // TODO: Implement permission mapping
                };

                _logger.LogInformation("User authenticated successfully: {Email}", email);
                return userDto;
            }

            _logger.LogWarning("Invalid password for user: {Email}", email);
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during authentication for email: {Email}", email);
            return null;
        }
    }

    public async Task<UserDto?> GetUserByIdAsync(int userId)
    {
        try
        {
            var dbUser = await _context.BsUserMs
                .FirstOrDefaultAsync(u => u.LId == userId && !u.BDel);

            return dbUser != null ? MapToUserDto(dbUser) : null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user by ID: {UserId}", userId);
            return null;
        }
    }

    public async Task<UserDto?> GetUserByEmailAsync(string email)
    {
        try
        {
            var dbUser = await _context.BsUserMs
                .FirstOrDefaultAsync(u => u.SEmail == email && !u.BDel);

            return dbUser != null ? MapToUserDto(dbUser) : null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user by email: {Email}", email);
            return null;
        }
    }

    public async Task<UserDto?> GetUserByUsernameAsync(string username)
    {
        try
        {
            var dbUser = await _context.BsUserMs
                .FirstOrDefaultAsync(u => u.SCode == username && !u.BDel);

            return dbUser != null ? MapToUserDto(dbUser) : null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user by username: {Username}", username);
            return null;
        }
    }

    public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
    {
        try
        {
            var dbUsers = await _context.BsUserMs
                .Where(u => u.LoginActive && !u.BDel)
                .ToListAsync();

            return dbUsers.Select(MapToUserDto);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting all users");
            return Enumerable.Empty<UserDto>();
        }
    }

    public Task<UserDto> CreateUserAsync(UserRegistrationDto userDto)
    {
        // This is a placeholder - implement based on your business logic
        throw new NotImplementedException("User creation not implemented yet");
    }

    public Task<UserDto> UpdateUserAsync(UserDto userDto)
    {
        // This is a placeholder - implement based on your business logic
        throw new NotImplementedException("User update not implemented yet");
    }

    public Task<bool> DeleteUserAsync(int userId)
    {
        // This is a placeholder - implement based on your business logic
        throw new NotImplementedException("User deletion not implemented yet");
    }

    public async Task<bool> UserExistsAsync(string email)
    {
        try
        {
            return await _context.BsUserMs.AnyAsync(u => u.SEmail == email && !u.BDel);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error checking if user exists: {Email}", email);
            return false;
        }
    }

    public Task<bool> ChangePasswordAsync(int userId, string oldPassword, string newPassword)
    {
        // This is a placeholder - implement based on your business logic
        throw new NotImplementedException("Password change not implemented yet");
    }

    private static UserDto MapToUserDto(ERP.BuildingBlocks.Data.Models.BsUserM dbUser)
    {
        return new UserDto
        {
            Id = dbUser.LId,
            Username = dbUser.SCode ?? "",
            Email = dbUser.SEmail ?? "",
            FirstName = dbUser.SName ?? "",
            LastName = "",
            IsActive = dbUser.LoginActive,
            BranchId = null,
            DeptId = null,
            CreatedDate = dbUser.DtDate,
            ModifiedDate = dbUser.UpdDate
        };
    }
}
