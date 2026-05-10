using CareerPilot.Application.DTOs.Auth;
using CareerPilot.Shared;

namespace CareerPilot.Application.Interfaces.Services;

public interface IUserService
{
    Task<Result<UserDto>> GetProfileAsync(int userId);
    Task<Result<UserDto>> UpdateProfileAsync(int userId, UpdateProfileRequest request);
    Task<Result> ChangePasswordAsync(int userId, ChangePasswordRequest request);
}

public class UpdateProfileRequest
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? PhoneNumber { get; set; }
    public string? ProfileImageUrl { get; set; }
}

public class ChangePasswordRequest
{
    public string CurrentPassword { get; set; } = string.Empty;
    public string NewPassword { get; set; } = string.Empty;
}
