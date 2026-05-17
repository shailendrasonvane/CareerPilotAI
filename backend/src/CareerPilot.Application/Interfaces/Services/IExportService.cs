using CareerPilot.Shared;

namespace CareerPilot.Application.Interfaces.Services;

public interface IExportService
{
    Task<Result<ExportResult>> ExportPdfAsync(int userId, int resumeId, ExportRequest request);
    Task<Result<ExportResult>> ExportDocxAsync(int userId, int resumeId, ExportRequest request);
}

public interface IPdfExportService : IExportService { }
public interface IDocxExportService : IExportService { }

public class ExportRequest
{
    public string BaseUrl { get; set; } = string.Empty;
    public string PaperSize { get; set; } = "A4";
    public string Margin { get; set; } = "1cm";
    public bool IncludeProfileImage { get; set; } = true;
    public string Token { get; set; } = string.Empty;
}

public class ExportResult
{
    public byte[] FileData { get; set; } = Array.Empty<byte>();
    public string FileName { get; set; } = string.Empty;
    public string ContentType { get; set; } = string.Empty;
}
