using CareerPilot.Application.DTOs.Dashboard;
using CareerPilot.Application.Interfaces.Services;
using CareerPilot.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CareerPilot.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet("overview")]
    public async Task<IActionResult> GetOverview()
    {
        var userId = GetUserId();
        if (userId == null)
            return Unauthorized(ApiResponse<string>.FailureResponse("User not authorized"));

        var result = await _dashboardService.GetOverviewAsync(userId.Value);
        if (!result.IsSuccess)
            return BadRequest(ApiResponse<DashboardOverviewDto>.FailureResponse(result.Message));

        return Ok(ApiResponse<DashboardOverviewDto>.SuccessResponse(result.Value));
    }

    private int? GetUserId()
    {
        var userIdStr = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (int.TryParse(userIdStr, out int userId))
            return userId;
        return null;
    }
}
