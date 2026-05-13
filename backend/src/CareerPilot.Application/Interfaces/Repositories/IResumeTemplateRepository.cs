using CareerPilot.Domain.Entities;

namespace CareerPilot.Application.Interfaces.Repositories;

public interface IResumeTemplateRepository
{
    Task<IEnumerable<ResumeTemplate>> GetAllAsync();
    Task<ResumeTemplate?> GetByIdAsync(int id);
    Task<ResumeTemplate?> GetByKeyAsync(string key);
}
