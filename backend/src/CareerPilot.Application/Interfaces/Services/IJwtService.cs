using CareerPilot.Domain.Entities;
using System.Security.Claims;

namespace CareerPilot.Application.Interfaces.Services;

public interface IJwtService
{
    string GenerateToken(User user);
    string GenerateRefreshToken();
    ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
}
