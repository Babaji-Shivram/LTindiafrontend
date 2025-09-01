using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ERP.Identity.Domain.Entities;
using ERP.Identity.Domain.Services;

namespace ERP.Identity.Infrastructure.Services;

public class JwtService : IJwtService
{
    private readonly IConfiguration _configuration;
    private readonly IRefreshTokenService _refreshTokenService;
    private readonly string _secretKey;
    private readonly string _issuer;
    private readonly string _audience;
    private readonly int _expirationMinutes;

    public JwtService(IConfiguration configuration, IRefreshTokenService refreshTokenService)
    {
        _configuration = configuration;
        _refreshTokenService = refreshTokenService;
        _secretKey = configuration["JwtSettings:SecretKey"] ?? throw new ArgumentNullException("JWT SecretKey is required");
        _issuer = configuration["JwtSettings:Issuer"] ?? "ERP.Identity.Api";
        _audience = configuration["JwtSettings:Audience"] ?? "ERP.Api";
        _expirationMinutes = int.Parse(configuration["JwtSettings:ExpirationMinutes"] ?? "60");
    }

    public string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
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
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_expirationMinutes),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public bool ValidateToken(string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_secretKey);

            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = true,
                ValidIssuer = _issuer,
                ValidateAudience = true,
                ValidAudience = _audience,
                ClockSkew = TimeSpan.Zero,
                ValidateLifetime = true
            }, out SecurityToken validatedToken);

            return true;
        }
        catch
        {
            return false;
        }
    }

    public int? GetUserIdFromToken(string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jsonToken = tokenHandler.ReadJwtToken(token);
            var userIdClaim = jsonToken.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);
            return userIdClaim != null ? int.Parse(userIdClaim.Value) : null;
        }
        catch
        {
            return null;
        }
    }

    public IEnumerable<string> GetRolesFromToken(string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jsonToken = tokenHandler.ReadJwtToken(token);
            return jsonToken.Claims.Where(x => x.Type == ClaimTypes.Role).Select(x => x.Value);
        }
        catch
        {
            return Enumerable.Empty<string>();
        }
    }

    public IEnumerable<string> GetPermissionsFromToken(string token)
    {
        try
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jsonToken = tokenHandler.ReadJwtToken(token);
            return jsonToken.Claims.Where(x => x.Type == "permission").Select(x => x.Value);
        }
        catch
        {
            return Enumerable.Empty<string>();
        }
    }

    public string GenerateRefreshToken()
    {
        var randomNumber = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    public bool ValidateRefreshToken(string refreshToken, int userId)
    {
        return _refreshTokenService.ValidateRefreshTokenAsync(refreshToken, userId).GetAwaiter().GetResult();
    }

    public async Task<string> RefreshTokenAsync(string refreshToken)
    {
        var result = await _refreshTokenService.RefreshAccessTokenAsync(refreshToken);
        return result.AccessToken;
    }

    public async Task RevokeRefreshTokenAsync(string refreshToken)
    {
        await _refreshTokenService.RevokeRefreshTokenAsync(refreshToken);
    }

    public async Task RevokeAllUserTokensAsync(int userId)
    {
        await _refreshTokenService.RevokeAllUserTokensAsync(userId);
    }
}
