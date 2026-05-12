using CareerPilot.Domain.Common;

namespace CareerPilot.Domain.Entities;

public class ResumeCertificate : BaseEntity
{
    public int ResumeId { get; set; }
    public Resume Resume { get; set; } = null!;

    public string CertificateName { get; set; } = string.Empty;
    public string IssuingOrganization { get; set; } = string.Empty;
    public DateTime? IssueDate { get; set; }
    public DateTime? ExpiryDate { get; set; }
    public string? CredentialId { get; set; }
    public string? CredentialUrl { get; set; }
    public string? Description { get; set; }
    public int DisplayOrder { get; set; }
}

public class ResumeLanguage : BaseEntity
{
    public int ResumeId { get; set; }
    public Resume Resume { get; set; } = null!;

    public string LanguageName { get; set; } = string.Empty;
    public string? ProficiencyLevel { get; set; } // Native, Fluent, etc.
    public int DisplayOrder { get; set; }
}

public class ResumeAward : BaseEntity
{
    public int ResumeId { get; set; }
    public Resume Resume { get; set; } = null!;

    public string AwardTitle { get; set; } = string.Empty;
    public string Organization { get; set; } = string.Empty;
    public DateTime? AwardDate { get; set; }
    public string? Description { get; set; }
    public int DisplayOrder { get; set; }
}

public class ResumeCustomSection : BaseEntity
{
    public int ResumeId { get; set; }
    public Resume Resume { get; set; } = null!;

    public string SectionTitle { get; set; } = string.Empty;
    public string SectionContent { get; set; } = string.Empty;
    public int DisplayOrder { get; set; }
}
