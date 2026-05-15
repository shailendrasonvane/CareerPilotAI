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
        
        // Deep copy mapping for duplication
        CreateMap<Resume, Resume>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.User, opt => opt.Ignore())
            .ForMember(dest => dest.UserId, opt => opt.Ignore())
            .ForMember(dest => dest.CreatedDate, opt => opt.Ignore())
            .ForMember(dest => dest.UpdatedDate, opt => opt.Ignore())
            .ForMember(dest => dest.ResumeSlug, opt => opt.Ignore())
            .ForMember(dest => dest.Template, opt => opt.Ignore());

        CreateMap<ResumePersonalDetails, ResumePersonalDetails>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Resume, opt => opt.Ignore())
            .ForMember(dest => dest.ResumeId, opt => opt.Ignore());

        CreateMap<ResumeExperience, ResumeExperience>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Resume, opt => opt.Ignore())
            .ForMember(dest => dest.ResumeId, opt => opt.Ignore());

        CreateMap<ResumeEducation, ResumeEducation>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Resume, opt => opt.Ignore())
            .ForMember(dest => dest.ResumeId, opt => opt.Ignore());

        CreateMap<ResumeSkill, ResumeSkill>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Resume, opt => opt.Ignore())
            .ForMember(dest => dest.ResumeId, opt => opt.Ignore());

        CreateMap<ResumeProject, ResumeProject>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Resume, opt => opt.Ignore())
            .ForMember(dest => dest.ResumeId, opt => opt.Ignore());

        CreateMap<ResumeCertificate, ResumeCertificate>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Resume, opt => opt.Ignore())
            .ForMember(dest => dest.ResumeId, opt => opt.Ignore());

        CreateMap<ResumeLanguage, ResumeLanguage>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Resume, opt => opt.Ignore())
            .ForMember(dest => dest.ResumeId, opt => opt.Ignore());

        CreateMap<ResumeAward, ResumeAward>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Resume, opt => opt.Ignore())
            .ForMember(dest => dest.ResumeId, opt => opt.Ignore());

        CreateMap<ResumeCustomSection, ResumeCustomSection>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.Resume, opt => opt.Ignore())
            .ForMember(dest => dest.ResumeId, opt => opt.Ignore());

        CreateMap<ResumePersonalDetails, PersonalDetailsDto>().ReverseMap();
        CreateMap<ResumeExperience, ExperienceDto>().ReverseMap();
        CreateMap<ResumeEducation, EducationDto>().ReverseMap();
        CreateMap<ResumeSkill, SkillDto>().ReverseMap();
        CreateMap<ResumeProject, ProjectDto>().ReverseMap();
        CreateMap<ResumeCertificate, CertificateDto>().ReverseMap();
        CreateMap<ResumeLanguage, LanguageDto>().ReverseMap();
        CreateMap<ResumeAward, AwardDto>().ReverseMap();
        CreateMap<ResumeCustomSection, CustomSectionDto>().ReverseMap();
        CreateMap<ResumeTemplate, ResumeTemplateDto>().ReverseMap();
    }
}
