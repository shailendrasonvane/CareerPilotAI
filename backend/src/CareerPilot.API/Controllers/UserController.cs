using CareerPilot.Application.DTOs.Auth;
using CareerPilot.Application.Interfaces.Services;
using CareerPilot.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CareerPilot.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("profile")]
    public async Task<IActionResult> GetProfile()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdStr, out int userId))
            return Unauthorized(ApiResponse<string>.FailureResponse("User not authorized"));

        var result = await _userService.GetProfileAsync(userId);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse<UserDto>.FailureResponse(result.Message));

        return Ok(ApiResponse<UserDto>.SuccessResponse(result.Value));
    }

    [HttpPut("profile")]
    public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileRequest request)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdStr, out int userId))
            return Unauthorized(ApiResponse<string>.FailureResponse("User not authorized"));

        var result = await _userService.UpdateProfileAsync(userId, request);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse<UserDto>.FailureResponse(result.Message));

        return Ok(ApiResponse<UserDto>.SuccessResponse(result.Value, "Profile updated successfully"));
    }

    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (!int.TryParse(userIdStr, out int userId))
            return Unauthorized(ApiResponse<string>.FailureResponse("User not authorized"));

        var result = await _userService.ChangePasswordAsync(userId, request);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse<string>.FailureResponse(result.Message));

        return Ok(ApiResponse<string>.SuccessResponse(result.Message));
    }
}
