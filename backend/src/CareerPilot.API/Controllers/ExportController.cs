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

    public ExportController(IPdfExportService pdfExportService, IDocxExportService docxExportService)
    {
        _pdfExportService = pdfExportService;
        _docxExportService = docxExportService;
    }

    [HttpPost("{resumeId}/pdf")]
    public async Task<IActionResult> ExportPdf(int resumeId, [FromBody] ExportRequest request)
    {
        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        // Pass the request which should contain the BaseUrl for the frontend
        var result = await _pdfExportService.ExportPdfAsync(userId, resumeId, request);
        
        if (!result.IsSuccess) return BadRequest(result.Message);

        return File(result.Value.FileData, result.Value.ContentType, result.Value.FileName);
    }

    [HttpPost("{resumeId}/docx")]
    public async Task<IActionResult> ExportDocx(int resumeId, [FromBody] ExportRequest request)
    {
        int userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        
        var result = await _docxExportService.ExportDocxAsync(userId, resumeId, request);
        
        if (!result.IsSuccess) return BadRequest(result.Message);

        return File(result.Value.FileData, result.Value.ContentType, result.Value.FileName);
    }
}
