using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace ERP.Gateway.Middleware;

/// <summary>
/// Middleware to add security headers to all HTTP responses
/// Implements OWASP recommendations for web application security
/// </summary>
public class SecurityHeadersMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<SecurityHeadersMiddleware> _logger;

    public SecurityHeadersMiddleware(RequestDelegate next, ILogger<SecurityHeadersMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Add security headers before processing the request
        AddSecurityHeaders(context);

        await _next(context);
    }

    private void AddSecurityHeaders(HttpContext context)
    {
        var headers = context.Response.Headers;

        // Remove server information disclosure
        headers.Remove("Server");
        headers.Remove("X-Powered-By");

        // Prevent MIME-type sniffing - Use indexer to avoid duplicate key exception
        headers["X-Content-Type-Options"] = "nosniff";

        // Enable XSS protection
        headers["X-XSS-Protection"] = "1; mode=block";

        // Prevent page from being embedded in frames (Clickjacking protection)
        headers["X-Frame-Options"] = "DENY";

        // Referrer policy
        headers["Referrer-Policy"] = "strict-origin-when-cross-origin";

        // Content Security Policy (adjust as needed for your application)
        headers["Content-Security-Policy"] = 
            "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline'; " +
            "style-src 'self' 'unsafe-inline'; " +
            "img-src 'self' data: https:; " +
            "font-src 'self'; " +
            "connect-src 'self'; " +
            "frame-ancestors 'none'";

        // Permissions Policy (previously Feature Policy)
        headers["Permissions-Policy"] = 
            "geolocation=(), " +
            "microphone=(), " +
            "camera=(), " +
            "payment=(), " +
            "usb=(), " +
            "magnetometer=(), " +
            "accelerometer=(), " +
            "gyroscope=()";

        // HTTP Strict Transport Security (HSTS) - only add if using HTTPS
        if (context.Request.IsHttps)
        {
            headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains; preload";
        }

        // Cross-Origin Embedder Policy
        headers["Cross-Origin-Embedder-Policy"] = "require-corp";

        // Cross-Origin Opener Policy
        headers["Cross-Origin-Opener-Policy"] = "same-origin";

        // Cross-Origin Resource Policy
        headers["Cross-Origin-Resource-Policy"] = "same-origin";

        _logger.LogDebug("Security headers added to response for {Path}", context.Request.Path);
    }
}
