using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;
using ERP.Identity.Domain.Services;

namespace ERP.Identity.Api.Middleware;

public class RateLimitingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RateLimitingMiddleware> _logger;
    private readonly IRateLimitingService _rateLimitingService;

    public RateLimitingMiddleware(
        RequestDelegate next,
        ILogger<RateLimitingMiddleware> logger,
        IRateLimitingService rateLimitingService)
    {
        _next = next;
        _logger = logger;
        _rateLimitingService = rateLimitingService;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var rateLimitType = GetRateLimitType(context.Request.Path);
        
        if (rateLimitType.HasValue)
        {
            var clientKey = GetClientKey(context);
            
            var isAllowed = await _rateLimitingService.IsRequestAllowedAsync(
                clientKey, 
                rateLimitType.Value, 
                context.Request.Path);

            if (!isAllowed)
            {
                await HandleRateLimitExceeded(context, clientKey, rateLimitType.Value);
                return;
            }

            // Increment request count after processing
            await _next(context);
            await _rateLimitingService.IncrementRequestCountAsync(clientKey, rateLimitType.Value);
        }
        else
        {
            await _next(context);
        }
    }

    private static RateLimitType? GetRateLimitType(PathString path)
    {
        var pathValue = path.Value?.ToLowerInvariant();
        
        return pathValue switch
        {
            var p when p?.Contains("/auth/login") == true => RateLimitType.Login,
            var p when p?.Contains("/auth/refresh-token") == true => RateLimitType.TokenRefresh,
            var p when p?.Contains("/auth/reset-password") == true => RateLimitType.PasswordReset,
            var p when p?.Contains("/auth/register") == true => RateLimitType.Registration,
            var p when p?.Contains("/api/") == true => RateLimitType.ApiCall,
            _ => null as RateLimitType?
        };
    }

    private static string GetClientKey(HttpContext context)
    {
        // Try to get user ID from JWT token first
        var userIdClaim = context.User?.FindFirst("sub") ?? context.User?.FindFirst("nameid");
        if (userIdClaim != null)
        {
            return $"user:{userIdClaim.Value}";
        }

        // Fall back to IP address for unauthenticated requests
        var ipAddress = GetClientIpAddress(context);
        return $"ip:{ipAddress}";
    }

    private static string GetClientIpAddress(HttpContext context)
    {
        // Check for forwarded IP addresses (behind load balancer/proxy)
        var forwardedFor = context.Request.Headers["X-Forwarded-For"].FirstOrDefault();
        if (!string.IsNullOrEmpty(forwardedFor))
        {
            return forwardedFor.Split(',')[0].Trim();
        }

        var realIp = context.Request.Headers["X-Real-IP"].FirstOrDefault();
        if (!string.IsNullOrEmpty(realIp))
        {
            return realIp;
        }

        // Fall back to connection remote IP
        return context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
    }

    private async Task HandleRateLimitExceeded(HttpContext context, string clientKey, RateLimitType rateLimitType)
    {
        var status = await _rateLimitingService.GetRateLimitStatusAsync(clientKey, rateLimitType);
        
        _logger.LogWarning("Rate limit exceeded for client {ClientKey}, type {RateLimitType}, path {Path}", 
            clientKey, rateLimitType, context.Request.Path);

        context.Response.StatusCode = (int)HttpStatusCode.TooManyRequests;
        context.Response.ContentType = "application/json";

        // Add rate limit headers only if status is available
        if (status != null)
        {
            context.Response.Headers["X-RateLimit-Limit"] = status.MaxCount.ToString();
            context.Response.Headers["X-RateLimit-Remaining"] = Math.Max(0, status.MaxCount - status.CurrentCount).ToString();
            
            if (status.NextResetTime.HasValue)
            {
                context.Response.Headers["X-RateLimit-Reset"] = ((DateTimeOffset)status.NextResetTime.Value).ToUnixTimeSeconds().ToString();
            }

            if (status.IsBlocked && status.BlockedUntil.HasValue)
            {
                context.Response.Headers["X-RateLimit-Blocked-Until"] = ((DateTimeOffset)status.BlockedUntil.Value).ToUnixTimeSeconds().ToString();
            }
        }

        var response = new
        {
            error = "Rate limit exceeded",
            message = $"Too many {rateLimitType} requests. Try again later.",
            details = status != null ? new
            {
                limit = status.MaxCount,
                remaining = Math.Max(0, status.MaxCount - status.CurrentCount),
                resetTime = status.NextResetTime,
                isBlocked = status.IsBlocked,
                blockedUntil = status.BlockedUntil,
                windowSize = status.WindowSize.TotalSeconds
            } : new
            {
                limit = 0,
                remaining = 0,
                resetTime = (DateTime?)null,
                isBlocked = false,
                blockedUntil = (DateTime?)null,
                windowSize = 0.0
            }
        };

        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }
}
