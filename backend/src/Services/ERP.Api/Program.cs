using ERP.Api.CompositionRoot;
using ERP.Api.Middleware;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Net;
using ERP.BuildingBlocks.Observability.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Configure Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .Enrich.WithProperty("Application", "ERP.Api")
    .CreateLogger();

builder.Host.UseSerilog();

try
{
    Log.Information("Starting ERP.Api application");

    // Add OpenTelemetry Observability 📊
    builder.Services.AddOpenTelemetryObservability(builder.Configuration);

    // Add services to the container
    builder.Services.AddControllers();
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new() { Title = "ERP API", Version = "v1" });
        c.AddSecurityDefinition("Bearer", new()
        {
            Description = "JWT Authorization header using the Bearer scheme.",
            Name = "Authorization",
            In = Microsoft.OpenApi.Models.ParameterLocation.Header,
            Type = Microsoft.OpenApi.Models.SecuritySchemeType.ApiKey,
            Scheme = "Bearer"
        });
        c.AddSecurityRequirement(new()
        {
            {
                new()
                {
                    Reference = new() { Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme, Id = "Bearer" }
                },
                Array.Empty<string>()
            }
        });
    });

    // Add Problem Details
    builder.Services.AddProblemDetails();

    // Add API Versioning - Temporarily disabled
    // builder.Services.AddApiVersioning(opt =>
    // {
    //     opt.DefaultApiVersion = new(1, 0);
    //     opt.AssumeDefaultVersionWhenUnspecified = true;
    //     opt.ApiVersionReader = Microsoft.AspNetCore.Mvc.ApiVersioning.ApiVersionReader.Combine(
    //         new Microsoft.AspNetCore.Mvc.ApiVersioning.UrlSegmentApiVersionReader(),
    //         new Microsoft.AspNetCore.Mvc.ApiVersioning.QueryStringApiVersionReader("version"),
    //         new Microsoft.AspNetCore.Mvc.ApiVersioning.HeaderApiVersionReader("X-Version")
    //     );
    // }).AddApiExplorer(setup =>
    // {
    //     setup.GroupNameFormat = "'v'VVV";
    //     setup.SubstituteApiVersionInUrl = true;
    // });

    // Add Health Checks
    builder.Services.AddHealthChecks()
        .AddSqlServer(
            builder.Configuration.GetConnectionString("Default")!,
            name: "database",
            tags: new[] { "db", "ready" })
        .AddSqlServer(
            builder.Configuration.GetConnectionString("ReadOnly")!,
            name: "database-readonly",
            tags: new[] { "db", "ready" });

    // Add CORS
    builder.Services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
        {
            policy.WithOrigins(builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>() ?? Array.Empty<string>())
                  .AllowAnyMethod()
                  .AllowAnyHeader()
                  .AllowCredentials();
        });
    });

    // Register modules
    builder.Services.RegisterIdentityModule(builder.Configuration);
    builder.Services.RegisterMastersModule(builder.Configuration);
    builder.Services.RegisterUserAccessModule(builder.Configuration);
    builder.Services.RegisterCrmModule(builder.Configuration);

    // Register Database Context with performance optimizations
    builder.Services.AddDbContext<ERP.BuildingBlocks.Data.Context.ImportUatDbContext>(options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("Default"), sqlOptions =>
        {
            sqlOptions.CommandTimeout(30); // Set command timeout
            sqlOptions.EnableRetryOnFailure(maxRetryCount: 3, maxRetryDelay: TimeSpan.FromSeconds(5), errorNumbersToAdd: null);
        });
        
        // Performance optimizations
        if (builder.Environment.IsDevelopment())
        {
            options.EnableSensitiveDataLogging();
            options.EnableDetailedErrors();
        }
        
        options.EnableServiceProviderCaching();
    });

    // Add memory caching for performance
    builder.Services.AddMemoryCache();
    
    // Register user management services
    builder.Services.AddScoped<ERP.Api.Services.Interfaces.IUserService, ERP.Api.Services.UserService>();
    builder.Services.AddScoped<ERP.Api.Services.Interfaces.ILoginHistoryService, ERP.Api.Services.LoginHistoryService>();
    builder.Services.AddScoped<ERP.Api.Services.Interfaces.ISessionService, ERP.Api.Services.SessionService>();

    // Add GraphQL with basic optimizations
    builder.Services
        .AddGraphQLServer()
        .AddQueryType(d => d.Name("Query"))
        .AddTypeExtension<ERP.Api.GraphQL.Queries.UserQueries>()
        .ModifyRequestOptions(opt => 
        {
            opt.ExecutionTimeout = TimeSpan.FromSeconds(30); // Add timeout
            opt.IncludeExceptionDetails = builder.Environment.IsDevelopment();
        });

    var app = builder.Build();

    // Configure the HTTP request pipeline
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "ERP API v1");
        });
    }

    // Exception handling
    app.UseExceptionHandler(errorApp =>
    {
        errorApp.Run(async context =>
        {
            var exceptionHandlerPathFeature = context.Features.Get<IExceptionHandlerPathFeature>();
            var exception = exceptionHandlerPathFeature?.Error;

            Log.Error(exception, "Unhandled exception occurred");

            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/problem+json";

            var problemDetails = new Microsoft.AspNetCore.Mvc.ProblemDetails
            {
                Status = (int)HttpStatusCode.InternalServerError,
                Title = "An error occurred",
                Detail = app.Environment.IsDevelopment() ? exception?.ToString() : "An internal server error occurred"
            };

            await context.Response.WriteAsJsonAsync(problemDetails);
        });
    });

    app.UseHttpsRedirection();

    // Add OpenTelemetry observability middleware 📊
    app.UseSimpleObservability();

    // Add custom middleware
    app.UseMiddleware<CorrelationIdMiddleware>();
    app.UseMiddleware<RequestLoggingMiddleware>();

    app.UseCors();

    app.MapControllers();

    // Map GraphQL endpoint
    app.MapGraphQL("/graphql");

    // Health check endpoints
    app.MapHealthChecks("/health", new()
    {
        Predicate = _ => true,
        ResponseWriter = async (context, report) =>
        {
            context.Response.ContentType = "application/json";
            var response = new
            {
                status = report.Status.ToString(),
                checks = report.Entries.Select(x => new
                {
                    name = x.Key,
                    status = x.Value.Status.ToString(),
                    exception = x.Value.Exception?.Message,
                    duration = x.Value.Duration.ToString()
                }),
                totalDuration = report.TotalDuration.ToString()
            };
            await context.Response.WriteAsJsonAsync(response);
        }
    });

    app.MapHealthChecks("/ready", new()
    {
        Predicate = check => check.Tags.Contains("ready")
    });

    app.Run();
}
catch (Exception ex)
{
    Log.Fatal(ex, "Application terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
