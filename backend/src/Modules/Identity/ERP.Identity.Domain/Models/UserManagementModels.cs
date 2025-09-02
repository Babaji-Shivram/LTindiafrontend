namespace ERP.Identity.Domain.Models;

public class UserDetail
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
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
    public DateTime CreatedAt { get; set; }
    public DateTime? LastLoginAt { get; set; }
    public string? LastLoginLocation { get; set; }
    public DateTime? PreviousLoginDate { get; set; }
    public int LoginAttempts { get; set; }
    public DateTime? LastFailedLoginDate { get; set; }
    public int? RoleId { get; set; }
    public DateTime? LockoutEndDate { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? ModifiedBy { get; set; }
}

public class LoginAttempt
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public DateTime AttemptTime { get; set; }
    public string IpAddress { get; set; } = string.Empty;
    public string UserAgent { get; set; } = string.Empty;
    public string? Location { get; set; }
    public bool IsSuccessful { get; set; }
    public string? FailureReason { get; set; }
    public bool TwoFactorUsed { get; set; }
}

public class UserSession
{
    public string SessionId { get; set; } = string.Empty;
    public int UserId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime LastActivity { get; set; }
    public string IpAddress { get; set; } = string.Empty;
    public string UserAgent { get; set; } = string.Empty;
    public string? Location { get; set; }
    public bool IsActive { get; set; }
}

public class TwoFactorDetails
{
    public bool Enabled { get; set; }
    public DateTime? SetupDate { get; set; }
    public DateTime? LastUsed { get; set; }
    public int BackupCodesRemaining { get; set; }
}

public class UserRole
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
}

public class UpdateUserModel
{
    public int Id { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public string? Department { get; set; }
    public string? Position { get; set; }
    public string? EmployeeId { get; set; }
    public int? RoleId { get; set; }
    public bool IsActive { get; set; }
}
