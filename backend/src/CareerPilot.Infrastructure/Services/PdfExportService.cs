using CareerPilot.Application.Interfaces.Repositories;
using CareerPilot.Application.Interfaces.Services;
using CareerPilot.Domain.Entities;
using CareerPilot.Shared;
using Microsoft.EntityFrameworkCore;
using PuppeteerSharp;
using PuppeteerSharp.Media;

namespace CareerPilot.Infrastructure.Services;

public class PdfExportService : IPdfExportService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IResumeService _resumeService;

    public PdfExportService(IUnitOfWork unitOfWork, IResumeService resumeService)
    {
        _unitOfWork = unitOfWork;
        _resumeService = resumeService;
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

            string printUrl = $"{request.BaseUrl.TrimEnd('/')}/resume/export/{resumeId}";
            
            // Navigate and wait for the "is_ready_for_pdf" signal or full network idle
            await page.GoToAsync(printUrl, new NavigationOptions 
            { 
                WaitUntil = new[] { WaitUntilNavigation.Networkidle2, WaitUntilNavigation.Load },
                Timeout = 30000 
            });

            // Final check for the ready signal injected by ResumeExportView.jsx
            await page.WaitForFunctionAsync("window.is_ready_for_pdf === true", new WaitForFunctionOptions { Timeout = 5000 });

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
        catch (Exception ex)
        {
            return Result<ExportResult>.Failure($"PDF Export failed: {ex.Message}");
        }
    }

    public Task<Result<ExportResult>> ExportDocxAsync(int userId, int resumeId, ExportRequest request)
    {
        // To be implemented in the next step
        throw new NotImplementedException();
    }
}
