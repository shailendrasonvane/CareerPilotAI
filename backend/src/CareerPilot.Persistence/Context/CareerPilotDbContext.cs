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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();

        modelBuilder.Entity<Resume>(entity =>
        {
            entity.HasIndex(r => r.ResumeSlug).IsUnique();
            entity.Property(r => r.Title).IsRequired().HasMaxLength(200);
            
            entity.HasOne(r => r.User)
                .WithMany(u => u.Resumes)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);
        });

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
