using CareerPilot.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CareerPilot.Persistence.Context;

public class CareerPilotDbContext : DbContext
{
    public CareerPilotDbContext(DbContextOptions<CareerPilotDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Resume> Resumes { get; set; }
    public DbSet<ResumePersonalDetails> ResumePersonalDetails { get; set; }
    public DbSet<ResumeExperience> ResumeExperiences { get; set; }
    public DbSet<ResumeEducation> ResumeEducations { get; set; }
    public DbSet<ResumeSkill> ResumeSkills { get; set; }
    public DbSet<ResumeProject> ResumeProjects { get; set; }
    public DbSet<ResumeCertificate> ResumeCertificates { get; set; }
    public DbSet<ResumeLanguage> ResumeLanguages { get; set; }
    public DbSet<ResumeAward> ResumeAwards { get; set; }
    public DbSet<ResumeCustomSection> ResumeCustomSections { get; set; }
    public DbSet<ResumeTemplate> ResumeTemplates { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<ResumeTemplate>(entity =>
        {
            entity.HasKey(t => t.Id);
            entity.Property(t => t.TemplateName).IsRequired().HasMaxLength(100);
            entity.Property(t => t.TemplateKey).IsRequired().HasMaxLength(50);
        });

        modelBuilder.Entity<Resume>(entity =>
        {
            entity.HasIndex(r => r.ResumeSlug).IsUnique();
            entity.Property(r => r.Title).IsRequired().HasMaxLength(200);
            
            entity.HasOne(r => r.User)
                .WithMany(u => u.Resumes)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(r => r.Template)
                .WithMany(t => t.Resumes)
                .HasForeignKey(r => r.TemplateId)
                .OnDelete(DeleteBehavior.SetNull);
        });

        // Seed Templates
        modelBuilder.Entity<ResumeTemplate>().HasData(
            new ResumeTemplate { Id = 1, TemplateName = "Modern Professional", TemplateKey = "modern", PreviewImageUrl = "/templates/modern.png", IsPremium = false, IsActive = true, CreatedDate = new DateTime(2026, 5, 1) },
            new ResumeTemplate { Id = 2, TemplateName = "Corporate Classic", TemplateKey = "corporate", PreviewImageUrl = "/templates/corporate.png", IsPremium = false, IsActive = true, CreatedDate = new DateTime(2026, 5, 1) },
            new ResumeTemplate { Id = 3, TemplateName = "Minimalist Clean", TemplateKey = "minimal", PreviewImageUrl = "/templates/minimal.png", IsPremium = false, IsActive = true, CreatedDate = new DateTime(2026, 5, 1) },
            new ResumeTemplate { Id = 4, TemplateName = "Creative Edge", TemplateKey = "creative", PreviewImageUrl = "/templates/creative.png", IsPremium = true, IsActive = true, CreatedDate = new DateTime(2026, 5, 1) },
            new ResumeTemplate { Id = 5, TemplateName = "ATS Optimizer", TemplateKey = "ats", PreviewImageUrl = "/templates/ats.png", IsPremium = false, IsActive = true, CreatedDate = new DateTime(2026, 5, 1) }
        );

        modelBuilder.Entity<ResumePersonalDetails>(entity =>
        {
            entity.HasOne(pd => pd.Resume)
                .WithOne(r => r.PersonalDetails)
                .HasForeignKey<ResumePersonalDetails>(pd => pd.ResumeId)
                .OnDelete(DeleteBehavior.Cascade);
        });

        // Configure cascade delete for other components
        modelBuilder.Entity<ResumeExperience>().HasOne(e => e.Resume).WithMany(r => r.Experiences).HasForeignKey(e => e.ResumeId).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<ResumeEducation>().HasOne(e => e.Resume).WithMany(r => r.Educations).HasForeignKey(e => e.ResumeId).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<ResumeSkill>().HasOne(s => s.Resume).WithMany(r => r.Skills).HasForeignKey(s => s.ResumeId).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<ResumeProject>().HasOne(p => p.Resume).WithMany(r => r.Projects).HasForeignKey(p => p.ResumeId).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<ResumeCertificate>().HasOne(c => c.Resume).WithMany(r => r.Certificates).HasForeignKey(c => c.ResumeId).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<ResumeLanguage>().HasOne(l => l.Resume).WithMany(r => r.Languages).HasForeignKey(l => l.ResumeId).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<ResumeAward>().HasOne(a => a.Resume).WithMany(r => r.Awards).HasForeignKey(a => a.ResumeId).OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<ResumeCustomSection>().HasOne(cs => cs.Resume).WithMany(r => r.CustomSections).HasForeignKey(cs => cs.ResumeId).OnDelete(DeleteBehavior.Cascade);
    }
}
