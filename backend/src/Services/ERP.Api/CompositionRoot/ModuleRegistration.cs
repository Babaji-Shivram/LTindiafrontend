using ERP.Identity.Domain.Services;
using ERP.Identity.Infrastructure.Services;
using ERP.Identity.Application.Services;
using ERP.Identity.Infrastructure.Data;
using ERP.UserAccessManagement.Domain.Services;
using ERP.BuildingBlocks.Data.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace ERP.Api.CompositionRoot;

public static class ModuleRegistration
{
    public static IServiceCollection RegisterIdentityModule(this IServiceCollection services, IConfiguration configuration)
    {
        // Add BuildingBlocks Data services (includes SqlDependency caching)
        services.AddBuildingBlocksData(configuration);
        
        // Add SqlDependency caching service
        services.AddSqlDependencyCache(
            sizeLimit: 2000, // Max 2000 cache entries for Identity module
            compactionPercentage: 0.20, // Remove 20% when limit reached
            expirationScanFrequency: TimeSpan.FromMinutes(10) // Scan every 10 minutes
        );

        // Register Entity Framework DbContext
        services.AddDbContext<IdentityDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("Default")));

        // JWT Authentication is now handled at Gateway level
        // Gateway will validate JWT and pass user context via headers
        // services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        //     .AddJwtBearer(options =>
        //     {
        //         options.TokenValidationParameters = new TokenValidationParameters
        //         {
        //             ValidateIssuer = true,
        //             ValidateAudience = true,
        //             ValidateLifetime = true,
        //             ValidateIssuerSigningKey = true,
        //             ValidIssuer = configuration["JwtSettings:Issuer"],
        //             ValidAudience = configuration["JwtSettings:Audience"],
        //             IssuerSigningKey = new SymmetricSecurityKey(
        //                 Encoding.UTF8.GetBytes(configuration["JwtSettings:SecretKey"]!))
        //         };
        //     });

        // Register Identity services with caching
        services.AddScoped<IAuthenticationService, CachedAuthenticationService>();
        services.AddScoped<IJwtService, JwtService>();
        
        // 🔥 CRITICAL: Register missing JWT authentication services
        services.AddScoped<IRefreshTokenService, RefreshTokenService>();
        services.AddScoped<IAuditService, AuditService>();
        services.AddScoped<IRateLimitingService, RateLimitingService>();

        // TODO: Add background services later when Microsoft.Extensions.Hosting is available
        // services.AddHostedService<RefreshTokenCleanupService>();
        // services.AddHostedService<AuditLogCleanupService>();

        return services;
    }

    public static IServiceCollection RegisterMastersModule(this IServiceCollection services, IConfiguration configuration)
    {
        // Add Masters module services here when available
        return services;
    }

    public static IServiceCollection RegisterUserAccessModule(this IServiceCollection services, IConfiguration configuration)
    {
        // Add UserAccess Management services - temporarily commented out due to dependency issues
        // services.AddHttpClient<ITokenValidationService, TokenValidationService>();
        // services.AddScoped<ITokenValidationService, TokenValidationService>();

        return services;
    }

    public static IServiceCollection RegisterCrmModule(this IServiceCollection services, IConfiguration configuration)
    {
        // Add CRM module services here when available
        return services;
    }
}
