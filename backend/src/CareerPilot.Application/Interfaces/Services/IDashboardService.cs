using CareerPilot.Application.DTOs.Dashboard;
using CareerPilot.Shared;

namespace CareerPilot.Application.Interfaces.Services;

public interface IDashboardService
{
    Task<Result<DashboardOverviewDto>> GetOverviewAsync(int userId);
}
