using CareerPilot.Application.DTOs.Auth;
using CareerPilot.Shared;

namespace CareerPilot.Application.Interfaces.Services;

public interface IAuthService
{
    Task<Result<AuthResponse>> LoginAsync(LoginRequest request);
    Task<Result<AuthResponse>> RegisterAsync(RegisterRequest request);
    Task<Result<AuthResponse>> RefreshTokenAsync(string token, string refreshToken);
    Task<Result> RevokeTokenAsync(string refreshToken);
}
