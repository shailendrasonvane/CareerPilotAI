using CareerPilot.Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace CareerPilot.API.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class ExportController : ControllerBase
{
    private readonly IPdfExportService _pdfExportService;
    private readonly IDocxExportService _docxExportService;
    private readonly ILogger<ExportController> _logger;

    public ExportController(IPdfExportService pdfExportService, IDocxExportService docxExportService, ILogger<ExportController> logger)
    {
        _pdfExportService = pdfExportService;
        _docxExportService = docxExportService;
        _logger = logger;
    }

    [HttpPost("{resumeId}/pdf")]
    public async Task<IActionResult> ExportPdf(int resumeId, [FromBody] ExportRequest request)
    {
        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var authHeader = Request.Headers["Authorization"].ToString();
        if (authHeader.StartsWith("Bearer "))
        {
            request.Token = authHeader.Substring(7);
        }
        
        // Pass the request which should contain the BaseUrl for the frontend
        var result = await _pdfExportService.ExportPdfAsync(userId, resumeId, request);
        
        if (!result.IsSuccess)
        {
            _logger.LogError("PDF Export failed for ResumeId {ResumeId}, UserId {UserId}: {Message}", resumeId, userId, result.Message);
            return BadRequest(new { message = result.Message });
        }

        return File(result.Value.FileData, result.Value.ContentType, result.Value.FileName);
    }

    [HttpPost("{resumeId}/docx")]
    public async Task<IActionResult> ExportDocx(int resumeId, [FromBody] ExportRequest request)
    {
        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var result = await _docxExportService.ExportDocxAsync(userId, resumeId, request);
        
        if (!result.IsSuccess)
        {
            _logger.LogError("DOCX Export failed for ResumeId {ResumeId}, UserId {UserId}: {Message}", resumeId, userId, result.Message);
            return BadRequest(new { message = result.Message });
        }

        return File(result.Value.FileData, result.Value.ContentType, result.Value.FileName);
    }
}
