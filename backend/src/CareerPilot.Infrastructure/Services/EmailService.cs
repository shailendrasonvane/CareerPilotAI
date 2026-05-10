using CareerPilot.Application.Interfaces.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace CareerPilot.Infrastructure.Services;

public class EmailService : IEmailService
{
    private readonly IConfiguration _configuration;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
    {
        _configuration = configuration;
        _logger = logger;
    }

    public Task SendEmailAsync(string to, string subject, string body)
    {
        // For development purposes, log the email content instead of sending it.
        // A real SMTP client would go here.
        _logger.LogInformation("================ EMAIL SENT ================");
        _logger.LogInformation($"To: {to}");
        _logger.LogInformation($"Subject: {subject}");
        _logger.LogInformation($"Body: {body}");
        _logger.LogInformation("============================================");

        return Task.CompletedTask;
    }
}
