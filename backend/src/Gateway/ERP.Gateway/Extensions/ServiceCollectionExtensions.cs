using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using HealthChecks.Uris;
using ERP.Gateway.Configuration;

namespace ERP.Gateway.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddGatewayServices(this IServiceCollection services, IConfiguration configuration)
    {
        // Configure settings
        services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));
        services.Configure<RateLimitSettings>(configuration.GetSection(RateLimitSettings.SectionName));
        
        // Add YARP reverse proxy
        services.AddReverseProxy()
            .LoadFromConfig(configuration.GetSection("ReverseProxy"));

        // Add health checks for downstream services (optional in development)
        var healthChecksBuilder = services.AddHealthChecks()
            .AddCheck("gateway-self", () => Microsoft.Extensions.Diagnostics.HealthChecks.HealthCheckResult.Healthy("Gateway is healthy"));

        // Only add downstream health checks in non-development environments
        // In development, services might not be running
        var isDevelopment = configuration.GetValue<bool>("HealthChecks:SkipDownstreamInDevelopment", true);
        if (!isDevelopment)
        {
            healthChecksBuilder
                .AddUrlGroup(new Uri("https://localhost:7101/health"), "identity-api", timeout: TimeSpan.FromSeconds(10))
                .AddUrlGroup(new Uri("https://localhost:7102/health"), "masters-api", timeout: TimeSpan.FromSeconds(10))
                .AddUrlGroup(new Uri("https://localhost:7103/health"), "crm-api", timeout: TimeSpan.FromSeconds(10));
        }

        // Configure HTTPS redirection
        services.AddHttpsRedirection(options =>
        {
            options.HttpsPort = 5201;
        });

        // Add CORS support
        services.AddCors(options =>
        {
            options.AddDefaultPolicy(builder =>
            {
                builder.WithOrigins("http://localhost:4200", "https://localhost:4200") // Angular app
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials();
            });
        });

        return services;
    }
}
