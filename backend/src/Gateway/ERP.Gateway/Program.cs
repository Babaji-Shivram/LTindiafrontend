using ERP.Gateway.Extensions;
using ERP.Gateway.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Load reverse proxy configuration from separate file
builder.Configuration.AddJsonFile("Configuration/ReverseProxyConfig.json", optional: false, reloadOnChange: true);

// Add JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var jwtSettings = builder.Configuration.GetSection("JwtSettings");
        var secretKey = jwtSettings["SecretKey"] ?? throw new InvalidOperationException("JWT SecretKey is not configured");
        var issuer = jwtSettings["Issuer"] ?? throw new InvalidOperationException("JWT Issuer is not configured");
        var audience = jwtSettings["Audience"] ?? throw new InvalidOperationException("JWT Audience is not configured");
        
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
            ValidateIssuer = true,
            ValidIssuer = issuer,
            ValidateAudience = true,
            ValidAudience = audience,
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero
        };
    });

// Add services through extension method
builder.Services.AddGatewayServices(builder.Configuration);

// Add CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularDevClient",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

// Disable HTTPS redirection in development to avoid redirect issues with frontend
// app.UseHttpsRedirection();

// Security middleware in proper order
app.UseMiddleware<SecurityHeadersMiddleware>();
app.UseMiddleware<GlobalRateLimitingMiddleware>();

// Add CORS - must be before authentication
app.UseCors("AllowAngularDevClient");

// Add custom middleware
app.UseMiddleware<RequestLoggingMiddleware>();

// Authentication and Authorization
app.UseAuthentication();
// Temporarily disable JWT authentication middleware for development
// app.UseMiddleware<JwtAuthenticationMiddleware>();

// Add test endpoints for Gateway verification
app.MapGet("/", () => new { 
    message = "🚀 LT-India ERP Gateway is running!", 
    version = "1.0.0",
    timestamp = DateTime.UtcNow,
    environment = app.Environment.EnvironmentName
});

app.MapGet("/api/gateway/status", () => new {
    gateway = "healthy",
    services = new {
        identity = "checking...",
        masters = "checking...", 
        crm = "checking..."
    },
    security = new {
        authentication = "enabled",
        rateLimiting = "enabled",
        securityHeaders = "enabled"
    }
});

// Add health checks endpoint
app.MapHealthChecks("/health");

// Map reverse proxy
app.MapReverseProxy();

app.Run();
