using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using ERP.Identity.Domain.Services;
using ERP.Identity.Infrastructure.Configuration;

namespace ERP.Identity.Infrastructure.BackgroundServices;

/// <summary>
/// Background service that periodically cleans up expired refresh tokens
/// Runs every hour by default, configurable via RefreshTokenSettings
/// </summary>
public class RefreshTokenCleanupService : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly ILogger<RefreshTokenCleanupService> _logger;
    private readonly RefreshTokenSettings _settings;
    private readonly TimeSpan _cleanupInterval;

    public RefreshTokenCleanupService(
        IServiceScopeFactory scopeFactory,
        ILogger<RefreshTokenCleanupService> logger,
        IOptions<RefreshTokenSettings> settings)
    {
        _scopeFactory = scopeFactory;
        _logger = logger;
        _settings = settings.Value;
        _cleanupInterval = TimeSpan.FromMinutes(_settings.CleanupIntervalMinutes);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("RefreshTokenCleanupService started. Cleanup interval: {Interval} minutes", 
            _settings.CleanupIntervalMinutes);

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                await CleanupExpiredTokensAsync();
                await Task.Delay(_cleanupInterval, stoppingToken);
            }
            catch (OperationCanceledException)
            {
                // Expected when cancellation is requested
                break;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred during refresh token cleanup");
                
                // Wait 5 minutes before retrying on error
                await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
            }
        }
    }

    private async Task CleanupExpiredTokensAsync()
    {
        using var scope = _scopeFactory.CreateScope();
        var refreshTokenService = scope.ServiceProvider.GetRequiredService<IRefreshTokenService>();

        try
        {
            var deletedCount = await refreshTokenService.CleanupExpiredTokensAsync();
            
            if (deletedCount > 0)
            {
                _logger.LogInformation("Cleaned up {Count} expired refresh tokens", deletedCount);
            }
            else
            {
                _logger.LogDebug("No expired refresh tokens found during cleanup");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to cleanup expired refresh tokens");
            throw;
        }
    }

    public override Task StopAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("RefreshTokenCleanupService is stopping");
        return base.StopAsync(stoppingToken);
    }
}
