using CareerPilot.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace CareerPilot.Persistence.Context;

public class CareerPilotDbContext : DbContext
{
    public CareerPilotDbContext(DbContextOptions<CareerPilotDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
    }
}
