using ERP.Identity.Domain.Entities;
using ERP.Identity.Domain.Services;
using ERP.Identity.Infrastructure.Data;
using ERP.Identity.Infrastructure.Services;
using ERP.BuildingBlocks.Data.Caching;
using ERP.BuildingBlocks.Data.Models;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace ERP.Identity.Infrastructure.Services;

/// <summary>
/// AuthenticationService with SqlDependency caching for improved performance
/// </summary>
public class CachedAuthenticationService : IAuthenticationService
{
    private readonly IdentityDbContext _context;
    private readonly ISqlDependencyCacheService _cacheService;
    private readonly ILogger<CachedAuthenticationService> _logger;
    private readonly string _connectionString;

    public CachedAuthenticationService(
        IdentityDbContext context,
        ISqlDependencyCacheService cacheService,
        ILogger<CachedAuthenticationService> logger,
        IConfiguration configuration)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _cacheService = cacheService ?? throw new ArgumentNullException(nameof(cacheService));
        _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        _connectionString = configuration.GetConnectionString("Default")!;
    }

    public async Task<User?> AuthenticateUserAsync(string email, string password)
    {
        try
        {
            _logger.LogInformation("Authentication attempt for email: {Email}", email);
            
            // First, get the user from cache or database
            var user = await GetUserByEmailAsync(email);
            
            if (user == null)
            {
                _logger.LogWarning("User not found: {Email}", email);
                return null;
            }

            // Simple password verification for test users
            // TODO: Implement proper password verification with BCrypt
            bool passwordValid = false;

            // Test credentials validation
            if (user.Username.ToLower() == "admin" && (password == "admin" || password == "Admin@123"))
            {
                passwordValid = true;
            }
            else if (user.Username.ToLower() == "testuser" && password == "test123")
            {
                passwordValid = true;
            }
            // Check against stored password hash for demo
            else if (!string.IsNullOrEmpty(user.PasswordHash) && user.PasswordHash == password)
            {
                passwordValid = true;
            }

            if (passwordValid)
            {
                // Update last login
                await UpdateLastLoginAsync(user.Id);
                _logger.LogInformation("Authentication successful for user: {Email}", email);
                return user;
            }

            _logger.LogWarning("Invalid password for user: {Email}", email);
            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred during authentication for email: {Email}", email);
            return null;
        }
    }

    public async Task<User?> GetUserByIdAsync(int userId)
    {
        try
        {
            var cacheKey = $"user_by_id:{userId}";
            var query = "SELECT * FROM Users WHERE Id = @userId AND IsActive = 1";
            
            var user = await _cacheService.GetOrSetAsync<User>(
                cacheKey,
                async () =>
                {
                    // TODO: Implement actual database query
                    _logger.LogDebug("Fetching user from database: {UserId}", userId);
                    
                    // Temporary implementation for demo
                    return new User
                    {
                        Id = userId,
                        Username = "admin",
                        Email = "admin@test.com",
                        FirstName = "Admin",
                        LastName = "User",
                        IsActive = true,
                        CreatedAt = DateTime.UtcNow,
                        LastLoginAt = DateTime.UtcNow,
                        Roles = new List<string> { "Administrator" },
                        Permissions = new List<string> { "users.read", "users.write", "products.read", "products.write" }
                    };
                },
                query,
                _connectionString,
                TimeSpan.FromMinutes(30) // Cache for 30 minutes
            );

            return user;
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
            var cacheKey = $"user_by_email:{email.ToLowerInvariant()}";
            
            // For now, provide test users while database integration is being completed
            // This allows testing the authentication flow
            if (email.ToLower() == "admin" || email.ToLower() == "admin@test.com" || email.ToLower() == "admin@ltindia.com")
            {
                return new User
                {
                    Id = 1,
                    Username = "admin",
                    Email = "admin@ltindia.com",
                    PasswordHash = "admin", // Simple password for demo
                    FirstName = "System",
                    LastName = "Administrator",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-30),
                    LastLoginAt = DateTime.UtcNow.AddHours(-2),
                    Roles = new List<string> { "SuperAdmin", "Admin", "User" },
                    Permissions = new List<string> 
                    { 
                        "users.read", "users.write", "users.delete",
                        "customers.read", "customers.write", "customers.delete",
                        "jobs.read", "jobs.write", "jobs.delete",
                        "invoices.read", "invoices.write", "invoices.delete",
                        "reports.read", "reports.write",
                        "settings.read", "settings.write",
                        "admin.full_access"
                    },
                    UserType = -1, // SuperAdmin
                    RoleId = 1
                };
            }

            if (email.ToLower() == "testuser" || email.ToLower() == "test@user.com")
            {
                return new User
                {
                    Id = 2,
                    Username = "testuser",
                    Email = "test@user.com", 
                    PasswordHash = "test123", // Simple password for demo
                    FirstName = "Test",
                    LastName = "User",
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow.AddDays(-10),
                    LastLoginAt = DateTime.UtcNow.AddDays(-1),
                    Roles = new List<string> { "Employee", "User" },
                    Permissions = new List<string> 
                    { 
                        "jobs.read", "jobs.write",
                        "customers.read", "customers.write",
                        "invoices.read", "invoices.write",
                        "reports.read"
                    },
                    UserType = 1, // Employee
                    RoleId = 2
                };
            }

            // TODO: Replace with actual BsUserM database query
            // var query = "SELECT * FROM BsUserM WHERE LOWER(SEmail) = @email AND LoginActive = 1";
            // var parameters = new Dictionary<string, object> { { "email", email.ToLowerInvariant() } };
            // var dbUsers = await _cacheService.GetOrSetAsync<List<BsUserM>>(cacheKey, query, _connectionString, parameters, TimeSpan.FromMinutes(15));
            // var dbUser = dbUsers?.FirstOrDefault();
            // return dbUser != null ? UserMappingService.MapToUser(dbUser) : null;

            return null;
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
            var cacheKey = $"user_roles:{userId}";
            var query = "SELECT r.Name FROM Roles r INNER JOIN UserRoles ur ON r.Id = ur.RoleId WHERE ur.UserId = @userId";
            var parameters = new Dictionary<string, object> { { "userId", userId } };
            
            var roles = await _cacheService.GetOrSetAsync<List<string>>(
                cacheKey,
                query,
                _connectionString,
                parameters,
                TimeSpan.FromMinutes(60) // Cache for 1 hour
            );

            // Return sample roles if cache returned null
            return roles ?? new List<string> { "Administrator", "User" };
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
            var cacheKey = $"user_permissions:{userId}";
            var query = @"
                SELECT DISTINCT p.Name 
                FROM Permissions p
                INNER JOIN RolePermissions rp ON p.Id = rp.PermissionId
                INNER JOIN UserRoles ur ON rp.RoleId = ur.RoleId
                WHERE ur.UserId = @userId";
            var parameters = new Dictionary<string, object> { { "userId", userId } };
            
            var permissions = await _cacheService.GetOrSetAsync<List<string>>(
                cacheKey,
                query,
                _connectionString,
                parameters,
                TimeSpan.FromMinutes(60) // Cache for 1 hour
            );

            // Return sample permissions if cache returned null
            return permissions ?? new List<string>
            {
                "users.read", "users.write", "products.read", 
                "products.write", "orders.read", "orders.write"
            };
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
            
            // TODO: Implement actual database update
            // For now, just invalidate relevant cache entries
            _cacheService.Remove($"user_by_id:{userId}");
            
            // If we knew the email, we could also invalidate:
            // _cacheService.Remove($"user_by_email:{email}");
            
            await Task.CompletedTask;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while updating last login for user: {UserId}", userId);
        }
    }
}
