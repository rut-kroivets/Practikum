using AutoMapper;
using Organization.Core.DTOs;
using Organization.Core.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organization.Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Employee, EmployeeDto>().ReverseMap();
            CreateMap<Position, PositionDto>().ReverseMap();
            CreateMap<Role, RoleDto>().ReverseMap();
        }

    }
}
