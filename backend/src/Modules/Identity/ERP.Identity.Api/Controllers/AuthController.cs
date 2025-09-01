using Microsoft.AspNetCore.Mvc;
using ERP.Identity.Api.DTOs;
using ERP.Identity.Domain.Services;

namespace ERP.Identity.Api.Controllers;

[ApiController]
[Route("api/v1/identity/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IJwtService _jwtService;
    private readonly IRefreshTokenService _refreshTokenService;
    private readonly IAuthenticationService _authenticationService;
    private readonly IAuditService _auditService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(
        IJwtService jwtService, 
        IRefreshTokenService refreshTokenService,
        IAuthenticationService authenticationService, 
        IAuditService auditService,
        ILogger<AuthController> logger)
    {
        _jwtService = jwtService;
        _refreshTokenService = refreshTokenService;
        _authenticationService = authenticationService;
        _auditService = auditService;
        _logger = logger;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var clientIp = GetClientIpAddress();
            await _auditService.LogLoginAttemptAsync(request.Username, false, clientIp, Request.Headers.UserAgent);

            // Authenticate user against database
            var user = await _authenticationService.AuthenticateUserAsync(request.Username, request.Password);
            
            if (user == null)
            {
                _logger.LogWarning("Failed login attempt for username: {Username} from IP: {IpAddress}", request.Username, clientIp);
                await _auditService.LogLoginAttemptAsync(request.Username, false, clientIp, Request.Headers.UserAgent);
                return Unauthorized("Invalid username or password");
            }

            // Update last login
            await _authenticationService.UpdateLastLoginAsync(user.Id);

            // Generate JWT token
            var token = _jwtService.GenerateToken(user);
            
            // Generate refresh token
            var refreshToken = await _refreshTokenService.GenerateRefreshTokenAsync(user.Id);

            var response = new LoginResponse
            {
                Token = token,
                RefreshToken = refreshToken,
                ExpiresAt = DateTime.UtcNow.AddMinutes(60),
                User = new UserInfoDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Roles = user.Roles,
                    Permissions = user.Permissions
                }
            };

            _logger.LogInformation("User {Username} logged in successfully from IP: {IpAddress}", request.Username, clientIp);
            await _auditService.LogLoginAttemptAsync(request.Username, true, clientIp, Request.Headers.UserAgent);
            
            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during login for username: {Username}", request.Username);
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost("validate-token")]
    public IActionResult ValidateToken([FromBody] ValidateTokenRequest request)
    {
        try
        {
            var isValid = _jwtService.ValidateToken(request.Token);
            
            if (isValid)
            {
                var userId = _jwtService.GetUserIdFromToken(request.Token);
                var roles = _jwtService.GetRolesFromToken(request.Token).ToList();
                var permissions = _jwtService.GetPermissionsFromToken(request.Token).ToList();

                var response = new ValidateTokenResponse
                {
                    IsValid = true,
                    UserId = userId,
                    Roles = roles,
                    Permissions = permissions
                };

                return Ok(response);
            }

            return Ok(new ValidateTokenResponse { IsValid = false });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating token");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        try
        {
            var clientIp = GetClientIpAddress();
            
            if (string.IsNullOrEmpty(request.RefreshToken))
            {
                return BadRequest("Refresh token is required");
            }

            // Refresh the tokens
            var tokenPair = await _refreshTokenService.RefreshAccessTokenAsync(request.RefreshToken);

            var response = new RefreshTokenResponse
            {
                AccessToken = tokenPair.AccessToken,
                RefreshToken = tokenPair.RefreshToken,
                AccessTokenExpiresAt = tokenPair.AccessTokenExpiresAt,
                RefreshTokenExpiresAt = tokenPair.RefreshTokenExpiresAt
            };

            _logger.LogInformation("Token refreshed successfully from IP: {IpAddress}", clientIp);
            return Ok(response);
        }
        catch (UnauthorizedAccessException ex)
        {
            _logger.LogWarning("Invalid refresh token attempt from IP: {IpAddress}. Error: {Error}", GetClientIpAddress(), ex.Message);
            return Unauthorized("Invalid or expired refresh token");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error refreshing token");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost("revoke-token")]
    public async Task<IActionResult> RevokeToken([FromBody] RevokeTokenRequest request)
    {
        try
        {
            if (string.IsNullOrEmpty(request.RefreshToken))
            {
                return BadRequest("Refresh token is required");
            }

            await _refreshTokenService.RevokeRefreshTokenAsync(request.RefreshToken);
            
            _logger.LogInformation("Refresh token revoked successfully from IP: {IpAddress}", GetClientIpAddress());
            return Ok(new { message = "Token revoked successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error revoking token");
            return StatusCode(500, "Internal server error");
        }
    }

    [HttpPost("revoke-all-tokens")]
    public async Task<IActionResult> RevokeAllUserTokens([FromBody] RevokeAllTokensRequest request)
    {
        try
        {
            if (request.UserId <= 0)
            {
                return BadRequest("Valid user ID is required");
            }

            await _refreshTokenService.RevokeAllUserTokensAsync(request.UserId);
            
            _logger.LogInformation("All tokens revoked for user {UserId} from IP: {IpAddress}", request.UserId, GetClientIpAddress());
            return Ok(new { message = "All user tokens revoked successfully" });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error revoking all user tokens for user {UserId}", request.UserId);
            return StatusCode(500, "Internal server error");
        }
    }

    private string GetClientIpAddress()
    {
        // Check for forwarded IP addresses (behind load balancer/proxy)
        var forwardedFor = Request.Headers["X-Forwarded-For"].FirstOrDefault();
        if (!string.IsNullOrEmpty(forwardedFor))
        {
            return forwardedFor.Split(',')[0].Trim();
        }

        var realIp = Request.Headers["X-Real-IP"].FirstOrDefault();
        if (!string.IsNullOrEmpty(realIp))
        {
            return realIp;
        }

        // Fall back to connection remote IP
        return HttpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
    }
}
