using ERP.Identity.Domain.Entities;
using ERP.Identity.Domain.Services;
using ERP.Identity.Infrastructure.Data;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using ERP.BuildingBlocks.Data.Models;

namespace ERP.Identity.Infrastructure.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly IdentityDbContext _context;
    private readonly ILogger<AuthenticationService> _logger;

    public AuthenticationService(IdentityDbContext context, ILogger<AuthenticationService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<User?> AuthenticateUserAsync(string email, string password)
    {
        try
        {
            _logger.LogInformation("Authentication attempt for email: {Email}", email);
            
            // Find user in BsUserM table
            var dbUser = await _context.BsUserMs
                .Include(u => u.BsUserTokens)
                .FirstOrDefaultAsync(u => u.SEmail.ToLower() == email.ToLower() && 
                                        u.LoginActive == true && 
                                        u.BDel == false);

            if (dbUser == null)
            {
                _logger.LogWarning("User not found or inactive for email: {Email}", email);
                return null;
            }

            // Verify password - for now using simple comparison
            // TODO: Implement proper password hashing when you migrate passwords
            if (!VerifyPassword(password, dbUser.SCode))
            {
                _logger.LogWarning("Invalid password for email: {Email}", email);
                return null;
            }

            // Map to domain User model
            var user = UserMappingService.MapToUser(dbUser);
            
            _logger.LogInformation("User authenticated successfully: {Email}", email);
            return user;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred during authentication for email: {Email}", email);
            return null;
        }
    }

    /// <summary>
    /// Verify password - currently using simple comparison
    /// TODO: Implement BCrypt when migrating existing passwords
    /// </summary>
    private bool VerifyPassword(string password, string storedPassword)
    {
        if (string.IsNullOrEmpty(password) || string.IsNullOrEmpty(storedPassword))
            return false;

        // For now, simple comparison - replace with BCrypt later
        // return BCrypt.Net.BCrypt.Verify(password, storedPassword);
        return password == storedPassword;
    }

    public async Task<User?> GetUserByIdAsync(int userId)
    {
        try
        {
            _logger.LogInformation("Getting user by ID: {UserId}", userId);
            
            var dbUser = await _context.BsUserMs
                .Include(u => u.BsUserTokens)
                .FirstOrDefaultAsync(u => u.LId == userId && 
                                        u.LoginActive == true && 
                                        u.BDel == false);

            if (dbUser == null)
            {
                _logger.LogWarning("User not found for ID: {UserId}", userId);
                return null;
            }

            return UserMappingService.MapToUser(dbUser);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting user by ID: {UserId}", userId);
            return null;
        }
    }

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        try
        {
            _logger.LogInformation("Getting user by email: {Email}", email);
            
            var dbUser = await _context.BsUserMs
                .Include(u => u.BsUserTokens)
                .FirstOrDefaultAsync(u => u.SEmail.ToLower() == email.ToLower() && 
                                        u.LoginActive == true && 
                                        u.BDel == false);

            if (dbUser == null)
            {
                _logger.LogWarning("User not found for email: {Email}", email);
                return null;
            }

            return UserMappingService.MapToUser(dbUser);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting user by email: {Email}", email);
            return null;
        }
    }

    public async Task<List<string>> GetUserRolesAsync(int userId)
    {
        try
        {
            _logger.LogInformation("Getting roles for user: {UserId}", userId);
            
            var dbUser = await _context.BsUserMs
                .FirstOrDefaultAsync(u => u.LId == userId);

            if (dbUser == null)
                return new List<string>();

            return UserMappingService.MapToUser(dbUser)?.Roles ?? new List<string>();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting user roles for: {UserId}", userId);
            return new List<string>();
        }
    }

    public async Task<List<string>> GetUserPermissionsAsync(int userId)
    {
        try
        {
            _logger.LogInformation("Getting permissions for user: {UserId}", userId);
            
            var dbUser = await _context.BsUserMs
                .FirstOrDefaultAsync(u => u.LId == userId);

            if (dbUser == null)
                return new List<string>();

            return UserMappingService.MapToUser(dbUser)?.Permissions ?? new List<string>();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting user permissions for: {UserId}", userId);
            return new List<string>();
        }
    }

    public async Task UpdateLastLoginAsync(int userId)
    {
        try
        {
            _logger.LogInformation("Updating last login for user: {UserId}", userId);
            
            var dbUser = await _context.BsUserMs
                .FirstOrDefaultAsync(u => u.LId == userId);

            if (dbUser != null)
            {
                dbUser.LastLoginDate = DateTime.UtcNow;
                await _context.SaveChangesAsync();
                _logger.LogInformation("Last login updated successfully for user: {UserId}", userId);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while updating last login for: {UserId}", userId);
        }
    }
}