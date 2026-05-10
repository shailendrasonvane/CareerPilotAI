using CareerPilot.Application.DTOs.Auth;
using CareerPilot.Application.Interfaces.Services;
using CareerPilot.Shared;
using Microsoft.AspNetCore.Mvc;

namespace CareerPilot.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var result = await _authService.RegisterAsync(request);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse<AuthResponse>.FailureResponse(result.Message));

        return Ok(ApiResponse<AuthResponse>.SuccessResponse(result.Value, "User registered successfully"));
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var result = await _authService.LoginAsync(request);
        if (!result.IsSuccess)
            return Unauthorized(ApiResponse<AuthResponse>.FailureResponse(result.Message));

        return Ok(ApiResponse<AuthResponse>.SuccessResponse(result.Value, "Login successful"));
    }

    [HttpPost("refresh-token")]
    public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
    {
        var result = await _authService.RefreshTokenAsync(request.Token, request.RefreshToken);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse<AuthResponse>.FailureResponse(result.Message));

        return Ok(ApiResponse<AuthResponse>.SuccessResponse(result.Value, "Token refreshed successfully"));
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout([FromBody] LogoutRequest request)
    {
        var result = await _authService.RevokeTokenAsync(request.RefreshToken);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse<string>.FailureResponse(result.Message));

        return Ok(ApiResponse<string>.SuccessResponse("Logout successful"));
    }

    [HttpPost("forgot-password")]
    public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
    {
        var result = await _authService.ForgotPasswordAsync(request);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse<string>.FailureResponse(result.Message));

        return Ok(ApiResponse<string>.SuccessResponse(result.Message));
    }

    [HttpPost("reset-password")]
    public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
    {
        var result = await _authService.ResetPasswordAsync(request);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse<string>.FailureResponse(result.Message));

        return Ok(ApiResponse<string>.SuccessResponse(result.Message));
    }

    [HttpPost("verify-email")]
    public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailRequest request)
    {
        var result = await _authService.VerifyEmailAsync(request);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse<string>.FailureResponse(result.Message));

        return Ok(ApiResponse<string>.SuccessResponse(result.Message));
    }

    [HttpPost("resend-verification-email")]
    public async Task<IActionResult> ResendVerificationEmail([FromBody] ResendVerificationEmailRequest request)
    {
        var result = await _authService.ResendVerificationEmailAsync(request);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse<string>.FailureResponse(result.Message));

        return Ok(ApiResponse<string>.SuccessResponse(result.Message));
    }
}

public class RefreshTokenRequest
{
    public string Token { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
}

public class LogoutRequest
{
    public string RefreshToken { get; set; } = string.Empty;
}
