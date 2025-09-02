namespace ERP.Api.DTOs
{
    public class UserListResponse
    {
        public List<UserDto> users { get; set; } = new(); // Changed to lowercase to match frontend
        public int totalCount { get; set; } // Changed to camelCase to match frontend  
        public int pageSize { get; set; } // Changed to camelCase to match frontend
        public int pageNumber { get; set; } // Changed to camelCase to match frontend
        public int totalPages { get; set; } // Changed to camelCase to match frontend
    }

    public class UserDto
    {
        public int id { get; set; }
        public string userName { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public string firstName { get; set; } = string.Empty;
        public string lastName { get; set; } = string.Empty;
        public string fullName { get; set; } = string.Empty;
        public string? phoneNumber { get; set; }
        public string? profilePicture { get; set; }
        public string? department { get; set; }
        public string? position { get; set; }
        public string? employeeId { get; set; }
        public bool isActive { get; set; }
        public bool isLocked { get; set; }
        public bool isEmailVerified { get; set; }
        public bool twoFactorEnabled { get; set; }
        public DateTime? twoFactorSetupDate { get; set; }
        public DateTime createdDate { get; set; }
        public DateTime? lastLoginDate { get; set; }
        public string? lastLoginLocation { get; set; }
        public DateTime? previousLoginDate { get; set; }
        public int loginAttempts { get; set; }
        public DateTime? lastFailedLoginDate { get; set; }
        public int roleId { get; set; }
        public string roleName { get; set; } = string.Empty;
        public string status { get; set; } = string.Empty;
    }

    public class UserDetailResponse
    {
        public UserDto User { get; set; } = new();
        public List<LoginHistoryDto> RecentLogins { get; set; } = new();
        public List<SessionDto> ActiveSessions { get; set; } = new();
        public UserStatsDto Stats { get; set; } = new();
    }

    public class LoginHistoryDto
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
    }

    public class SessionDto
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
    }

    public class SessionResponse : SessionDto
    {
    }

    public class UserStatsDto
    {
        public int TotalLogins { get; set; }
        public int FailedLogins { get; set; }
        public int ActiveSessions { get; set; }
        public DateTime? LastActivity { get; set; }
        public int DaysActive { get; set; }
    }
}
