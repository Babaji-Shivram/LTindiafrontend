using System.Diagnostics;
using System.Diagnostics.Metrics;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;
using ERP.BuildingBlocks.Observability.Core;

namespace ERP.BuildingBlocks.Observability.Services;

/// <summary>
/// Simplified telemetry service implementation
/// </summary>
public class SimpleTelemetryService : ITelemetryService, IDisposable
{
    private readonly TelemetryOptions _options;
    private readonly ActivitySource _activitySource;
    private readonly Meter _meter;
    private bool _disposed;

    public SimpleTelemetryService(IOptions<TelemetryOptions> options)
    {
        _options = options.Value;
        _activitySource = new ActivitySource(_options.ServiceName, _options.ServiceVersion);
        _meter = new Meter(_options.ServiceName, _options.ServiceVersion);
    }

    public ActivitySource ActivitySource => _activitySource;
    public Meter Meter => _meter;

    public Activity? StartActivity(string operationName, ActivityKind kind = ActivityKind.Internal)
    {
        if (!_options.TracingEnabled) return null;

        var activity = _activitySource.StartActivity(operationName, kind);
        if (activity != null)
        {
            activity.SetTag("service.name", _options.ServiceName);
            activity.SetTag("service.version", _options.ServiceVersion);
            activity.SetTag("environment", _options.Environment);
        }
        return activity;
    }

    public void RecordCounter(string name, long value, params KeyValuePair<string, object?>[] tags)
    {
        if (!_options.MetricsEnabled) return;
        var counter = _meter.CreateCounter<long>(name);
        counter.Add(value, tags);
    }

    public void RecordHistogram(string name, double value, params KeyValuePair<string, object?>[] tags)
    {
        if (!_options.MetricsEnabled) return;
        var histogram = _meter.CreateHistogram<double>(name);
        histogram.Record(value, tags);
    }

    public void RecordGauge(string name, double value, params KeyValuePair<string, object?>[] tags)
    {
        if (!_options.MetricsEnabled) return;
        var gauge = _meter.CreateUpDownCounter<long>(name);
        gauge.Add((long)value, tags);
    }

    public void AddActivityTags(params KeyValuePair<string, object?>[] tags)
    {
        var activity = Activity.Current;
        if (activity != null)
        {
            foreach (var tag in tags)
            {
                activity.SetTag(tag.Key, tag.Value);
            }
        }
    }

    public void AddActivityEvent(string eventName, params KeyValuePair<string, object?>[] attributes)
    {
        var activity = Activity.Current;
        if (activity != null)
        {
            var activityTags = new ActivityTagsCollection(attributes);
            activity.AddEvent(new ActivityEvent(eventName, DateTimeOffset.UtcNow, activityTags));
        }
    }

    public void Dispose()
    {
        if (_disposed) return;
        _activitySource?.Dispose();
        _meter?.Dispose();
        _disposed = true;
    }
}

/// <summary>
/// Simplified metrics collector
/// </summary>
public class SimpleMetricsCollector : IMetricsCollector, IDisposable
{
    private readonly TelemetryOptions _options;
    private readonly Meter _meter;
    private bool _disposed;

    public SimpleMetricsCollector(IOptions<TelemetryOptions> options)
    {
        _options = options.Value;
        _meter = new Meter($"{_options.ServiceName}.Metrics", _options.ServiceVersion);
    }

    public void RecordRequestDuration(string endpoint, double durationMs, string statusCode)
    {
        if (!_options.MetricsEnabled) return;
        
        var histogram = _meter.CreateHistogram<double>("http_request_duration", "ms");
        histogram.Record(durationMs, 
            new KeyValuePair<string, object?>("endpoint", endpoint),
            new KeyValuePair<string, object?>("status_code", statusCode));
    }

    public void RecordDatabaseOperation(string operation, string table, double durationMs, bool success)
    {
        if (!_options.MetricsEnabled) return;
        
        var histogram = _meter.CreateHistogram<double>("db_operation_duration", "ms");
        histogram.Record(durationMs,
            new KeyValuePair<string, object?>("operation", operation),
            new KeyValuePair<string, object?>("table", table),
            new KeyValuePair<string, object?>("success", success));
    }

    public void RecordCacheOperation(string operation, string key, bool hit, double durationMs)
    {
        if (!_options.MetricsEnabled) return;
        
        var histogram = _meter.CreateHistogram<double>("cache_operation_duration", "ms");
        histogram.Record(durationMs,
            new KeyValuePair<string, object?>("operation", operation),
            new KeyValuePair<string, object?>("hit", hit));
    }

    public void RecordAuthenticationEvent(string eventType, bool success, string? userId = null)
    {
        if (!_options.MetricsEnabled) return;
        
        var counter = _meter.CreateCounter<long>("auth_events_total");
        counter.Add(1,
            new KeyValuePair<string, object?>("event_type", eventType),
            new KeyValuePair<string, object?>("success", success));
    }

    public void RecordBusinessOperation(string operation, string module, bool success, double durationMs)
    {
        if (!_options.MetricsEnabled) return;
        
        var histogram = _meter.CreateHistogram<double>("business_operation_duration", "ms");
        histogram.Record(durationMs,
            new KeyValuePair<string, object?>("operation", operation),
            new KeyValuePair<string, object?>("module", module),
            new KeyValuePair<string, object?>("success", success));
    }

    public void RecordResourceUsage(string resource, double value, string unit)
    {
        if (!_options.MetricsEnabled) return;
        
        var gauge = _meter.CreateUpDownCounter<long>("resource_usage");
        gauge.Add((long)value,
            new KeyValuePair<string, object?>("resource", resource),
            new KeyValuePair<string, object?>("unit", unit));
    }

    public void Dispose()
    {
        if (_disposed) return;
        _meter?.Dispose();
        _disposed = true;
    }
}

/// <summary>
/// Simplified correlated logger
/// </summary>
public class SimpleCorrelatedLogger : ICorrelatedLogger
{
    private readonly Microsoft.Extensions.Logging.ILogger<SimpleCorrelatedLogger> _logger;
    private readonly TelemetryOptions _options;

    public SimpleCorrelatedLogger(
        Microsoft.Extensions.Logging.ILogger<SimpleCorrelatedLogger> logger, 
        IOptions<TelemetryOptions> options)
    {
        _logger = logger;
        _options = options.Value;
    }

    public void LogInformation(string message, params object[] args)
    {
        if (!_options.LoggingEnabled) return;
        AddTraceContext();
        _logger.LogInformation(message, args);
    }

    public void LogWarning(string message, params object[] args)
    {
        if (!_options.LoggingEnabled) return;
        AddTraceContext();
        _logger.LogWarning(message, args);
    }

    public void LogError(Exception? exception, string message, params object[] args)
    {
        if (!_options.LoggingEnabled) return;
        AddTraceContext();
        _logger.LogError(exception, message, args);
    }

    public void LogDebug(string message, params object[] args)
    {
        if (!_options.LoggingEnabled) return;
        AddTraceContext();
        _logger.LogDebug(message, args);
    }

    public IDisposable BeginScope<TState>(TState state) where TState : notnull
    {
        return _logger.BeginScope(state) ?? throw new InvalidOperationException("Failed to create logging scope");
    }

    private void AddTraceContext()
    {
        var activity = Activity.Current;
        if (activity != null)
        {
            // Trace context is automatically added by the logging framework
            // when OpenTelemetry is properly configured
        }
    }
}
