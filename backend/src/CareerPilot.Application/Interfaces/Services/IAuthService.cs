using CareerPilot.Application.DTOs.Auth;
using CareerPilot.Shared;

namespace CareerPilot.Application.Interfaces.Services;

public interface IAuthService
{
    Task<Result<AuthResponse>> LoginAsync(LoginRequest request);
    Task<Result<AuthResponse>> RegisterAsync(RegisterRequest request);
    Task<Result<AuthResponse>> RefreshTokenAsync(string token, string refreshToken);
    Task<Result> RevokeTokenAsync(string refreshToken);
    Task<Result> ForgotPasswordAsync(ForgotPasswordRequest request);
    Task<Result> ResetPasswordAsync(ResetPasswordRequest request);
    Task<Result> VerifyEmailAsync(VerifyEmailRequest request);
    Task<Result> ResendVerificationEmailAsync(ResendVerificationEmailRequest request);
}
