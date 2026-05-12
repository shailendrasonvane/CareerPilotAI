using AutoMapper;
using CareerPilot.Application.DTOs.Resume;
using CareerPilot.Application.Interfaces.Repositories;
using CareerPilot.Application.Interfaces.Services;
using CareerPilot.Domain.Entities;
using CareerPilot.Shared;
using Microsoft.EntityFrameworkCore;

namespace CareerPilot.Application.Services;

public class ResumeService : IResumeService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;

    public ResumeService(IUnitOfWork unitOfWork, IMapper mapper)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
    }

    public async Task<Result<ResumeDto>> CreateResumeAsync(int userId, CreateResumeRequest request)
    {
        var resume = new Resume
        {
            UserId = userId,
            Title = request.Title,
            ResumeSlug = $"{request.Title.ToLower().Replace(" ", "-")}-{Guid.NewGuid().ToString()[..8]}",
            PersonalDetails = new ResumePersonalDetails 
            { 
                FirstName = "", // Will be filled by user later or from profile
                LastName = "" 
            }
        };

        await _unitOfWork.Repository<Resume>().AddAsync(resume);
        await _unitOfWork.SaveChangesAsync();

        return Result<ResumeDto>.Success(_mapper.Map<ResumeDto>(resume));
    }

    public async Task<Result<ResumeDto>> GetResumeByIdAsync(int userId, int resumeId)
    {
        var resume = await _unitOfWork.Repository<Resume>()
            .GetQueryable()
            .Include(r => r.PersonalDetails)
            .Include(r => r.Experiences)
            .Include(r => r.Educations)
            .Include(r => r.Skills)
            .Include(r => r.Projects)
            .Include(r => r.Certificates)
            .Include(r => r.Languages)
            .Include(r => r.Awards)
            .Include(r => r.CustomSections)
            .FirstOrDefaultAsync(r => r.Id == resumeId && r.UserId == userId);

        if (resume == null) return Result<ResumeDto>.Failure("Resume not found");

        return Result<ResumeDto>.Success(_mapper.Map<ResumeDto>(resume));
    }

    public async Task<Result<List<ResumeDto>>> GetAllUserResumesAsync(int userId)
    {
        var resumes = await _unitOfWork.Repository<Resume>()
            .FindAsync(r => r.UserId == userId);
        
        return Result<List<ResumeDto>>.Success(_mapper.Map<List<ResumeDto>>(resumes));
    }

    public async Task<Result<ResumeDto>> UpdateResumeAsync(int userId, int resumeId, ResumeDto request)
    {
        var resume = await _unitOfWork.Repository<Resume>()
            .GetQueryable()
            .Include(r => r.PersonalDetails)
            .Include(r => r.Experiences)
            .Include(r => r.Educations)
            .Include(r => r.Skills)
            .Include(r => r.Projects)
            .Include(r => r.Certificates)
            .Include(r => r.Languages)
            .Include(r => r.Awards)
            .Include(r => r.CustomSections)
            .FirstOrDefaultAsync(r => r.Id == resumeId && r.UserId == userId);

        if (resume == null) return Result<ResumeDto>.Failure("Resume not found");

        // Update basic info
        _mapper.Map(request, resume);
        resume.UpdatedDate = DateTime.UtcNow;

        _unitOfWork.Repository<Resume>().Update(resume);
        await _unitOfWork.SaveChangesAsync();

        return Result<ResumeDto>.Success(_mapper.Map<ResumeDto>(resume));
    }

    public async Task<Result> DeleteResumeAsync(int userId, int resumeId)
    {
        var resume = await _unitOfWork.Repository<Resume>().GetByIdAsync(resumeId);
        if (resume == null || resume.UserId != userId) return Result.Failure("Resume not found");

        _unitOfWork.Repository<Resume>().Delete(resume);
        await _unitOfWork.SaveChangesAsync();

        return Result.Success("Resume deleted successfully");
    }

    public async Task<Result<ResumeDto>> DuplicateResumeAsync(int userId, int resumeId)
    {
        var original = await _unitOfWork.Repository<Resume>()
            .GetQueryable()
            .AsNoTracking()
            .Include(r => r.PersonalDetails)
            .Include(r => r.Experiences)
            .Include(r => r.Educations)
            .Include(r => r.Skills)
            .Include(r => r.Projects)
            .Include(r => r.Certificates)
            .Include(r => r.Languages)
            .Include(r => r.Awards)
            .Include(r => r.CustomSections)
            .FirstOrDefaultAsync(r => r.Id == resumeId && r.UserId == userId);

        if (original == null) return Result<ResumeDto>.Failure("Original resume not found");

        var duplicate = _mapper.Map<Resume>(original);
        duplicate.Id = 0;
        duplicate.Title = $"{original.Title} (Copy)";
        duplicate.ResumeSlug = $"{duplicate.Title.ToLower().Replace(" ", "-")}-{Guid.NewGuid().ToString()[..8]}";
        duplicate.CreatedDate = DateTime.UtcNow;
        duplicate.UpdatedDate = null;
        duplicate.IsDefault = false;

        // Reset IDs for all sub-entities
        if (duplicate.PersonalDetails != null) duplicate.PersonalDetails.Id = 0;
        foreach (var item in duplicate.Experiences) item.Id = 0;
        foreach (var item in duplicate.Educations) item.Id = 0;
        foreach (var item in duplicate.Skills) item.Id = 0;
        foreach (var item in duplicate.Projects) item.Id = 0;
        foreach (var item in duplicate.Certificates) item.Id = 0;
        foreach (var item in duplicate.Languages) item.Id = 0;
        foreach (var item in duplicate.Awards) item.Id = 0;
        foreach (var item in duplicate.CustomSections) item.Id = 0;

        await _unitOfWork.Repository<Resume>().AddAsync(duplicate);
        await _unitOfWork.SaveChangesAsync();

        return Result<ResumeDto>.Success(_mapper.Map<ResumeDto>(duplicate));
    }
}
