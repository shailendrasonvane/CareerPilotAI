using CareerPilot.Application.Interfaces.Services;
using CareerPilot.Application.Mappings;
using CareerPilot.Application.Services;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace CareerPilot.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddAutoMapper(cfg => cfg.AddMaps(typeof(MappingProfile).Assembly));
        services.AddScoped<IAuthService, AuthService>();
        // services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
        
        return services;
    }
}
