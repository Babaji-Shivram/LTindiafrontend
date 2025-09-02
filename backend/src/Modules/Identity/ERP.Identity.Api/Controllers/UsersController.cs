using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ERP.Identity.Api.DTOs;
using ERP.Identity.Domain.Services;
using ERP.Identity.Domain.Models;

namespace ERP.Identity.Api.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
// [Authorize] // Require authentication for all endpoints - Temporarily disabled for development
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILoginHistoryService _loginHistoryService;
    private readonly ISessionService _sessionService;
    private readonly ILogger<UsersController> _logger;

    public UsersController(
        IUserService userService,
        ILoginHistoryService loginHistoryService,
        ISessionService sessionService,
        ILogger<UsersController> logger)
    {
        _userService = userService;
        _loginHistoryService = loginHistoryService;
        _sessionService = sessionService;
        _logger = logger;
    }

    /// <summary>
    /// Get detailed information about a specific user
    /// </summary>
    /// <param name="id">User ID</param>
    /// <returns>User detail information</returns>
    [HttpGet("{id}/detail")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<ActionResult<UserDetailResponse>> GetUserDetail(int id)
    {
        try
        {
            var user = await _userService.GetUserDetailAsync(id);
            
            if (user == null)
            {
                _logger.LogWarning("User with ID {UserId} not found", id);
                return NotFound($"User with ID {id} not found");
            }

            var userDetail = await MapToUserDetailResponse(user);
            return Ok(userDetail);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving user detail for ID {UserId}", id);
            return StatusCode(500, "An error occurred while retrieving user details");
        }
    }

    /// <summary>
    /// Get login attempts for a specific user
    /// </summary>
    /// <param name="id">User ID</param>
    /// <param name="limit">Maximum number of attempts to return (default: 20)</param>
    /// <returns>List of login attempts</returns>
    [HttpGet("{id}/login-attempts")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<ActionResult<List<LoginAttemptDto>>> GetLoginAttempts(int id, [FromQuery] int limit = 20)
    {
        try
        {
            // Verify user exists
            var userExists = await _userService.UserExistsAsync(id);
            if (!userExists)
            {
                return NotFound($"User with ID {id} not found");
            }

            var loginAttempts = await _loginHistoryService.GetRecentLoginAttemptsAsync(id, limit);
            var loginAttemptDtos = loginAttempts.Select(MapToLoginAttemptDto).ToList();
            
            return Ok(loginAttemptDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving login attempts for user ID {UserId}", id);
            return StatusCode(500, "An error occurred while retrieving login attempts");
        }
    }

    /// <summary>
    /// Get login history for a specific user with pagination
    /// </summary>
    /// <param name="id">User ID</param>
    /// <param name="days">Number of days to look back (default: 30)</param>
    /// <returns>Login history with pagination</returns>
    [HttpGet("{id}/login-history")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<ActionResult<LoginHistoryResponse>> GetLoginHistory(int id, [FromQuery] int days = 30)
    {
        try
        {
            // Verify user exists
            var userExists = await _userService.UserExistsAsync(id);
            if (!userExists)
            {
                return NotFound($"User with ID {id} not found");
            }

            var fromDate = DateTime.UtcNow.AddDays(-days);
            var loginHistory = await _loginHistoryService.GetLoginHistoryAsync(id, fromDate);
            
            var response = new LoginHistoryResponse
            {
                Data = loginHistory.Select(MapToLoginAttemptDto).ToList(),
                Total = loginHistory.Count,
                Page = 1,
                PageSize = loginHistory.Count
            };
            
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving login history for user ID {UserId}", id);
            return StatusCode(500, "An error occurred while retrieving login history");
        }
    }

    /// <summary>
    /// Get active sessions for a specific user
    /// </summary>
    /// <param name="id">User ID</param>
    /// <returns>List of active sessions</returns>
    [HttpGet("{id}/sessions")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<ActionResult<List<UserSessionDto>>> GetUserSessions(int id)
    {
        try
        {
            // Verify user exists
            var userExists = await _userService.UserExistsAsync(id);
            if (!userExists)
            {
                return NotFound($"User with ID {id} not found");
            }

            var sessions = await _sessionService.GetActiveSessionsAsync(id);
            var sessionDtos = sessions.Select(MapToUserSessionDto).ToList();
            
            return Ok(sessionDtos);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving sessions for user ID {UserId}", id);
            return StatusCode(500, "An error occurred while retrieving user sessions");
        }
    }

    /// <summary>
    /// Terminate a specific session
    /// </summary>
    /// <param name="sessionId">Session ID to terminate</param>
    /// <returns>Success status</returns>
    [HttpDelete("sessions/{sessionId}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<ActionResult> TerminateSession(string sessionId)
    {
        try
        {
            var success = await _sessionService.TerminateSessionAsync(sessionId);
            
            if (!success)
            {
                return NotFound($"Session with ID {sessionId} not found or already terminated");
            }

            _logger.LogInformation("Session {SessionId} terminated successfully", sessionId);
            return Ok(new { message = "Session terminated successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error terminating session {SessionId}", sessionId);
            return StatusCode(500, "An error occurred while terminating the session");
        }
    }

    /// <summary>
    /// Terminate all sessions for a specific user
    /// </summary>
    /// <param name="id">User ID</param>
    /// <returns>Success status</returns>
    [HttpDelete("{id}/sessions")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<ActionResult> TerminateAllUserSessions(int id)
    {
        try
        {
            // Verify user exists
            var userExists = await _userService.UserExistsAsync(id);
            if (!userExists)
            {
                return NotFound($"User with ID {id} not found");
            }

            var terminatedCount = await _sessionService.TerminateAllUserSessionsAsync(id);
            
            _logger.LogInformation("Terminated {Count} sessions for user ID {UserId}", terminatedCount, id);
            return Ok(new { message = $"Successfully terminated {terminatedCount} sessions" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error terminating all sessions for user ID {UserId}", id);
            return StatusCode(500, "An error occurred while terminating user sessions");
        }
    }

    /// <summary>
    /// Update user information
    /// </summary>
    /// <param name="id">User ID</param>
    /// <param name="request">Update request</param>
    /// <returns>Updated user details</returns>
    [HttpPut("{id}")]
    // [Authorize(Roles = "Admin,Manager")] // Temporarily disabled for development
    public async Task<ActionResult<UserDetailResponse>> UpdateUser(int id, [FromBody] UpdateUserRequest request)
    {
        try
        {
            if (id != request.Id)
            {
                return BadRequest("User ID mismatch");
            }

            var updateModel = new UpdateUserModel
            {
                Id = request.Id,
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Department = request.Department,
                Position = request.Position,
                EmployeeId = request.EmployeeId,
                RoleId = request.RoleId,
                IsActive = request.IsActive
            };
            
            var updatedUser = await _userService.UpdateUserAsync(updateModel);
            
            if (updatedUser == null)
            {
                return NotFound($"User with ID {id} not found");
            }

            var userDetail = await MapToUserDetailResponse(updatedUser);
            
            _logger.LogInformation("User {UserId} updated successfully", id);
            return Ok(userDetail);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating user ID {UserId}", id);
            return StatusCode(500, "An error occurred while updating the user");
        }
    }

    #region Private Helper Methods

    private async Task<UserDetailResponse> MapToUserDetailResponse(UserDetail user)
    {
        // Get additional user details
        var twoFactorDetails = await _userService.GetTwoFactorDetailsAsync(user.Id);
        var role = await _userService.GetUserRoleAsync(user.Id);
        
        return new UserDetailResponse
        {
            Id = user.Id,
            UserName = user.Username,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            PhoneNumber = user.PhoneNumber,
            ProfilePicture = user.ProfilePicture,
            Department = user.Department,
            Position = user.Position,
            EmployeeId = user.EmployeeId,
            Status = user.IsActive ? "Active" : user.IsLocked ? "Locked" : "Inactive",
            IsActive = user.IsActive,
            IsLocked = user.IsLocked,
            IsEmailVerified = user.IsEmailVerified,
            TwoFactorEnabled = twoFactorDetails?.Enabled ?? false,
            TwoFactorSetupDate = twoFactorDetails?.SetupDate,
            CreatedDate = user.CreatedAt,
            LastLoginDate = user.LastLoginAt,
            LastLoginLocation = user.LastLoginLocation,
            PreviousLoginDate = user.PreviousLoginDate,
            LoginAttempts = user.LoginAttempts,
            LastFailedLoginDate = user.LastFailedLoginDate,
            RoleId = user.RoleId,
            RoleName = role?.Name,
            AccountLocked = user.IsLocked,
            LockoutEndDate = user.LockoutEndDate,
            TwoFactorDetails = twoFactorDetails != null ? new TwoFactorDetailsDto
            {
                Enabled = twoFactorDetails.Enabled,
                SetupDate = twoFactorDetails.SetupDate,
                LastUsed = twoFactorDetails.LastUsed,
                BackupCodesRemaining = twoFactorDetails.BackupCodesRemaining
            } : null,
            CreatedBy = user.CreatedBy,
            ModifiedDate = user.ModifiedDate,
            ModifiedBy = user.ModifiedBy
        };
    }

    private static LoginAttemptDto MapToLoginAttemptDto(LoginAttempt loginAttempt)
    {
        return new LoginAttemptDto
        {
            Id = loginAttempt.Id,
            UserId = loginAttempt.UserId,
            AttemptTime = loginAttempt.AttemptTime,
            IpAddress = loginAttempt.IpAddress,
            UserAgent = loginAttempt.UserAgent,
            Location = loginAttempt.Location,
            IsSuccessful = loginAttempt.IsSuccessful,
            FailureReason = loginAttempt.FailureReason,
            TwoFactorUsed = loginAttempt.TwoFactorUsed
        };
    }

    private static UserSessionDto MapToUserSessionDto(UserSession session)
    {
        return new UserSessionDto
        {
            SessionId = session.SessionId,
            StartTime = session.StartTime,
            LastActivity = session.LastActivity,
            IpAddress = session.IpAddress,
            UserAgent = session.UserAgent,
            DeviceType = GetDeviceType(session.UserAgent),
            Location = session.Location,
            IsActive = session.IsActive
        };
    }

    private static string GetDeviceType(string userAgent)
    {
        if (string.IsNullOrEmpty(userAgent))
            return "Unknown";

        userAgent = userAgent.ToLower();
        
        if (userAgent.Contains("mobile") || userAgent.Contains("android") || userAgent.Contains("iphone"))
            return "Mobile";
        
        if (userAgent.Contains("tablet") || userAgent.Contains("ipad"))
            return "Tablet";
        
        return "Desktop";
    }

    #endregion
}
