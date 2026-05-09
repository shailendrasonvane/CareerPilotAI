using AutoMapper;
using CareerPilot.Application.DTOs.Auth;
using CareerPilot.Application.Interfaces.Repositories;
using CareerPilot.Application.Interfaces.Services;
using CareerPilot.Domain.Entities;
using CareerPilot.Shared;
using BCrypt.Net;

namespace CareerPilot.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IJwtService _jwtService;
    private readonly IMapper _mapper;

    public AuthService(IUnitOfWork unitOfWork, IJwtService jwtService, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _jwtService = jwtService;
        _mapper = mapper;
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
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password),
            Role = "User"
        };

        await _unitOfWork.Repository<User>().AddAsync(user);
        await _unitOfWork.SaveChangesAsync();

        return await GenerateAuthResponse(user);
    }

    public async Task<Result<AuthResponse>> LoginAsync(LoginRequest request)
    {
        var users = await _unitOfWork.Repository<User>().FindAsync(u => u.Email == request.Email);
        var user = users.FirstOrDefault();

        if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            return Result<AuthResponse>.Failure("Invalid credentials");

        return await GenerateAuthResponse(user);
    }

    public async Task<Result<AuthResponse>> RefreshTokenAsync(string token, string refreshToken)
    {
        var principal = _jwtService.GetPrincipalFromExpiredToken(token);
        var userId = int.Parse(principal.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)!.Value);
        
        var user = await _unitOfWork.Repository<User>().GetByIdAsync(userId);
        if (user == null) return Result<AuthResponse>.Failure("User not found");

        var storedToken = await _unitOfWork.Repository<RefreshToken>().FindAsync(t => t.Token == refreshToken && t.UserId == userId);
        var rToken = storedToken.FirstOrDefault();

        if (rToken == null || !rToken.IsActive)
            return Result<AuthResponse>.Failure("Invalid or expired refresh token");

        rToken.Revoked = DateTime.UtcNow;
        _unitOfWork.Repository<RefreshToken>().Update(rToken);

        return await GenerateAuthResponse(user);
    }

    public async Task<Result> RevokeTokenAsync(string refreshToken)
    {
        var tokens = await _unitOfWork.Repository<RefreshToken>().FindAsync(t => t.Token == refreshToken);
        var token = tokens.FirstOrDefault();
        if (token == null) return Result.Failure("Token not found");

        token.Revoked = DateTime.UtcNow;
        _unitOfWork.Repository<RefreshToken>().Update(token);
        await _unitOfWork.SaveChangesAsync();

        return Result.Success("Token revoked");
    }

    private async Task<Result<AuthResponse>> GenerateAuthResponse(User user)
    {
        var token = _jwtService.GenerateToken(user);
        var refreshToken = _jwtService.GenerateRefreshToken();

        var rToken = new RefreshToken
        {
            Token = refreshToken,
            Expires = DateTime.UtcNow.AddDays(7),
            UserId = user.Id
        };

        await _unitOfWork.Repository<RefreshToken>().AddAsync(rToken);
        await _unitOfWork.SaveChangesAsync();

        return Result<AuthResponse>.Success(new AuthResponse
        {
            Token = token,
            RefreshToken = refreshToken,
            User = _mapper.Map<UserDto>(user)
        });
    }
}
