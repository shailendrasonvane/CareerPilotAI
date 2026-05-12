using CareerPilot.Domain.Common;

namespace CareerPilot.Domain.Entities;

public class ResumeExperience : BaseEntity
{
    public int ResumeId { get; set; }
    public Resume Resume { get; set; } = null!;

    public string CompanyName { get; set; } = string.Empty;
    public string Position { get; set; } = string.Empty;
    public string? Location { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public bool IsCurrentJob { get; set; }
    public string? Description { get; set; }
    public int DisplayOrder { get; set; }
}

public class ResumeEducation : BaseEntity
{
    public int ResumeId { get; set; }
    public Resume Resume { get; set; } = null!;

    public string InstitutionName { get; set; } = string.Empty;
    public string Degree { get; set; } = string.Empty;
    public string? FieldOfStudy { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? Grade { get; set; }
    public string? Description { get; set; }
    public int DisplayOrder { get; set; }
}

public class ResumeSkill : BaseEntity
{
    public int ResumeId { get; set; }
    public Resume Resume { get; set; } = null!;

    public string SkillName { get; set; } = string.Empty;
    public string? SkillLevel { get; set; } // Beginner, Intermediate, Expert
    public string? Category { get; set; } // Technical, Soft
    public int DisplayOrder { get; set; }
}

public class ResumeProject : BaseEntity
{
    public int ResumeId { get; set; }
    public Resume Resume { get; set; } = null!;

    public string ProjectName { get; set; } = string.Empty;
    public string? Technologies { get; set; }
    public string? ProjectUrl { get; set; }
    public string? GitHubUrl { get; set; }
    public string? Description { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int DisplayOrder { get; set; }
}
