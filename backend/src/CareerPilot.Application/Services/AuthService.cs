using AutoMapper;
using CareerPilot.Application.DTOs.Auth;
using CareerPilot.Application.Interfaces.Repositories;
using CareerPilot.Application.Interfaces.Services;
using CareerPilot.Domain.Entities;
using CareerPilot.Shared;
using Microsoft.AspNetCore.Identity;

namespace CareerPilot.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IJwtService _jwtService;
    private readonly IMapper _mapper;
    private readonly IEmailService _emailService;
    private readonly PasswordHasher<User> _passwordHasher;

    public AuthService(IUnitOfWork unitOfWork, IJwtService jwtService, IMapper mapper, IEmailService emailService)
    {
        _unitOfWork = unitOfWork;
        _jwtService = jwtService;
        _mapper = mapper;
        _emailService = emailService;
        _passwordHasher = new PasswordHasher<User>();
    }

    public async Task<Result<AuthResponse>> RegisterAsync(RegisterRequest request)
    {
        var existingUser = await _unitOfWork.Repository<User>().FindAsync(u => u.Email == request.Email);
        if (existingUser.Any())
            return Result<AuthResponse>.Failure("Email already exists");

        var user = new User
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            Role = "User",
            IsActive = true,
            VerificationToken = Guid.NewGuid().ToString("N")
        };
        user.PasswordHash = _passwordHasher.HashPassword(user, request.Password);

        await _unitOfWork.Repository<User>().AddAsync(user);
        await _unitOfWork.SaveChangesAsync();

        // Send Verification Email
        await _emailService.SendEmailAsync(user.Email, "Verify your email", $"Your verification token is: {user.VerificationToken}");

        return await GenerateAuthResponse(user);
    }

    public async Task<Result<AuthResponse>> LoginAsync(LoginRequest request)
    {
        var users = await _unitOfWork.Repository<User>().FindAsync(u => u.Email == request.Email);
        var user = users.FirstOrDefault();

        if (user == null || !user.IsActive)
            return Result<AuthResponse>.Failure("Invalid credentials or inactive account");

        var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);
        if (result == PasswordVerificationResult.Failed)
            return Result<AuthResponse>.Failure("Invalid credentials");

        return await GenerateAuthResponse(user);
    }

    public async Task<Result<AuthResponse>> RefreshTokenAsync(string token, string refreshToken)
    {
        var principal = _jwtService.GetPrincipalFromExpiredToken(token);
        var userIdStr = principal.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdStr, out int userId)) return Result<AuthResponse>.Failure("Invalid token");
        
        var user = await _unitOfWork.Repository<User>().GetByIdAsync(userId);
        if (user == null) return Result<AuthResponse>.Failure("User not found");

        if (user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            return Result<AuthResponse>.Failure("Invalid or expired refresh token");

        return await GenerateAuthResponse(user);
    }

    public async Task<Result> RevokeTokenAsync(string refreshToken)
    {
        var users = await _unitOfWork.Repository<User>().FindAsync(u => u.RefreshToken == refreshToken);
        var user = users.FirstOrDefault();
        if (user == null) return Result.Failure("Token not found");

        user.RefreshToken = null;
        user.RefreshTokenExpiryTime = null;
        
        _unitOfWork.Repository<User>().Update(user);
        await _unitOfWork.SaveChangesAsync();

        return Result.Success("Token revoked");
    }

    public async Task<Result> ForgotPasswordAsync(ForgotPasswordRequest request)
    {
        var users = await _unitOfWork.Repository<User>().FindAsync(u => u.Email == request.Email);
        var user = users.FirstOrDefault();
        if (user == null) return Result.Success("If an account exists, a reset link has been sent.");

        user.PasswordResetToken = Guid.NewGuid().ToString("N");
        user.ResetTokenExpires = DateTime.UtcNow.AddHours(1);

        _unitOfWork.Repository<User>().Update(user);
        await _unitOfWork.SaveChangesAsync();

        await _emailService.SendEmailAsync(user.Email, "Reset your password", $"Your reset token is: {user.PasswordResetToken}");
        return Result.Success("If an account exists, a reset link has been sent.");
    }

    public async Task<Result> ResetPasswordAsync(ResetPasswordRequest request)
    {
        var users = await _unitOfWork.Repository<User>().FindAsync(u => u.Email == request.Email && u.PasswordResetToken == request.Token);
        var user = users.FirstOrDefault();
        
        if (user == null || user.ResetTokenExpires < DateTime.UtcNow)
            return Result.Failure("Invalid or expired token");

        user.PasswordHash = _passwordHasher.HashPassword(user, request.NewPassword);
        user.PasswordResetToken = null;
        user.ResetTokenExpires = null;

        _unitOfWork.Repository<User>().Update(user);
        await _unitOfWork.SaveChangesAsync();

        return Result.Success("Password has been reset successfully");
    }

    public async Task<Result> VerifyEmailAsync(VerifyEmailRequest request)
    {
        var users = await _unitOfWork.Repository<User>().FindAsync(u => u.Email == request.Email && u.VerificationToken == request.Token);
        var user = users.FirstOrDefault();

        if (user == null)
            return Result.Failure("Invalid verification token");

        user.IsEmailVerified = true;
        user.VerifiedAt = DateTime.UtcNow;
        user.VerificationToken = null;

        _unitOfWork.Repository<User>().Update(user);
        await _unitOfWork.SaveChangesAsync();

        return Result.Success("Email verified successfully");
    }

    public async Task<Result> ResendVerificationEmailAsync(ResendVerificationEmailRequest request)
    {
        var users = await _unitOfWork.Repository<User>().FindAsync(u => u.Email == request.Email);
        var user = users.FirstOrDefault();

        if (user == null || user.IsEmailVerified)
            return Result.Success("If your account exists and is unverified, a new link has been sent.");

        user.VerificationToken = Guid.NewGuid().ToString("N");
        _unitOfWork.Repository<User>().Update(user);
        await _unitOfWork.SaveChangesAsync();

        await _emailService.SendEmailAsync(user.Email, "Verify your email", $"Your verification token is: {user.VerificationToken}");
        return Result.Success("If your account exists and is unverified, a new link has been sent.");
    }

    private async Task<Result<AuthResponse>> GenerateAuthResponse(User user)
    {
        var token = _jwtService.GenerateToken(user);
        var refreshToken = _jwtService.GenerateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

        _unitOfWork.Repository<User>().Update(user);
        await _unitOfWork.SaveChangesAsync();

        return Result<AuthResponse>.Success(new AuthResponse
        {
            Token = token,
            RefreshToken = refreshToken,
            User = _mapper.Map<UserDto>(user)
        });
    }
}
