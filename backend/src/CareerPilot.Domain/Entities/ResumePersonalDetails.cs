using CareerPilot.Domain.Common;

namespace CareerPilot.Domain.Entities;

public class ResumePersonalDetails : BaseEntity
{
    public int ResumeId { get; set; }
    public Resume Resume { get; set; } = null!;

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
