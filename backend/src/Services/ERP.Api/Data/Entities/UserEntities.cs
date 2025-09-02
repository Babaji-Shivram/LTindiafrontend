using Microsoft.EntityFrameworkCore;

namespace ERP.Api.Data.Entities
{
    // User Management Tables
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? PhoneNumber { get; set; }
        public string? ProfilePicture { get; set; }
        public string? Department { get; set; }
        public string? Position { get; set; }
        public string? EmployeeId { get; set; }
        public bool IsActive { get; set; }
        public bool IsLocked { get; set; }
        public bool IsEmailVerified { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public DateTime? TwoFactorSetupDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public string? LastLoginLocation { get; set; }
        public DateTime? PreviousLoginDate { get; set; }
        public int LoginAttempts { get; set; }
        public DateTime? LastFailedLoginDate { get; set; }
        public int RoleId { get; set; }
        public string Status { get; set; } = "Active";
        
        // Navigation properties
        public virtual Role? Role { get; set; }
        public virtual ICollection<LoginHistory> LoginHistories { get; set; } = new List<LoginHistory>();
        public virtual ICollection<UserSession> UserSessions { get; set; } = new List<UserSession>();
    }

    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public bool IsActive { get; set; }
        public bool IsSystemRole { get; set; }
        public int Priority { get; set; }
        public DateTime CreatedDate { get; set; }
        
        // Navigation properties
        public virtual ICollection<User> Users { get; set; } = new List<User>();
    }

    public class LoginHistory
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime LoginTime { get; set; }
        public DateTime? LogoutTime { get; set; }
        public string IpAddress { get; set; } = string.Empty;
        public string? UserAgent { get; set; }
        public string? DeviceType { get; set; }
        public string? BrowserName { get; set; }
        public string? Location { get; set; }
        public bool IsSuccessful { get; set; }
        public string? FailureReason { get; set; }
        
        // Navigation properties
        public virtual User User { get; set; } = null!;
    }

    public class UserSession
    {
        public string Id { get; set; } = string.Empty;
        public int UserId { get; set; }
        public DateTime LoginTime { get; set; }
        public DateTime LastActivityTime { get; set; }
        public string IpAddress { get; set; } = string.Empty;
        public string? DeviceType { get; set; }
        public string? BrowserName { get; set; }
        public string? Location { get; set; }
        public bool IsActive { get; set; }
        
        // Navigation properties
        public virtual User User { get; set; } = null!;
    }
}
