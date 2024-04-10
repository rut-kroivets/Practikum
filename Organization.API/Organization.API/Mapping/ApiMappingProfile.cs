using AutoMapper;
using AutoMapper.Execution;
using Organization.API.Models;
using Organization.Core.Entity;

namespace Organization.API.Mapping
{
    public class ApiMappingProfile : Profile
    {
        public ApiMappingProfile()
        {
            CreateMap<EmployeePostModel, Employee>();
            CreateMap<PositionPostModel, Position>();
            CreateMap<RolePostModel, Role>();
        }
    }
}
