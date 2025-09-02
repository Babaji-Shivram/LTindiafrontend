namespace ERP.Identity.Api.DTOs;

// User Detail DTOs
public class UserDetailResponse
{
    public int Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string FullName => $"{FirstName} {LastName}";
    public string? PhoneNumber { get; set; }
    public string? ProfilePicture { get; set; }
    public string? Department { get; set; }
    public string? Position { get; set; }
    public string? EmployeeId { get; set; }
    public string Status { get; set; } = "Active";
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
    public int? RoleId { get; set; }
    public string? RoleName { get; set; }
    public bool AccountLocked { get; set; }
    public DateTime? LockoutEndDate { get; set; }
    public TwoFactorDetailsDto? TwoFactorDetails { get; set; }
    public string? CreatedBy { get; set; }
    public DateTime? ModifiedDate { get; set; }
    public string? ModifiedBy { get; set; }
}

public class TwoFactorDetailsDto
{
    public bool Enabled { get; set; }
    public DateTime? SetupDate { get; set; }
    public DateTime? LastUsed { get; set; }
    public int BackupCodesRemaining { get; set; }
}

// Login History DTOs
public class LoginAttemptDto
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

public class LoginHistoryResponse
{
    public List<LoginAttemptDto> Data { get; set; } = new();
    public int Total { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }
}

// Session DTOs
public class UserSessionDto
{
    public string SessionId { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public DateTime LastActivity { get; set; }
    public string IpAddress { get; set; } = string.Empty;
    public string UserAgent { get; set; } = string.Empty;
    public string DeviceType { get; set; } = string.Empty;
    public string? Location { get; set; }
    public bool IsActive { get; set; }
}

// Request DTOs
public class UpdateUserRequest
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
