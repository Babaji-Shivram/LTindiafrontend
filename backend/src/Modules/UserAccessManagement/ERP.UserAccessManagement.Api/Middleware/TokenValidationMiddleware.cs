using System.Text.Json;

namespace ERP.UserAccessManagement.Api.Middleware;

public class TokenValidationMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<TokenValidationMiddleware> _logger;
    private readonly HttpClient _httpClient;

    public TokenValidationMiddleware(RequestDelegate next, ILogger<TokenValidationMiddleware> logger, HttpClient httpClient)
    {
        _next = next;
        _logger = logger;
        _httpClient = httpClient;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Skip validation for certain paths
        if (ShouldSkipValidation(context.Request.Path))
        {
            await _next(context);
            return;
        }

        var token = ExtractTokenFromHeader(context.Request);
        if (string.IsNullOrEmpty(token))
        {
            await WriteUnauthorizedResponse(context, "Token not provided");
            return;
        }

        try
        {
            // Call Identity service to validate token
            var isValid = await ValidateTokenWithIdentityService(token);
            if (!isValid)
            {
                await WriteUnauthorizedResponse(context, "Invalid token");
                return;
            }

            // Token is valid, proceed to next middleware
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating token in middleware");
            await WriteUnauthorizedResponse(context, "Token validation failed");
        }
    }

    private bool ShouldSkipValidation(PathString path)
    {
        var skipPaths = new[]
        {
            "/api/v1/identity/auth/login",
            "/api/v1/identity/auth/validate-token",
            "/health",
            "/swagger"
        };

        return skipPaths.Any(skipPath => path.StartsWithSegments(skipPath));
    }

    private string? ExtractTokenFromHeader(HttpRequest request)
    {
        var authHeader = request.Headers.Authorization.FirstOrDefault();
        if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
        {
            return authHeader.Substring(7);
        }
        return null;
    }

    private async Task<bool> ValidateTokenWithIdentityService(string token)
    {
        try
        {
            var request = new { Token = token };
            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync("https://localhost:7101/api/v1/identity/auth/validate-token", content);
            
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<ValidationResult>(responseContent, new JsonSerializerOptions 
                { 
                    PropertyNameCaseInsensitive = true 
                });
                
                return result?.IsValid ?? false;
            }

            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calling Identity service for token validation");
            return false;
        }
    }

    private async Task WriteUnauthorizedResponse(HttpContext context, string message)
    {
        context.Response.StatusCode = 401;
        context.Response.ContentType = "application/json";

        var response = new { error = message, timestamp = DateTime.UtcNow };
        var json = JsonSerializer.Serialize(response);

        await context.Response.WriteAsync(json);
    }

    private class ValidationResult
    {
        public bool IsValid { get; set; }
    }
}
