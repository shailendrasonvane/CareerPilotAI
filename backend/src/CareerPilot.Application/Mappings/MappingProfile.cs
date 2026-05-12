using AutoMapper;
using CareerPilot.Application.DTOs.Auth;
using CareerPilot.Application.DTOs.Resume;
using CareerPilot.Domain.Entities;

namespace CareerPilot.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>().ReverseMap();
        
        CreateMap<Resume, ResumeDto>().ReverseMap();
        CreateMap<ResumePersonalDetails, PersonalDetailsDto>().ReverseMap();
        CreateMap<ResumeExperience, ExperienceDto>().ReverseMap();
        CreateMap<ResumeEducation, EducationDto>().ReverseMap();
        CreateMap<ResumeSkill, SkillDto>().ReverseMap();
        CreateMap<ResumeProject, ProjectDto>().ReverseMap();
        CreateMap<ResumeCertificate, CertificateDto>().ReverseMap();
        CreateMap<ResumeLanguage, LanguageDto>().ReverseMap();
        CreateMap<ResumeAward, AwardDto>().ReverseMap();
        CreateMap<ResumeCustomSection, CustomSectionDto>().ReverseMap();
    }
}
