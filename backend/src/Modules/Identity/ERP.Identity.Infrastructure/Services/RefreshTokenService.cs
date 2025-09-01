using System.Security.Cryptography;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using ERP.Identity.Domain.Services;
using ERP.Identity.Domain.Entities;

namespace ERP.Identity.Infrastructure.Services;

public class RefreshTokenService : IRefreshTokenService
{
    private readonly ILogger<RefreshTokenService> _logger;
    private readonly IConfiguration _configuration;
    private readonly IAuditService _auditService;
    private readonly int _refreshTokenExpirationDays;

    // In-memory storage for demonstration - replace with database repository
    private static readonly Dictionary<string, RefreshTokenInfo> _refreshTokens = new();

    public RefreshTokenService(
        ILogger<RefreshTokenService> logger,
        IConfiguration configuration,
        IAuditService auditService)
    {
        _logger = logger;
        _configuration = configuration;
        _auditService = auditService;
        _refreshTokenExpirationDays = int.Parse(configuration["JwtSettings:RefreshTokenExpirationDays"] ?? "7");
    }

    public async Task<string> GenerateRefreshTokenAsync(int userId)
    {
        try
        {
            // Generate cryptographically secure random token
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            var token = Convert.ToBase64String(randomNumber);

            // Store token info
            var tokenInfo = new RefreshTokenInfo
            {
                UserId = userId,
                Token = token,
                CreatedAt = DateTime.UtcNow,
                ExpiresAt = DateTime.UtcNow.AddDays(_refreshTokenExpirationDays),
                IsRevoked = false
            };

            _refreshTokens[token] = tokenInfo;

            _logger.LogInformation("Generated refresh token for user {UserId}", userId);
            await _auditService.LogSecurityEventAsync(SecurityEventType.TokenRefresh, userId, "Refresh token generated");

            return token;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating refresh token for user {UserId}", userId);
            throw;
        }
    }

    public async Task<bool> ValidateRefreshTokenAsync(string refreshToken, int userId)
    {
        try
        {
            if (string.IsNullOrEmpty(refreshToken))
                return false;

            if (!_refreshTokens.TryGetValue(refreshToken, out var tokenInfo))
                return false;

            if (tokenInfo.IsRevoked)
            {
                _logger.LogWarning("Attempt to use revoked refresh token for user {UserId}", userId);
                await _auditService.LogSecurityEventAsync(SecurityEventType.SuspiciousActivity, userId, "Attempted to use revoked refresh token");
                return false;
            }

            if (tokenInfo.ExpiresAt < DateTime.UtcNow)
            {
                _logger.LogInformation("Expired refresh token used for user {UserId}", userId);
                return false;
            }

            if (tokenInfo.UserId != userId)
            {
                _logger.LogWarning("Refresh token user ID mismatch. Token UserId: {TokenUserId}, Provided UserId: {ProvidedUserId}", 
                    tokenInfo.UserId, userId);
                await _auditService.LogSecurityEventAsync(SecurityEventType.SuspiciousActivity, userId, "Refresh token user ID mismatch");
                return false;
            }

            return true;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error validating refresh token for user {UserId}", userId);
            return false;
        }
    }

