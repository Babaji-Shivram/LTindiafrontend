using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Collections.Concurrent;
using System.Net;

namespace ERP.Gateway.Middleware;

/// <summary>
/// Gateway-level rate limiting middleware
/// Provides basic rate limiting for all API requests
/// </summary>
public class GlobalRateLimitingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<GlobalRateLimitingMiddleware> _logger;
    private readonly IConfiguration _configuration;
    
    // Simple in-memory storage for rate limiting (replace with Redis in production)
    private static readonly ConcurrentDictionary<string, ClientRequestInfo> _requestCounts = new();
    private static readonly object _cleanupLock = new();
    private static DateTime _lastCleanup = DateTime.UtcNow;

    public GlobalRateLimitingMiddleware(
        RequestDelegate next,
        ILogger<GlobalRateLimitingMiddleware> logger,
        IConfiguration configuration)
    {
        _next = next;
        _logger = logger;
        _configuration = configuration;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Skip rate limiting for health checks and other system endpoints
        if (ShouldSkipRateLimit(context.Request.Path))
        {
            await _next(context);
            return;
        }

        var clientKey = GetClientKey(context);
        var rateLimitConfig = GetRateLimitConfig(context.Request.Path);

        if (!await IsRequestAllowedAsync(clientKey, rateLimitConfig))
        {
            await WriteRateLimitExceededResponse(context, rateLimitConfig);
            return;
        }

        // Process request and increment counter
        await _next(context);
        await IncrementRequestCountAsync(clientKey);
    }

    private string GetClientKey(HttpContext context)
    {
        // Try to get user ID from JWT token first
        var userId = context.User?.FindFirst("sub")?.Value;
        if (!string.IsNullOrEmpty(userId))
        {
            return $"user:{userId}";
        }

        // Fall back to IP address
        var ipAddress = context.Connection.RemoteIpAddress?.ToString();
        return $"ip:{ipAddress ?? "unknown"}";
    }

    private RateLimitConfig GetRateLimitConfig(PathString path)
    {
        // Different rate limits for different endpoints
        if (path.StartsWithSegments("/api/v1/identity/auth"))
        {
            return new RateLimitConfig
            {
                MaxRequests = int.Parse(_configuration["Gateway:RateLimit:Auth:MaxRequests"] ?? "10"),
                WindowMinutes = int.Parse(_configuration["Gateway:RateLimit:Auth:WindowMinutes"] ?? "1")
            };
        }
        
        // Default rate limit for all other API endpoints
        return new RateLimitConfig
        {
            MaxRequests = int.Parse(_configuration["Gateway:RateLimit:Default:MaxRequests"] ?? "100"),
            WindowMinutes = int.Parse(_configuration["Gateway:RateLimit:Default:WindowMinutes"] ?? "1")
        };
    }

    private async Task<bool> IsRequestAllowedAsync(string clientKey, RateLimitConfig config)
    {
        await Task.Delay(0); // Make it async-compatible
        
        var now = DateTime.UtcNow;
        var windowStart = now.AddMinutes(-config.WindowMinutes);

        // Clean up old entries periodically
        CleanupOldEntries();

        var clientInfo = _requestCounts.GetOrAdd(clientKey, _ => new ClientRequestInfo());
        
        lock (clientInfo)
        {
            // Remove requests outside the current window
            clientInfo.RequestTimes.RemoveAll(time => time < windowStart);
            
            // Check if limit exceeded
            if (clientInfo.RequestTimes.Count >= config.MaxRequests)
            {
                _logger.LogWarning("Rate limit exceeded for client {ClientKey}: {Count}/{Max} requests in {Window} minutes",
                    clientKey, clientInfo.RequestTimes.Count, config.MaxRequests, config.WindowMinutes);
                return false;
            }

            return true;
        }
    }

    private async Task IncrementRequestCountAsync(string clientKey)
    {
        await Task.Delay(0); // Make it async-compatible
        
        if (_requestCounts.TryGetValue(clientKey, out var clientInfo))
        {
            lock (clientInfo)
            {
                clientInfo.RequestTimes.Add(DateTime.UtcNow);
            }
        }
    }

    private static bool ShouldSkipRateLimit(PathString path)
    {
        var skipPaths = new[]
        {
            "/health",
            "/ready",
            "/swagger",
            "/favicon.ico"
        };

        return skipPaths.Any(skipPath => 
            path.StartsWithSegments(skipPath, StringComparison.OrdinalIgnoreCase));
    }

    private static void CleanupOldEntries()
    {
        if (!Monitor.TryEnter(_cleanupLock))
            return;

        try
        {
            // Only cleanup every 5 minutes
            if (DateTime.UtcNow.Subtract(_lastCleanup).TotalMinutes < 5)
                return;

            var cutoff = DateTime.UtcNow.AddHours(-1);
            var keysToRemove = new List<string>();

            foreach (var kvp in _requestCounts)
            {
                lock (kvp.Value)
                {
                    kvp.Value.RequestTimes.RemoveAll(time => time < cutoff);
                    
                    if (!kvp.Value.RequestTimes.Any())
                    {
                        keysToRemove.Add(kvp.Key);
                    }
                }
            }

            foreach (var key in keysToRemove)
            {
                _requestCounts.TryRemove(key, out _);
            }

            _lastCleanup = DateTime.UtcNow;
        }
        finally
        {
            Monitor.Exit(_cleanupLock);
        }
    }

    private async Task WriteRateLimitExceededResponse(HttpContext context, RateLimitConfig config)
    {
        context.Response.StatusCode = (int)HttpStatusCode.TooManyRequests;
        context.Response.ContentType = "application/json";
        
        // Add rate limit headers
        context.Response.Headers["X-RateLimit-Limit"] = config.MaxRequests.ToString();
        context.Response.Headers["X-RateLimit-Window"] = $"{config.WindowMinutes}m";
        context.Response.Headers["Retry-After"] = "60"; // seconds
        
        var response = new
        {
            error = "Rate limit exceeded",
            message = $"Too many requests. Maximum {config.MaxRequests} requests per {config.WindowMinutes} minute(s).",
            retryAfter = "60 seconds"
        };
        
        await context.Response.WriteAsJsonAsync(response);
    }

    private class ClientRequestInfo
    {
        public List<DateTime> RequestTimes { get; } = new();
    }

    private class RateLimitConfig
    {
        public int MaxRequests { get; set; }
        public int WindowMinutes { get; set; }
    }
}
