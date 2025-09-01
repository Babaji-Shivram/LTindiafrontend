namespace ERP.UserAccessManagement.Domain.Services;

public interface ITokenValidationService
{
    Task<bool> ValidateTokenAsync(string token);
    Task<Guid?> GetUserIdFromTokenAsync(string token);
    Task<IEnumerable<string>> GetUserRolesAsync(string token);
    Task<IEnumerable<string>> GetUserPermissionsAsync(string token);
}

public class TokenValidationResult
{
    public bool IsValid { get; set; }
    public Guid? UserId { get; set; }
    public List<string> Roles { get; set; } = new();
    public List<string> Permissions { get; set; } = new();
    public string? ErrorMessage { get; set; }
}