    public async Task<TokenPairResult> RefreshAccessTokenAsync(string refreshToken)
    {
        try
        {
            if (!_refreshTokens.TryGetValue(refreshToken, out var tokenInfo))
            {
                throw new UnauthorizedAccessException("Invalid refresh token");
            }

            if (!await ValidateRefreshTokenAsync(refreshToken, tokenInfo.UserId))
            {
                throw new UnauthorizedAccessException("Invalid or expired refresh token");
            }

            // Get user information (this would typically come from a user repository)
            // For now, creating a basic user object with minimal info
            var user = new User 
            { 
                Id = tokenInfo.UserId,
                Username = $"user{tokenInfo.UserId}",
                Email = $"user{tokenInfo.UserId}@example.com",
                FirstName = "User",
                LastName = tokenInfo.UserId.ToString(),
                Roles = new List<string> { "User" },
                Permissions = new List<string> { "read" }
            };

            // Generate new access token
            var newAccessToken = GenerateAccessToken(user);

            // Generate new refresh token
            var newRefreshToken = await GenerateRefreshTokenAsync(tokenInfo.UserId);

            // Revoke old refresh token
            await RevokeRefreshTokenAsync(refreshToken);

            var result = new TokenPairResult
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken,
                AccessTokenExpiresAt = DateTime.UtcNow.AddMinutes(int.Parse(_configuration["JwtSettings:ExpirationMinutes"] ?? "60")),
                RefreshTokenExpiresAt = DateTime.UtcNow.AddDays(_refreshTokenExpirationDays)
            };

            _logger.LogInformation("Successfully refreshed tokens for user {UserId}", tokenInfo.UserId);
            await _auditService.LogTokenRefreshAsync(tokenInfo.UserId);

            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error refreshing access token");
            throw;
        }
    }

    public async Task RevokeRefreshTokenAsync(string refreshToken)
    {
        try
        {
            if (_refreshTokens.TryGetValue(refreshToken, out var tokenInfo))
            {
                tokenInfo.IsRevoked = true;
                tokenInfo.RevokedReason = "Manually revoked";

                _logger.LogInformation("Revoked refresh token for user {UserId}", tokenInfo.UserId);
                await _auditService.LogSecurityEventAsync(SecurityEventType.TokenRevoked, tokenInfo.UserId, "Refresh token revoked");
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error revoking refresh token");
            throw;
        }
    }

    public async Task RevokeAllUserTokensAsync(int userId)
    {
        try
        {
            var userTokens = _refreshTokens.Values.Where(t => t.UserId == userId && !t.IsRevoked).ToList();
            
            foreach (var token in userTokens)
            {
                token.IsRevoked = true;
                token.RevokedReason = "All user tokens revoked";
            }

            _logger.LogInformation("Revoked all refresh tokens for user {UserId}, Count: {Count}", userId, userTokens.Count);
            await _auditService.LogSecurityEventAsync(SecurityEventType.TokenRevoked, userId, $"All refresh tokens revoked (count: {userTokens.Count})");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error revoking all tokens for user {UserId}", userId);
            throw;
        }
    }

    public async Task<RefreshTokenInfo?> GetRefreshTokenInfoAsync(string refreshToken)
    {
        try
        {
            _refreshTokens.TryGetValue(refreshToken, out var tokenInfo);
            return await Task.FromResult(tokenInfo);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting refresh token info");
            return null;
        }
    }

    public Task<int> CleanupExpiredTokensAsync()
    {
        try
        {
            var expiredTokens = _refreshTokens.Where(kvp => kvp.Value.ExpiresAt < DateTime.UtcNow).ToList();
            
            foreach (var expiredToken in expiredTokens)
            {
                _refreshTokens.Remove(expiredToken.Key);
            }

            _logger.LogInformation("Cleaned up {Count} expired refresh tokens", expiredTokens.Count);
            return Task.FromResult(expiredTokens.Count);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error cleaning up expired tokens");
            return Task.FromResult(0);
        }
    }

    private string GenerateAccessToken(User user)
    {
        var secretKey = _configuration["JwtSettings:SecretKey"] ?? throw new ArgumentNullException("JWT SecretKey is required");
        var issuer = _configuration["JwtSettings:Issuer"] ?? "ERP.Identity.Api";
        var audience = _configuration["JwtSettings:Audience"] ?? "ERP.Api";
        var expirationMinutes = int.Parse(_configuration["JwtSettings:ExpirationMinutes"] ?? "60");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.Username),
            new(ClaimTypes.Email, user.Email),
            new("firstName", user.FirstName),
            new("lastName", user.LastName)
        };

        // Add roles
        foreach (var role in user.Roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role));
        }

        // Add permissions
        foreach (var permission in user.Permissions)
        {
            claims.Add(new Claim("permission", permission));
        }

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expirationMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
