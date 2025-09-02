using ERP.Identity.Domain.Services;
using ERP.Identity.Infrastructure.Services;
using ERP.Identity.Application.Services;
using ERP.BuildingBlocks.Data.Extensions;
using ERP.Identity.Api.Extensions;
using ERP.Identity.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", policy =>
    {
        policy.WithOrigins("http://localhost:4201", "http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Add Entity Framework with SQL Server
builder.Services.AddDbContext<IdentityDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register mock services for testing (replace with real services when DB connection works)
// builder.Services.AddScoped<IJwtService, JwtService>();
// builder.Services.AddScoped<IRefreshTokenService, RefreshTokenService>();
// builder.Services.AddScoped<IAuditService, AuditService>();
// builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();

// Register User Management Services
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<ILoginHistoryService, LoginHistoryService>();
builder.Services.AddScoped<ISessionService, SessionService>();

// Add JWT Authentication configuration
builder.Services.AddIdentityApiServices(builder.Configuration);

// Add logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Use CORS
app.UseCors("AllowAngularApp");

// Disable HTTPS redirection for development
// app.UseHttpsRedirection();
app.UseRouting();

// Add Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// Health check endpoint
app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }));

app.Run();
