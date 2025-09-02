using ERP.Api.Services.Interfaces;
using ERP.Api.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ERP.Api.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    // [Authorize] // Temporarily disabled for testing
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
        /// Get paginated list of users
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<UserListResponse>> GetUsers(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? search = null,
            [FromQuery] int? roleId = null,
            [FromQuery] bool? isActive = null,
            [FromQuery] int? loggedInUserId = null)
        {
            try
            {
                _logger.LogInformation("Getting users - Page: {Page}, PageSize: {PageSize}, LoggedInUserId: {LoggedInUserId}", page, pageSize, loggedInUserId);
                
                // If pageSize is -1, get all users
                if (pageSize == -1)
                {
                    _logger.LogInformation("Fetching all users (no pagination)");
                }
                
                var result = await _userService.GetUsersAsync(page, pageSize, search, roleId, isActive, loggedInUserId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting users");
                return StatusCode(500, "Internal server error while retrieving users");
            }
        }

        /// <summary>
        /// Get a specific user by ID
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            try
            {
                _logger.LogInformation("Getting user for ID: {UserId}", id);
                
                var user = await _userService.GetUserByIdAsync(id);
                if (user == null)
                {
                    return NotFound($"User with ID {id} not found");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user for ID: {UserId}", id);
                return StatusCode(500, "Internal server error while retrieving user");
            }
        }

        /// <summary>
        /// Get detailed information about a specific user
        /// </summary>
        [HttpGet("{id}/detail")]
        public async Task<ActionResult<UserDetailResponse>> GetUserDetail(int id)
        {
            try
            {
                _logger.LogInformation("Getting user detail for ID: {UserId}", id);
                
                var userDetail = await _userService.GetUserDetailAsync(id);
                if (userDetail == null)
                {
                    return NotFound($"User with ID {id} not found");
                }

                return Ok(userDetail);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting user detail for ID: {UserId}", id);
                return StatusCode(500, "Internal server error while retrieving user details");
            }
        }

        /// <summary>
        /// Get active sessions for a specific user
        /// </summary>
        [HttpGet("{id}/sessions")]
        public async Task<ActionResult<IEnumerable<SessionResponse>>> GetUserSessions(int id)
        {
            try
            {
                _logger.LogInformation("Getting sessions for user ID: {UserId}", id);
                
                var sessions = await _sessionService.GetActiveSessionsAsync(id);
                return Ok(sessions);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting sessions for user ID: {UserId}", id);
                return StatusCode(500, "Internal server error while retrieving user sessions");
            }
        }

        /// <summary>
        /// Terminate a specific user session
        /// </summary>
        [HttpDelete("sessions/{sessionId}")]
        public async Task<ActionResult> TerminateSession(string sessionId)
        {
            try
            {
                _logger.LogInformation("Terminating session: {SessionId}", sessionId);
                
                var success = await _sessionService.TerminateSessionAsync(sessionId);
                if (!success)
                {
                    return NotFound($"Session {sessionId} not found or already terminated");
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error terminating session: {SessionId}", sessionId);
                return StatusCode(500, "Internal server error while terminating session");
            }
        }
    }
}
