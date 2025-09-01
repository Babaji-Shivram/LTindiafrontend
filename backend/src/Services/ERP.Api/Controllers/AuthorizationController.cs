using Microsoft.AspNetCore.Mvc;
using ERP.UserAccessManagement.Domain.Services;

namespace ERP.Api.Controllers;

[ApiController]
[Route("api/v1/useraccess/[controller]")]
public class AuthorizationController : ControllerBase
{
    private readonly ITokenValidationService _tokenValidationService;
    private readonly ILogger<AuthorizationController> _logger;

    public AuthorizationController(ITokenValidationService tokenValidationService, ILogger<AuthorizationController> logger)
    {
        _tokenValidationService = tokenValidationService;
        _logger = logger;
    }

    [HttpPost("validate")]
    public async Task<IActionResult> ValidateAccess([FromBody] ValidateAccessRequest request)
    {
        try
        {
            // Extract token from Authorization header
            var token = ExtractTokenFromHeader();
            if (string.IsNullOrEmpty(token))
            {
                return Unauthorized("Token not provided");
            }

            // Validate token through Identity service
            var isValid = await _tokenValidationService.ValidateTokenAsync(token);
            if (!isValid)
            {
                return Unauthorized("Invalid token");
            }

            // Get user details
            var userId = await _tokenValidationService.GetUserIdFromTokenAsync(token);
            var roles = await _tokenValidationService.GetUserRolesAsync(token);
            var permissions = await _tokenValidationService.GetUserPermissionsAsync(token);

            // Check if user has required permissions for the requested resource
            var hasAccess = CheckResourceAccess(request.Resource, request.Action, roles.ToList(), permissions.ToList());

            var response = new ValidateAccessResponse
            {
                IsAuthorized = hasAccess,
                UserId = userId,
                Roles = roles.ToList(),
                Permissions = permissions.ToList()
            };

            _logger.LogInformation("Access validation for user {UserId} to {Resource} with action {Action}: {Result}", 
                userId, request.Resource, request.Action, hasAccess ? "Granted" : "Denied");

            return Ok(response);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating access");
            return StatusCode(500, "Internal server error");
        }
    }

    private string? ExtractTokenFromHeader()
    {
        var authHeader = Request.Headers.Authorization.FirstOrDefault();
        if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
        {
            return authHeader.Substring(7);
        }
        return null;
    }

    private bool CheckResourceAccess(string resource, string action, List<string> roles, List<string> permissions)
    {
        // Simple role-based access control logic
        // You can extend this based on your business requirements
        
        // Admin role has access to everything
        if (roles.Contains("Admin"))
        {
            return true;
        }

        // Check specific permissions
        var requiredPermission = $"{resource.ToLower()}:{action.ToLower()}";
        if (permissions.Contains(requiredPermission) || permissions.Contains(action.ToLower()))
        {
            return true;
        }

        // Default: deny access
        return false;
    }
}

public class ValidateAccessRequest
{
    public string Resource { get; set; } = string.Empty;
    public string Action { get; set; } = string.Empty;
}

public class ValidateAccessResponse
{
    public bool IsAuthorized { get; set; }
    public Guid? UserId { get; set; }
    public List<string> Roles { get; set; } = new();
    public List<string> Permissions { get; set; } = new();
}
