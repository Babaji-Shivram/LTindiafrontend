namespace ERP.BuildingBlocks.Observability.Core;

/// <summary>
/// Configuration options for telemetry services
/// </summary>
public class TelemetryOptions
{
    public const string SectionName = "Telemetry";
    
    /// <summary>
    /// Name of the service for telemetry identification
    /// </summary>
    public string ServiceName { get; set; } = "ERP-Service";
    
    /// <summary>
    /// Version of the service
    /// </summary>
    public string ServiceVersion { get; set; } = "1.0.0";
    
    /// <summary>
    /// Environment name (Development, Staging, Production)
    /// </summary>
    public string Environment { get; set; } = "Development";
    
    /// <summary>
    /// Whether tracing is enabled
    /// </summary>
    public bool TracingEnabled { get; set; } = true;
    
    /// <summary>
    /// Whether metrics are enabled
    /// </summary>
    public bool MetricsEnabled { get; set; } = true;
    
    /// <summary>
    /// Whether logging is enabled
    /// </summary>
    public bool LoggingEnabled { get; set; } = true;
    
    /// <summary>
    /// Sampling ratio for traces (0.0 to 1.0)
    /// </summary>
    public double TraceSamplingRatio { get; set; } = 1.0;
    
    /// <summary>
    /// OpenTelemetry exporters configuration
    /// </summary>
    public ExporterOptions Exporters { get; set; } = new();
    
    /// <summary>
    /// Health checks configuration
    /// </summary>
    public HealthCheckOptions HealthChecks { get; set; } = new();
}

/// <summary>
/// Configuration for OpenTelemetry exporters
/// </summary>
public class ExporterOptions
{
    /// <summary>
    /// Whether console exporter is enabled
    /// </summary>
    public bool ConsoleEnabled { get; set; } = true;
    
    /// <summary>
    /// Whether OTLP exporter is enabled
    /// </summary>
    public bool OtlpEnabled { get; set; } = false;
    
    /// <summary>
    /// OTLP endpoint URL
    /// </summary>
    public string OtlpEndpoint { get; set; } = "http://localhost:4317";
    
    /// <summary>
    /// Whether Jaeger exporter is enabled
    /// </summary>
    public bool JaegerEnabled { get; set; } = false;
    
    /// <summary>
    /// Jaeger endpoint URL
    /// </summary>
    public string JaegerEndpoint { get; set; } = "http://localhost:14268/api/traces";
    
    /// <summary>
    /// Headers for OTLP exporter
    /// </summary>
    public Dictionary<string, string> OtlpHeaders { get; set; } = new();
}

/// <summary>
/// Configuration for health checks
/// </summary>
public class HealthCheckOptions
{
    /// <summary>
    /// Whether health checks are enabled
    /// </summary>
    public bool Enabled { get; set; } = true;
    
    /// <summary>
    /// Whether health check UI is enabled
    /// </summary>
    public bool UIEnabled { get; set; } = true;
    
    /// <summary>
    /// Health check endpoint path
    /// </summary>
    public string HealthCheckPath { get; set; } = "/health";
    
    /// <summary>
    /// Health check UI path
    /// </summary>
    public string UIPath { get; set; } = "/health-ui";
    
    /// <summary>
    /// Timeout for health checks in seconds
    /// </summary>
    public int TimeoutSeconds { get; set; } = 30;
    
    /// <summary>
    /// Health check polling interval in seconds
    /// </summary>
    public int EvaluationIntervalSeconds { get; set; } = 30;
}

/// <summary>
/// Constants for telemetry attributes and metric names
/// </summary>
public static class TelemetryConstants
{
    public static class ActivityNames
    {
        public const string HttpRequest = "http.request";
        public const string DatabaseOperation = "db.operation";
        public const string CacheOperation = "cache.operation";
        public const string BusinessOperation = "business.operation";
        public const string Authentication = "auth.operation";
    }
    
    public static class AttributeNames
    {
        public const string ServiceName = "service.name";
        public const string ServiceVersion = "service.version";
        public const string Environment = "environment";
        public const string UserId = "user.id";
        public const string TenantId = "tenant.id";
        public const string CorrelationId = "correlation.id";
        public const string OperationId = "operation.id";
        public const string Module = "module";
        public const string Operation = "operation";
        public const string Success = "success";
        public const string Duration = "duration";
        public const string HttpMethod = "http.method";
        public const string HttpStatusCode = "http.status_code";
        public const string HttpUrl = "http.url";
        public const string DatabaseTable = "db.table";
        public const string DatabaseOperation = "db.operation";
        public const string CacheKey = "cache.key";
        public const string CacheHit = "cache.hit";
        public const string ErrorType = "error.type";
        public const string ErrorMessage = "error.message";
    }
    
    public static class MetricNames
    {
        public const string RequestDuration = "http_request_duration";
        public const string RequestCount = "http_request_count";
        public const string DatabaseOperationDuration = "db_operation_duration";
        public const string DatabaseOperationCount = "db_operation_count";
        public const string CacheOperationDuration = "cache_operation_duration";
        public const string CacheOperationCount = "cache_operation_count";
        public const string CacheHitRate = "cache_hit_rate";
        public const string AuthenticationCount = "auth_count";
        public const string BusinessOperationDuration = "business_operation_duration";
        public const string BusinessOperationCount = "business_operation_count";
        public const string SystemResourceUsage = "system_resource_usage";
        public const string ActiveConnections = "active_connections";
        public const string QueueLength = "queue_length";
    }
    
    public static class LogEventNames
    {
        public const string ApplicationStarted = "ApplicationStarted";
        public const string ApplicationStopped = "ApplicationStopped";
        public const string RequestReceived = "RequestReceived";
        public const string RequestCompleted = "RequestCompleted";
        public const string DatabaseOperationExecuted = "DatabaseOperationExecuted";
        public const string CacheOperationExecuted = "CacheOperationExecuted";
        public const string AuthenticationAttempted = "AuthenticationAttempted";
        public const string BusinessOperationExecuted = "BusinessOperationExecuted";
        public const string ErrorOccurred = "ErrorOccurred";
        public const string HealthCheckExecuted = "HealthCheckExecuted";
    }
}
