using ERP.Identity.Domain.Entities;

namespace ERP.Identity.Domain.Services;

public interface IJwtService
{
    string GenerateToken(User user);
    string GenerateRefreshToken();
    bool ValidateToken(string token);
    bool ValidateRefreshToken(string refreshToken, int userId);
    int? GetUserIdFromToken(string token);
    IEnumerable<string> GetRolesFromToken(string token);
    IEnumerable<string> GetPermissionsFromToken(string token);
    Task<string> RefreshTokenAsync(string refreshToken);
    Task RevokeRefreshTokenAsync(string refreshToken);
    Task RevokeAllUserTokensAsync(int userId);
}
