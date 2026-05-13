using CareerPilot.Domain.Common;

namespace CareerPilot.Domain.Entities;

public class ResumeTemplate : BaseEntity
{
    public string TemplateName { get; set; } = string.Empty;
    public string TemplateKey { get; set; } = string.Empty;
    public string? PreviewImageUrl { get; set; }
    public bool IsPremium { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    // Navigation Property
    public ICollection<Resume> Resumes { get; set; } = new List<Resume>();
}
