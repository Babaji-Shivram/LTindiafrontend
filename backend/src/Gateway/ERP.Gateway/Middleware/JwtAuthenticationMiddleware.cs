using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ERP.Gateway.Middleware;

/// <summary>
/// Gateway-level JWT authentication middleware
/// Validates JWT tokens before routing to downstream services
/// </summary>
public class JwtAuthenticationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<JwtAuthenticationMiddleware> _logger;
    private readonly IConfiguration _configuration;
    private readonly TokenValidationParameters _tokenValidationParameters;

    public JwtAuthenticationMiddleware(
        RequestDelegate next, 
        ILogger<JwtAuthenticationMiddleware> logger,
        IConfiguration configuration)
    {
        _next = next;
        _logger = logger;
        _configuration = configuration;
        _tokenValidationParameters = CreateTokenValidationParameters();
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Skip authentication for certain paths
        if (ShouldSkipAuthentication(context.Request.Path))
        {
            await _next(context);
            return;
        }

        var token = ExtractTokenFromHeader(context.Request);
        if (string.IsNullOrEmpty(token))
        {
            await WriteUnauthorizedResponse(context, "Authentication required");
            return;
        }

        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, _tokenValidationParameters, out var validatedToken);
            
            // Add claims to context for downstream services
            context.User = principal;
            
            // Add user information to headers for downstream services
            AddUserInfoHeaders(context, principal);
            
            _logger.LogDebug("JWT token validated successfully for user {UserId}", 
                principal.FindFirst("sub")?.Value ?? "unknown");

            await _next(context);
        }
        catch (SecurityTokenException ex)
        {
            _logger.LogWarning("Invalid JWT token: {Error}", ex.Message);
            await WriteUnauthorizedResponse(context, "Invalid token");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating JWT token");
            await WriteUnauthorizedResponse(context, "Authentication failed");
        }
    }

    private TokenValidationParameters CreateTokenValidationParameters()
    {
        var secretKey = _configuration["JwtSettings:SecretKey"] ?? 
            throw new InvalidOperationException("JWT SecretKey not configured");
        
        return new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = _configuration["JwtSettings:Issuer"],
            ValidAudience = _configuration["JwtSettings:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
            ClockSkew = TimeSpan.FromMinutes(5)
        };
    }

    private bool ShouldSkipAuthentication(PathString path)
    {
        // Get public paths from configuration
        var publicPaths = _configuration.GetSection("JwtSettings:PublicPaths").Get<string[]>() ?? new string[0];
        
        // Add additional development/gateway paths
        var allPublicPaths = publicPaths.Concat(new[]
        {
            "/swagger",
            "/favicon.ico",
            "/api/gateway/status"
        }).ToArray();

        return allPublicPaths.Any(publicPath => 
            path.StartsWithSegments(publicPath, StringComparison.OrdinalIgnoreCase));
    }

    private static string? ExtractTokenFromHeader(HttpRequest request)
    {
        var authHeader = request.Headers["Authorization"].FirstOrDefault();
        if (authHeader?.StartsWith("Bearer ", StringComparison.OrdinalIgnoreCase) == true)
        {
            return authHeader.Substring(7);
        }
        return null;
    }

    private static void AddUserInfoHeaders(HttpContext context, ClaimsPrincipal principal)
    {
        // Add user ID for downstream services
        var userId = principal.FindFirst("sub")?.Value;
        if (!string.IsNullOrEmpty(userId))
        {
            context.Request.Headers["X-User-Id"] = userId;
        }

        // Add user roles for downstream services
        var roles = principal.FindAll("role").Select(c => c.Value);
        if (roles.Any())
        {
            context.Request.Headers["X-User-Roles"] = string.Join(",", roles);
        }

        // Add user permissions for downstream services
        var permissions = principal.FindAll("permission").Select(c => c.Value);
        if (permissions.Any())
        {
            context.Request.Headers["X-User-Permissions"] = string.Join(",", permissions);
        }
    }

    private static async Task WriteUnauthorizedResponse(HttpContext context, string message)
    {
        context.Response.StatusCode = 401;
        context.Response.ContentType = "application/json";
        
        var response = new { error = "Unauthorized", message };
        await context.Response.WriteAsJsonAsync(response);
    }
}
