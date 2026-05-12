namespace CareerPilot.Application.DTOs.Resume;

public class ResumeDto
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string ResumeSlug { get; set; } = string.Empty;
    public string? Summary { get; set; }
    public string? ThemeColor { get; set; }
    public string? FontFamily { get; set; }
    public bool IsDefault { get; set; }
    public bool IsPublic { get; set; }
    public DateTime CreatedDate { get; set; }
    public DateTime? UpdatedDate { get; set; }

    public PersonalDetailsDto? PersonalDetails { get; set; }
    public List<ExperienceDto> Experiences { get; set; } = new();
    public List<EducationDto> Educations { get; set; } = new();
    public List<SkillDto> Skills { get; set; } = new();
    public List<ProjectDto> Projects { get; set; } = new();
    public List<CertificateDto> Certificates { get; set; } = new();
    public List<LanguageDto> Languages { get; set; } = new();
    public List<AwardDto> Awards { get; set; } = new();
    public List<CustomSectionDto> CustomSections { get; set; } = new();
}

public class CreateResumeRequest
{
    public string Title { get; set; } = string.Empty;
}

public class UpdateResumeRequest
{
    public string Title { get; set; } = string.Empty;
    public string? Summary { get; set; }
    public string? ThemeColor { get; set; }
    public string? FontFamily { get; set; }
    public bool IsDefault { get; set; }
    public bool IsPublic { get; set; }
}

public class PersonalDetailsDto
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string? JobTitle { get; set; }
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    public string? LinkedInUrl { get; set; }
    public string? GitHubUrl { get; set; }
    public string? PortfolioUrl { get; set; }
    public string? ProfileImageUrl { get; set; }
    public string? ProfessionalSummary { get; set; }
}

public class ExperienceDto
{
    public int Id { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string? Location { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsCurrentJob { get; set; }
    public string? Description { get; set; }
    public int DisplayOrder { get; set; }
}

public class EducationDto
{
    public int Id { get; set; }
    public string InstitutionName { get; set; } = string.Empty;
    public string Degree { get; set; } = string.Empty;
    public string? FieldOfStudy { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Grade { get; set; }
    public string? Description { get; set; }
    public int DisplayOrder { get; set; }
}

public class SkillDto
{
    public int Id { get; set; }
    public string SkillName { get; set; } = string.Empty;
    public string? SkillLevel { get; set; }
    public string? Category { get; set; }
    public int DisplayOrder { get; set; }
}

public class ProjectDto
{
    public int Id { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public string? Technologies { get; set; }
    public string? ProjectUrl { get; set; }
    public string? GitHubUrl { get; set; }
    public string? Description { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int DisplayOrder { get; set; }
}

public class CertificateDto
{
    public int Id { get; set; }
    public string CertificateName { get; set; } = string.Empty;
    public string IssuingOrganization { get; set; } = string.Empty;
    public DateTime? IssueDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public string? CredentialId { get; set; }
    public string? CredentialUrl { get; set; }
    public string? Description { get; set; }
    public int DisplayOrder { get; set; }
}

public class LanguageDto
{
    public int Id { get; set; }
    public string LanguageName { get; set; } = string.Empty;
    public string? ProficiencyLevel { get; set; }
    public int DisplayOrder { get; set; }
}

public class AwardDto
{
    public int Id { get; set; }
    public string AwardTitle { get; set; } = string.Empty;
    public string Organization { get; set; } = string.Empty;
    public DateTime? AwardDate { get; set; }
    public string? Description { get; set; }
    public int DisplayOrder { get; set; }
}

public class CustomSectionDto
{
    public int Id { get; set; }
    public string SectionTitle { get; set; } = string.Empty;
    public string SectionContent { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}
