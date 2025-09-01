﻿using Microsoft.AspNetCore.Http;
using System.Diagnostics;

namespace ERP.Gateway.Middleware;

public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var stopwatch = Stopwatch.StartNew();
        var requestId = Guid.NewGuid().ToString();
        
        // Add request ID to response headers (using indexer to avoid duplicate key issues)
        context.Response.Headers["X-Request-ID"] = requestId;
        
        _logger.LogInformation("Gateway Request: {RequestId} {Method} {Path} started", 
            requestId, context.Request.Method, context.Request.Path);

        try
        {
            await _next(context);
        }
        finally
        {
            stopwatch.Stop();
            _logger.LogInformation("Gateway Request: {RequestId} {Method} {Path} completed in {ElapsedMs}ms with status {StatusCode}", 
                requestId, context.Request.Method, context.Request.Path, stopwatch.ElapsedMilliseconds, context.Response.StatusCode);
        }
    }
}
