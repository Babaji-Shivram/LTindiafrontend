using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using OpenTelemetry;
using OpenTelemetry.Trace;
using OpenTelemetry.Metrics;
using OpenTelemetry.Resources;
using Serilog;
using ERP.BuildingBlocks.Observability.Core;
using ERP.BuildingBlocks.Observability.Services;

namespace ERP.BuildingBlocks.Observability.Extensions;

/// <summary>
/// Simplified extension methods for OpenTelemetry observability
/// </summary>
public static class SimpleObservabilityExtensions
{
    /// <summary>
    /// Adds OpenTelemetry observability services
    /// </summary>
    public static IServiceCollection AddOpenTelemetryObservability(
        this IServiceCollection services, 
        IConfiguration configuration)
    {
        // Configure options
        services.Configure<TelemetryOptions>(configuration.GetSection(TelemetryOptions.SectionName));
        
        var telemetryOptions = configuration.GetSection(TelemetryOptions.SectionName).Get<TelemetryOptions>() 
            ?? new TelemetryOptions();

        // Add core services
        services.AddSingleton<ITelemetryService, SimpleTelemetryService>();
        services.AddSingleton<IMetricsCollector, SimpleMetricsCollector>();
        services.AddScoped<ICorrelatedLogger, SimpleCorrelatedLogger>();

        // Configure OpenTelemetry
        services.AddOpenTelemetry()
            .ConfigureResource(resource => resource
                .AddService(
                    serviceName: telemetryOptions.ServiceName,
                    serviceVersion: telemetryOptions.ServiceVersion)
                .AddAttributes(new[]
                {
                    new KeyValuePair<string, object>("environment", telemetryOptions.Environment)
                }));

        // Configure tracing
        if (telemetryOptions.TracingEnabled)
        {
            services.AddOpenTelemetry()
                .WithTracing(tracing =>
                {
                    tracing
                        .AddAspNetCoreInstrumentation()
                        .AddHttpClientInstrumentation()
                        .AddSqlClientInstrumentation()
                        .AddSource(telemetryOptions.ServiceName);

                    // Configure exporters
                    if (telemetryOptions.Exporters.ConsoleEnabled)
                        tracing.AddConsoleExporter();

                    if (telemetryOptions.Exporters.OtlpEnabled)
                    {
                        tracing.AddOtlpExporter(options =>
                        {
                            options.Endpoint = new Uri(telemetryOptions.Exporters.OtlpEndpoint);
                        });
                    }
                });
        }

        // Configure metrics
        if (telemetryOptions.MetricsEnabled)
        {
            services.AddOpenTelemetry()
                .WithMetrics(metrics =>
                {
                    metrics
                        .AddAspNetCoreInstrumentation()
                        .AddHttpClientInstrumentation()
                        .AddMeter(telemetryOptions.ServiceName);

                    // Configure exporters
                    if (telemetryOptions.Exporters.ConsoleEnabled)
                        metrics.AddConsoleExporter();

                    if (telemetryOptions.Exporters.OtlpEnabled)
                    {
                        metrics.AddOtlpExporter(options =>
                        {
                            options.Endpoint = new Uri(telemetryOptions.Exporters.OtlpEndpoint);
                        });
                    }
                });
        }

        // Configure health checks
        if (telemetryOptions.HealthChecks.Enabled)
        {
            var healthBuilder = services.AddHealthChecks();

            // Add database health check if connection string exists
            var connectionString = configuration.GetConnectionString("DefaultConnection");
            if (!string.IsNullOrEmpty(connectionString))
            {
                healthBuilder.AddSqlServer(
                    connectionString,
                    name: "database",
                    timeout: TimeSpan.FromSeconds(telemetryOptions.HealthChecks.TimeoutSeconds));
            }
        }

        // Configure Serilog
        if (telemetryOptions.LoggingEnabled)
        {
            Log.Logger = new LoggerConfiguration()
                .Enrich.FromLogContext()
                .Enrich.WithProperty("ServiceName", telemetryOptions.ServiceName)
                .Enrich.WithProperty("Environment", telemetryOptions.Environment)
                .WriteTo.Console()
                .WriteTo.File("logs/erp-.txt", rollingInterval: RollingInterval.Day)
                .CreateLogger();
        }

        return services;
    }
}

/// <summary>
/// Simple observability middleware for request tracking
/// </summary>
public class SimpleObservabilityMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ITelemetryService _telemetryService;
    private readonly IMetricsCollector _metricsCollector;

    public SimpleObservabilityMiddleware(
        RequestDelegate next,
        ITelemetryService telemetryService,
        IMetricsCollector metricsCollector)
    {
        _next = next;
        _telemetryService = telemetryService;
        _metricsCollector = metricsCollector;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        // Skip health check endpoints
        if (context.Request.Path.StartsWithSegments("/health"))
        {
            await _next(context);
            return;
        }

        var stopwatch = System.Diagnostics.Stopwatch.StartNew();
        var method = context.Request.Method;
        var path = context.Request.Path.Value ?? "/";

        using var activity = _telemetryService.StartActivity($"HTTP {method} {path}");
        
        activity?.SetTag("http.method", method);
        activity?.SetTag("http.url", context.Request.Path);

        var statusCode = 200;
        try
        {
            await _next(context);
            statusCode = context.Response.StatusCode;
        }
        catch
        {
            statusCode = 500;
            throw;
        }
        finally
        {
            stopwatch.Stop();
            
            // Record metrics
            _metricsCollector.RecordRequestDuration(path, stopwatch.Elapsed.TotalMilliseconds, statusCode.ToString());
            
            // Add response tags
            activity?.SetTag("http.status_code", statusCode);
        }
    }
}

/// <summary>
/// Extension method to use the observability middleware
/// </summary>
public static class SimpleObservabilityMiddlewareExtensions
{
    public static IApplicationBuilder UseSimpleObservability(this IApplicationBuilder app)
    {
        return app.UseMiddleware<SimpleObservabilityMiddleware>();
    }
}
