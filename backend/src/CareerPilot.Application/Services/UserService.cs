using AutoMapper;
using CareerPilot.Application.DTOs.Auth;
using CareerPilot.Application.Interfaces.Repositories;
using CareerPilot.Application.Interfaces.Services;
using CareerPilot.Domain.Entities;
using CareerPilot.Shared;
using Microsoft.AspNetCore.Identity;

namespace CareerPilot.Application.Services;

public class UserService : IUserService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly PasswordHasher<User> _passwordHasher;

    public UserService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _passwordHasher = new PasswordHasher<User>();
    }

    public async Task<Result<UserDto>> GetProfileAsync(int userId)
    {
        var user = await _unitOfWork.Repository<User>().GetByIdAsync(userId);
        if (user == null) return Result<UserDto>.Failure("User not found");

        return Result<UserDto>.Success(_mapper.Map<UserDto>(user));
    }

    public async Task<Result<UserDto>> UpdateProfileAsync(int userId, UpdateProfileRequest request)
    {
        var user = await _unitOfWork.Repository<User>().GetByIdAsync(userId);
        if (user == null) return Result<UserDto>.Failure("User not found");

        user.FirstName = request.FirstName;
        user.LastName = request.LastName;
        user.PhoneNumber = request.PhoneNumber;
        user.ProfileImageUrl = request.ProfileImageUrl;

        _unitOfWork.Repository<User>().Update(user);
        await _unitOfWork.SaveChangesAsync();

        return Result<UserDto>.Success(_mapper.Map<UserDto>(user));
    }

    public async Task<Result> ChangePasswordAsync(int userId, ChangePasswordRequest request)
    {
        var user = await _unitOfWork.Repository<User>().GetByIdAsync(userId);
        if (user == null) return Result.Failure("User not found");

        var verifyResult = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.CurrentPassword);
        if (verifyResult == PasswordVerificationResult.Failed)
            return Result.Failure("Invalid current password");

        user.PasswordHash = _passwordHasher.HashPassword(user, request.NewPassword);
        
        _unitOfWork.Repository<User>().Update(user);
        await _unitOfWork.SaveChangesAsync();

        return Result.Success("Password changed successfully");
    }
}
