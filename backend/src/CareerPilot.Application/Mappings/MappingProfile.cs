using AutoMapper;
using CareerPilot.Application.DTOs.Auth;
using CareerPilot.Domain.Entities;

namespace CareerPilot.Application.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDto>();
    }
}
