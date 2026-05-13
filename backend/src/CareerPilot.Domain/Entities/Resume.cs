using CareerPilot.Domain.Common;

namespace CareerPilot.Domain.Entities;

public class Resume : BaseEntity
{
    public int UserId { get; set; }
    public User User { get; set; } = null!;

    public string Title { get; set; } = string.Empty;
    public string ResumeSlug { get; set; } = string.Empty;
    public string? Summary { get; set; }
    public int? TemplateId { get; set; }
    public ResumeTemplate? Template { get; set; }

    public string? ThemeColor { get; set; }
    public string? FontFamily { get; set; }
    public string? FontSize { get; set; } = "medium";
    public int SectionSpacing { get; set; } = 20;
    public int LayoutSpacing { get; set; } = 40;

    public bool IsDefault { get; set; }
    public bool IsPublic { get; set; }

    // Navigation Properties
    public ResumePersonalDetails PersonalDetails { get; set; } = null!;
    public ICollection<ResumeExperience> Experiences { get; set; } = new List<ResumeExperience>();
    public ICollection<ResumeEducation> Educations { get; set; } = new List<ResumeEducation>();
    public ICollection<ResumeSkill> Skills { get; set; } = new List<ResumeSkill>();
    public ICollection<ResumeProject> Projects { get; set; } = new List<ResumeProject>();
    public ICollection<ResumeCertificate> Certificates { get; set; } = new List<ResumeCertificate>();
    public ICollection<ResumeLanguage> Languages { get; set; } = new List<ResumeLanguage>();
    public ICollection<ResumeAward> Awards { get; set; } = new List<ResumeAward>();
    public ICollection<ResumeCustomSection> CustomSections { get; set; } = new List<ResumeCustomSection>();
}
