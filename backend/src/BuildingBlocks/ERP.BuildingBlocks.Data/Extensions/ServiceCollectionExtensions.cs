using ERP.BuildingBlocks.Data.Context;
using ERP.BuildingBlocks.Data.Interfaces;
using ERP.BuildingBlocks.Data.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ERP.BuildingBlocks.Data.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddBuildingBlocksData(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        // Add DbContext
        services.AddDbContext<ImportUatDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

        // Add data services
        services.AddScoped<IUserDataService, UserDataService>();
        services.AddScoped<IRoleDataService, RoleDataService>();

        return services;
    }
}
