using System.Collections.Generic;
using AutoMapper;
using CarrierAPI.Dtos;
using CarrierDomain.Models;

namespace CarrierAPI.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Employee, UserForDetailedDto>()
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Employee, WholeUserData>();
        }
    }
}