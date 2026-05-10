using CareerPilot.Application.Interfaces.Services;
using CareerPilot.Infrastructure.Services;
using Microsoft.Extensions.DependencyInjection;

namespace CareerPilot.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddScoped<IJwtService, JwtService>();
        services.AddScoped<IEmailService, EmailService>();
        
        return services;
    }
}
