using System.Diagnostics;
using System.Diagnostics.Metrics;

namespace ERP.BuildingBlocks.Observability.Core;

/// <summary>
/// Defines the contract for telemetry services in the ERP system
/// </summary>
public interface ITelemetryService
{
    /// <summary>
    /// Gets the activity source for creating spans
    /// </summary>
    ActivitySource ActivitySource { get; }
    
    /// <summary>
    /// Gets the meter for creating metrics
    /// </summary>
    Meter Meter { get; }
    
    /// <summary>
    /// Creates a new activity (span) for tracing
    /// </summary>
    Activity? StartActivity(string operationName, ActivityKind kind = ActivityKind.Internal);
    
    /// <summary>
    /// Records a custom metric counter
    /// </summary>
    void RecordCounter(string name, long value, params KeyValuePair<string, object?>[] tags);
    
    /// <summary>
    /// Records a custom metric histogram
    /// </summary>
    void RecordHistogram(string name, double value, params KeyValuePair<string, object?>[] tags);
    
    /// <summary>
    /// Records a custom metric gauge
    /// </summary>
    void RecordGauge(string name, double value, params KeyValuePair<string, object?>[] tags);
    
    /// <summary>
    /// Adds tags to the current activity
    /// </summary>
    void AddActivityTags(params KeyValuePair<string, object?>[] tags);
    
    /// <summary>
    /// Adds an event to the current activity
    /// </summary>
    void AddActivityEvent(string eventName, params KeyValuePair<string, object?>[] attributes);
}

/// <summary>
/// Defines the contract for structured logging with correlation
/// </summary>
public interface ICorrelatedLogger
{
    /// <summary>
    /// Logs information with correlation context
    /// </summary>
    void LogInformation(string message, params object[] args);
    
    /// <summary>
    /// Logs warning with correlation context
    /// </summary>
    void LogWarning(string message, params object[] args);
    
    /// <summary>
    /// Logs error with correlation context
    /// </summary>
    void LogError(Exception? exception, string message, params object[] args);
    
    /// <summary>
    /// Logs debug information with correlation context
    /// </summary>
    void LogDebug(string message, params object[] args);
    
    /// <summary>
    /// Creates a scoped logger with additional context
    /// </summary>
    IDisposable BeginScope<TState>(TState state) where TState : notnull;
}

/// <summary>
/// Defines the contract for metrics collection
/// </summary>
public interface IMetricsCollector
{
    /// <summary>
    /// Records request duration
    /// </summary>
    void RecordRequestDuration(string endpoint, double durationMs, string statusCode);
    
    /// <summary>
    /// Records database operation duration
    /// </summary>
    void RecordDatabaseOperation(string operation, string table, double durationMs, bool success);
    
    /// <summary>
    /// Records cache operation
    /// </summary>
    void RecordCacheOperation(string operation, string key, bool hit, double durationMs);
    
    /// <summary>
    /// Records authentication event
    /// </summary>
    void RecordAuthenticationEvent(string eventType, bool success, string? userId = null);
    
    /// <summary>
    /// Records business operation
    /// </summary>
    void RecordBusinessOperation(string operation, string module, bool success, double durationMs);
    
    /// <summary>
    /// Records system resource usage
    /// </summary>
    void RecordResourceUsage(string resource, double value, string unit);
}
