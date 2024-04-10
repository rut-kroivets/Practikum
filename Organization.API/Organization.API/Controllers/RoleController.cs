using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Organization.API.Models;
using Organization.Core.DTOs;
using Organization.Core.Entity;
using Organization.Core.Service;
using Organization.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Organization.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;
        public RoleController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }

        // GET: api/<RoleController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> Get()
        {
            var list = await _roleService.GetAsync();
            var listDto = _mapper.Map<IEnumerable<RoleDto>>(list);

            return Ok(listDto);
        }

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> Get(int id)
        {
            var role = await _roleService.GetAsync(id);
            var roleDto = _mapper.Map<RoleDto>(role);
            return Ok(roleDto);
        }
        // POST api/<RoleController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Role>> Post([FromBody] RolePostModel value)
        {
            var role = _mapper.Map<Role>(value);
            await _roleService.PostAsync(role);
            var roleDto = _mapper.Map<RoleDto>(role);
            return Ok(roleDto);
        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] RolePostModel value)
        {
            Role existPosition = await _roleService.GetAsync(id);

            if (existPosition is null)
            {
                return NotFound();
            }
            _mapper.Map(value, existPosition);

            await _roleService.PutAsync(id, existPosition);

            return Ok(_mapper.Map<RoleDto>(existPosition));
        }

        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _roleService.DeleteAsync(id);
        }
    }
}
