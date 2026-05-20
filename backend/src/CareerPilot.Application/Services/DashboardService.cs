using CareerPilot.Application.DTOs.Dashboard;
using CareerPilot.Application.Interfaces.Repositories;
using CareerPilot.Application.Interfaces.Services;
using CareerPilot.Domain.Entities;
using CareerPilot.Shared;
using Microsoft.EntityFrameworkCore;

namespace CareerPilot.Application.Services;

public class DashboardService : IDashboardService
{
    private readonly IUnitOfWork _unitOfWork;

    public DashboardService(IUnitOfWork unitOfWork)
    {
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<DashboardOverviewDto>> GetOverviewAsync(int userId)
    {
        var totalResumes = await _unitOfWork.Repository<Resume>()
            .GetQueryable()
            .CountAsync(r => r.UserId == userId);

        var overview = new DashboardOverviewDto
        {
            TotalResumes = totalResumes,
            ApplicationsSent = null,
            InterviewInvites = null
        };

        return Result<DashboardOverviewDto>.Success(overview);
    }
}
