using CareerPilot.Application.DTOs.Resume;
using CareerPilot.Shared;

namespace CareerPilot.Application.Interfaces.Services;

public interface IResumeService
{
    Task<Result<ResumeDto>> CreateResumeAsync(int userId, CreateResumeRequest request);
    Task<Result<ResumeDto>> GetResumeByIdAsync(int userId, int resumeId);
    Task<Result<List<ResumeDto>>> GetAllUserResumesAsync(int userId);
    Task<Result<ResumeDto>> UpdateResumeAsync(int userId, int resumeId, ResumeDto request);
    Task<Result> DeleteResumeAsync(int userId, int resumeId);
    Task<Result<ResumeDto>> DuplicateResumeAsync(int userId, int resumeId);
    Task<Result<ResumeDto>> UpdateResumeTitleAsync(int userId, int resumeId, string title);
}
