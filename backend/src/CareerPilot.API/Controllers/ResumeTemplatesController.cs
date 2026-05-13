using CareerPilot.Application.DTOs.Resume;
using CareerPilot.Application.Interfaces.Services;
using CareerPilot.Shared;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CareerPilot.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class ResumeTemplatesController : ControllerBase
{
    private readonly IResumeTemplateService _templateService;

    public ResumeTemplatesController(IResumeTemplateService templateService)
    {
        _templateService = templateService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var templates = await _templateService.GetAllTemplatesAsync();
        return Ok(ApiResponse<IEnumerable<ResumeTemplateDto>>.SuccessResponse(templates));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var template = await _templateService.GetTemplateByIdAsync(id);
        if (template == null)
            return NotFound(ApiResponse<ResumeTemplateDto>.FailureResponse("Template not found"));

        return Ok(ApiResponse<ResumeTemplateDto>.SuccessResponse(template));
    }
}
