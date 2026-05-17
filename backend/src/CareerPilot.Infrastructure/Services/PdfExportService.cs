using CareerPilot.Application.Interfaces.Repositories;
using CareerPilot.Application.Interfaces.Services;
using CareerPilot.Domain.Entities;
using CareerPilot.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PuppeteerSharp;
using PuppeteerSharp.Media;

namespace CareerPilot.Infrastructure.Services;

public class PdfExportService : IPdfExportService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IResumeService _resumeService;
    private readonly ILogger<PdfExportService> _logger;

    public PdfExportService(IUnitOfWork unitOfWork, IResumeService resumeService, ILogger<PdfExportService> logger)
    {
        _unitOfWork = unitOfWork;
        _resumeService = resumeService;
        _logger = logger;
    }

    public async Task<Result<ExportResult>> ExportPdfAsync(int userId, int resumeId, ExportRequest request)
    {
        var resumeResult = await _resumeService.GetResumeByIdAsync(userId, resumeId);
        if (!resumeResult.IsSuccess) return Result<ExportResult>.Failure(resumeResult.Message);

        var resume = resumeResult.Value;

        try
        {
            var browserFetcher = new BrowserFetcher();
            await browserFetcher.DownloadAsync();
            
            using var browser = await Puppeteer.LaunchAsync(new LaunchOptions 
            { 
                Headless = true,
                Args = new[] { "--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage" }
            });

            using var page = await browser.NewPageAsync();
            
            // Set viewport to A4 dimensions at 96 DPI
            await page.SetViewportAsync(new ViewPortOptions
            {
                Width = 794,
                Height = 1123,
                IsMobile = false,
                DeviceScaleFactor = 1
            });

            string printUrl = $"{request.BaseUrl.TrimEnd('/')}/resume/export/{resumeId}?token={request.Token}";

            // Navigate to export page
            await page.GoToAsync(printUrl, new NavigationOptions
            {
                WaitUntil = new[] { WaitUntilNavigation.DOMContentLoaded },
                Timeout = 60000
            });

            // Give React/Vite enough time to hydrate and render
            await Task.Delay(4000);
            // Debug current ready state
            var readyState = await page.EvaluateExpressionAsync<bool>(
                "window.is_ready_for_pdf === true"
            );

            Console.WriteLine($"PDF Ready State Before Wait: {readyState}");

            // Wait until frontend explicitly signals ready
            await page.WaitForFunctionAsync(
                "() => window.is_ready_for_pdf === true",
                new WaitForFunctionOptions
                {
                    Timeout = 30000,
                    PollingInterval = 500
                }
            );

            Console.WriteLine("PDF ready signal detected successfully");
            // Generate PDF with exact A4 sizing and zero margins (CSS handles margins)
            var pdfData = await page.PdfDataAsync(new PdfOptions
            {
                Format = PaperFormat.A4,
                PrintBackground = true,
                MarginOptions = new MarginOptions { Top = "0", Right = "0", Bottom = "0", Left = "0" },
                PreferCSSPageSize = true,
                DisplayHeaderFooter = false
            });

            await browser.CloseAsync();

            return Result<ExportResult>.Success(new ExportResult
            {
                FileData = pdfData,
                FileName = $"{resume.PersonalDetails.FirstName}_{resume.PersonalDetails.LastName}_Resume.pdf",
                ContentType = "application/pdf"
            });
        }
        catch (WaitTaskTimeoutException ex)
        {
            _logger.LogError(ex, "Puppeteer wait task timed out. ResumeId: {ResumeId}. Ensure the frontend is setting window.is_ready_for_pdf = true.", resumeId);
            return Result<ExportResult>.Failure("The document generation timed out. The preview page took too long to render.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "PDF Export failed for ResumeId: {ResumeId}", resumeId);
            return Result<ExportResult>.Failure($"PDF Export failed: {ex.Message}");
        }
    }

    public Task<Result<ExportResult>> ExportDocxAsync(int userId, int resumeId, ExportRequest request)
    {
        // To be implemented in the next step
        throw new NotImplementedException();
    }
}
