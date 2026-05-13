using CareerPilot.Application.DTOs.Resume;

namespace CareerPilot.Application.Interfaces.Services;

public interface IResumeTemplateService
{
    Task<IEnumerable<ResumeTemplateDto>> GetAllTemplatesAsync();
    Task<ResumeTemplateDto?> GetTemplateByIdAsync(int id);
}
