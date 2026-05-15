using CareerPilot.Application.Interfaces.Services;
using CareerPilot.Infrastructure.Models;
using CareerPilot.Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace CareerPilot.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
        
        services.AddScoped<IJwtService, JwtService>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddScoped<IPdfExportService, PdfExportService>();
        services.AddScoped<IDocxExportService, DocxExportService>();
        
        return services;
    }
}
