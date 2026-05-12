using CareerPilot.Application.DTOs.Resume;
using CareerPilot.Application.Interfaces.Services;
using CareerPilot.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CareerPilot.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ResumeController : ControllerBase
{
    private readonly IResumeService _resumeService;

    public ResumeController(IResumeService resumeService)
    {
        _resumeService = resumeService;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateResumeRequest request)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized(ApiResponse<string>.FailureResponse("User not authorized"));

        var result = await _resumeService.CreateResumeAsync(userId.Value, request);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse<ResumeDto>.FailureResponse(result.Message));

        return Ok(ApiResponse<ResumeDto>.SuccessResponse(result.Value, "Resume created successfully"));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized(ApiResponse<string>.FailureResponse("User not authorized"));

        var result = await _resumeService.GetResumeByIdAsync(userId.Value, id);
        if (!result.IsSuccess)
            return NotFound(ApiResponse<ResumeDto>.FailureResponse(result.Message));

        return Ok(ApiResponse<ResumeDto>.SuccessResponse(result.Value));
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized(ApiResponse<string>.FailureResponse("User not authorized"));

        var result = await _resumeService.GetAllUserResumesAsync(userId.Value);
        return Ok(ApiResponse<List<ResumeDto>>.SuccessResponse(result.Value));
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, ResumeDto request)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized(ApiResponse<string>.FailureResponse("User not authorized"));

        var result = await _resumeService.UpdateResumeAsync(userId.Value, id, request);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse<ResumeDto>.FailureResponse(result.Message));

        return Ok(ApiResponse<ResumeDto>.SuccessResponse(result.Value, "Resume updated successfully"));
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized(ApiResponse<string>.FailureResponse("User not authorized"));

        var result = await _resumeService.DeleteResumeAsync(userId.Value, id);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse<string>.FailureResponse(result.Message));

        return Ok(ApiResponse<string>.SuccessResponse(result.Message));
    }

    [HttpPost("{id}/duplicate")]
    public async Task<IActionResult> Duplicate(int id)
    {
        var userId = GetUserId();
        if (userId == null) return Unauthorized(ApiResponse<string>.FailureResponse("User not authorized"));

        var result = await _resumeService.DuplicateResumeAsync(userId.Value, id);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse<ResumeDto>.FailureResponse(result.Message));

        return Ok(ApiResponse<ResumeDto>.SuccessResponse(result.Value, "Resume duplicated successfully"));
    }

    private int? GetUserId()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (int.TryParse(userIdStr, out int userId))
            return userId;
        return null;
    }
}
