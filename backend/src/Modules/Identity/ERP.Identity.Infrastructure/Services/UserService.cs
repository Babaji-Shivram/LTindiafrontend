using ERP.Identity.Domain.Models;
using ERP.Identity.Domain.Services;
using Microsoft.Extensions.Logging;

namespace ERP.Identity.Infrastructure.Services;

public class UserService : IUserService
{
    private readonly ILogger<UserService> _logger;

    public UserService(ILogger<UserService> logger)
    {
        _logger = logger;
    }

    public async Task<UserDetail?> GetUserDetailAsync(int userId)
    {
        // TODO: Implement actual database query
        // This is a mock implementation for now
        await Task.Delay(100); // Simulate async operation

        // Mock data based on your existing structure
        var mockUsers = GetMockUsers();
        return mockUsers.FirstOrDefault(u => u.Id == userId);
    }

    public async Task<bool> UserExistsAsync(int userId)
    {
        // TODO: Implement actual database query
        await Task.Delay(50);
        var user = await GetUserDetailAsync(userId);
        return user != null;
    }

    public async Task<UserDetail?> UpdateUserAsync(UpdateUserModel request)
    {
        // TODO: Implement actual database update
        await Task.Delay(100);
        
        var user = await GetUserDetailAsync(request.Id);
        if (user == null) return null;

        // Update user properties
        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.Email = request.Email;
        user.PhoneNumber = request.PhoneNumber;
        user.Department = request.Department;
        user.Position = request.Position;
        user.EmployeeId = request.EmployeeId;
        user.RoleId = request.RoleId;
        user.IsActive = request.IsActive;
        user.ModifiedDate = DateTime.UtcNow;

        return user;
    }

    public async Task<TwoFactorDetails?> GetTwoFactorDetailsAsync(int userId)
    {
        // TODO: Implement actual database query
        await Task.Delay(50);

        // Mock 2FA details
        return new TwoFactorDetails
        {
            Enabled = userId == 1, // Mock: only user 1 has 2FA enabled
            SetupDate = userId == 1 ? DateTime.UtcNow.AddDays(-30) : null,
            LastUsed = userId == 1 ? DateTime.UtcNow.AddHours(-2) : null,
            BackupCodesRemaining = userId == 1 ? 8 : 0
        };
    }

    public async Task<UserRole?> GetUserRoleAsync(int userId)
    {
        // TODO: Implement actual database query
        await Task.Delay(50);

        // Mock roles
        var roles = new Dictionary<int, UserRole>
        {
            { 1, new UserRole { Id = 1, Name = "Admin" } },
            { 2, new UserRole { Id = 2, Name = "Manager" } },
            { 3, new UserRole { Id = 3, Name = "User" } },
            { 4, new UserRole { Id = 4, Name = "Viewer" } }
        };

        var user = await GetUserDetailAsync(userId);
        if (user?.RoleId.HasValue == true && roles.ContainsKey(user.RoleId.Value))
        {
            return roles[user.RoleId.Value];
        }

        return new UserRole { Id = 3, Name = "User" }; // Default role
    }

    private static List<UserDetail> GetMockUsers()
    {
        return new List<UserDetail>
        {
            new UserDetail
            {
                Id = 1,
                Username = "john.doe",
                Email = "john.doe@ltindia.com",
                FirstName = "John",
                LastName = "Doe",
                PhoneNumber = "+91 9876543210",
                Department = "IT",
                Position = "Senior Developer",
                EmployeeId = "EMP001",
                IsActive = true,
                IsLocked = false,
                IsEmailVerified = true,
                CreatedAt = DateTime.UtcNow.AddDays(-60),
                LastLoginAt = DateTime.UtcNow.AddHours(-2),
                LastLoginLocation = "Mumbai, India",
                PreviousLoginDate = DateTime.UtcNow.AddDays(-1),
                LoginAttempts = 125,
                RoleId = 1,
                CreatedBy = "System Admin"
            },
            new UserDetail
            {
                Id = 2,
                Username = "jane.smith",
                Email = "jane.smith@ltindia.com",
                FirstName = "Jane",
                LastName = "Smith",
                PhoneNumber = "+91 9876543211",
                Department = "HR",
                Position = "HR Manager",
                EmployeeId = "EMP002",
                IsActive = true,
                IsLocked = false,
                IsEmailVerified = true,
                CreatedAt = DateTime.UtcNow.AddDays(-45),
                LastLoginAt = DateTime.UtcNow.AddHours(-6),
                LastLoginLocation = "Mumbai, India",
                PreviousLoginDate = DateTime.UtcNow.AddDays(-2),
                LoginAttempts = 89,
                RoleId = 2,
                CreatedBy = "System Admin"
            },
            new UserDetail
            {
                Id = 3,
                Username = "mike.johnson",
                Email = "mike.johnson@ltindia.com",
                FirstName = "Mike",
                LastName = "Johnson",
                PhoneNumber = "+91 9876543212",
                Department = "Finance",
                Position = "Financial Analyst",
                EmployeeId = "EMP003",
                IsActive = false,
                IsLocked = false,
                IsEmailVerified = true,
                CreatedAt = DateTime.UtcNow.AddDays(-30),
                LastLoginAt = DateTime.UtcNow.AddDays(-7),
                LastLoginLocation = "Delhi, India",
                PreviousLoginDate = DateTime.UtcNow.AddDays(-10),
                LoginAttempts = 67,
                RoleId = 3,
                CreatedBy = "System Admin"
            }
        };
    }
}
