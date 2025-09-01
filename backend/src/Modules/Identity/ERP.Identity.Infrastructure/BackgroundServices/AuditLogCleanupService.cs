using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ERP.Identity.Domain.Services;
using ERP.Identity.Infrastructure.Configuration;

namespace ERP.Identity.Infrastructure.BackgroundServices;

/// <summary>
/// Background service that periodically cleans up old audit logs
/// Runs daily by default, configurable via AuditSettings
/// </summary>
public class AuditLogCleanupService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<AuditLogCleanupService> _logger;
    private readonly AuditSettings _settings;
    private readonly TimeSpan _cleanupInterval;

    public AuditLogCleanupService(
        IServiceScopeFactory scopeFactory,
        ILogger<AuditLogCleanupService> logger,
        IOptions<AuditSettings> settings)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
        _settings = settings.Value;
        _cleanupInterval = TimeSpan.FromHours(_settings.CleanupIntervalHours);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("AuditLogCleanupService started. Cleanup interval: {Interval} hours, Retention: {Retention} days", 
            _settings.CleanupIntervalHours, _settings.RetentionDays);

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await CleanupOldAuditLogsAsync();
                await Task.Delay(_cleanupInterval, stoppingToken);
            }
            catch (OperationCanceledException)
            {
                // Expected when cancellation is requested
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred during audit log cleanup");
                
                // Wait 1 hour before retrying on error
                await Task.Delay(TimeSpan.FromHours(1), stoppingToken);
            }
        }
    }

    private async Task CleanupOldAuditLogsAsync()
    {
        using var scope = _scopeFactory.CreateScope();
        var auditService = scope.ServiceProvider.GetRequiredService<IAuditService>();

        try
        {
            var deletedCount = await auditService.CleanupOldLogsAsync(_settings.RetentionDays);
            
            if (deletedCount > 0)
            {
                _logger.LogInformation("Cleaned up {Count} old audit logs (retention: {Retention} days)", 
                    deletedCount, _settings.RetentionDays);
            }
            else
            {
                _logger.LogDebug("No old audit logs found during cleanup");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to cleanup old audit logs");
            throw;
        }
    }

    public override Task StopAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("AuditLogCleanupService is stopping");
        return base.StopAsync(stoppingToken);
    }
}
