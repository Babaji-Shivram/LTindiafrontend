using ERP.UserAccessManagement.Api.Middleware;
using ERP.UserAccessManagement.Domain.Services;
using ERP.UserAccessManagement.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add HTTP client for calling Identity service
builder.Services.AddHttpClient<ITokenValidationService, TokenValidationService>();

// Register services
builder.Services.AddScoped<ITokenValidationService, TokenValidationService>();

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

app.UseHttpsRedirection();

// Add token validation middleware
app.UseMiddleware<TokenValidationMiddleware>();

app.UseAuthorization();
app.MapControllers();

// Health check endpoint
app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }));

app.Run();
