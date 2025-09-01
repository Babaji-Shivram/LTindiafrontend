namespace ERP.Identity.Domain.Services;

public interface IRefreshTokenService
{
    Task<string> GenerateRefreshTokenAsync(int userId);
    Task<bool> ValidateRefreshTokenAsync(string refreshToken, int userId);
    Task<TokenPairResult> RefreshAccessTokenAsync(string refreshToken);
    Task RevokeRefreshTokenAsync(string refreshToken);
    Task RevokeAllUserTokensAsync(int userId);
    Task<RefreshTokenInfo?> GetRefreshTokenInfoAsync(string refreshToken);
    Task<int> CleanupExpiredTokensAsync();
}

public class RefreshTokenInfo
{
    public int UserId { get; set; }
    public string Token { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsRevoked { get; set; }
    public string? RevokedReason { get; set; }
}

public class TokenPairResult
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public DateTime AccessTokenExpiresAt { get; set; }
    public DateTime RefreshTokenExpiresAt { get; set; }
}
