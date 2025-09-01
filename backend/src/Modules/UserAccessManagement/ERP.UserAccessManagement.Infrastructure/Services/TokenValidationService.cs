using System.Text.Json;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using ERP.UserAccessManagement.Domain.Services;

namespace ERP.UserAccessManagement.Infrastructure.Services;

public class TokenValidationService : ITokenValidationService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<TokenValidationService> _logger;
    private readonly string _identityServiceUrl;

    public TokenValidationService(HttpClient httpClient, ILogger<TokenValidationService> logger, IConfiguration configuration)
    {
        _httpClient = httpClient;
        _logger = logger;
        _identityServiceUrl = configuration["IdentityService:BaseUrl"] ?? "https://localhost:7101";
    }

    public async Task<bool> ValidateTokenAsync(string token)
    {
        try
        {
            var request = new { Token = token };
            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_identityServiceUrl}/api/v1/identity/auth/validate-token", content);
            
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<ValidateTokenResponse>(responseContent, new JsonSerializerOptions 
                { 
                    PropertyNameCaseInsensitive = true 
                });
                
                return result?.IsValid ?? false;
            }

            return false;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating token");
            return false;
        }
    }

    public async Task<Guid?> GetUserIdFromTokenAsync(string token)
    {
        try
        {
            var request = new { Token = token };
            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_identityServiceUrl}/api/v1/identity/auth/validate-token", content);
            
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<ValidateTokenResponse>(responseContent, new JsonSerializerOptions 
                { 
                    PropertyNameCaseInsensitive = true 
                });
                
                return result?.UserId;
            }

            return null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user ID from token");
            return null;
        }
    }

    public async Task<IEnumerable<string>> GetUserRolesAsync(string token)
    {
        try
        {
            var request = new { Token = token };
            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_identityServiceUrl}/api/v1/identity/auth/validate-token", content);
            
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<ValidateTokenResponse>(responseContent, new JsonSerializerOptions 
                { 
                    PropertyNameCaseInsensitive = true 
                });
                
                return result?.Roles ?? new List<string>();
            }

            return new List<string>();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user roles from token");
            return new List<string>();
        }
    }

    public async Task<IEnumerable<string>> GetUserPermissionsAsync(string token)
    {
        try
        {
            var request = new { Token = token };
            var json = JsonSerializer.Serialize(request);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_identityServiceUrl}/api/v1/identity/auth/validate-token", content);
            
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                var result = JsonSerializer.Deserialize<ValidateTokenResponse>(responseContent, new JsonSerializerOptions 
                { 
                    PropertyNameCaseInsensitive = true 
                });
                
                return result?.Permissions ?? new List<string>();
            }

            return new List<string>();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting user permissions from token");
            return new List<string>();
        }
    }
}

public class ValidateTokenResponse
{
    public bool IsValid { get; set; }
    public Guid? UserId { get; set; }
    public List<string> Roles { get; set; } = new();
    public List<string> Permissions { get; set; } = new();
}
