using CareerPilot.Application.Interfaces.Repositories;
using CareerPilot.Persistence.Context;
using CareerPilot.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CareerPilot.Persistence;

public static class DependencyInjection
{
    public static IServiceCollection AddPersistence(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("CareerPilotConnection");
        
        // If database name is empty, use CareerPilotAI_DB
        if (connectionString != null && connectionString.Contains("Database=;"))
        {
            connectionString = connectionString.Replace("Database=;", "Database=CareerPilotAI_DB;");
        }

        services.AddDbContext<CareerPilotDbContext>(options =>
            options.UseSqlServer(connectionString));

        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

        return services;
    }
}
