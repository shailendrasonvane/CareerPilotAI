using AutoMapper;
using CareerPilot.Application.DTOs.Resume;
using CareerPilot.Application.Interfaces.Repositories;
using CareerPilot.Application.Interfaces.Services;

namespace CareerPilot.Application.Services;

public class ResumeTemplateService : IResumeTemplateService
{
    private readonly IResumeTemplateRepository _templateRepository;
    private readonly IMapper _mapper;

    public ResumeTemplateService(IResumeTemplateRepository templateRepository, IMapper mapper)
    {
        _templateRepository = templateRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ResumeTemplateDto>> GetAllTemplatesAsync()
    {
        var templates = await _templateRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<ResumeTemplateDto>>(templates);
    }

    public async Task<ResumeTemplateDto?> GetTemplateByIdAsync(int id)
    {
        var template = await _templateRepository.GetByIdAsync(id);
        return _mapper.Map<ResumeTemplateDto>(template);
    }
}
