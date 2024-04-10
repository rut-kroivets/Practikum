using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Organization.API.Models;
using Organization.Core.DTOs;
using Organization.Core.Entity;
using Organization.Core.Service;
using Organization.Service;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Organization.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> Get()
        {
            var list = await _employeeService.GetAsync();
            var listDto = _mapper.Map<IEnumerable<EmployeeDto>>(list);

            return Ok(listDto);
        }
        // GET: api/<ValuesController>
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> Get(int id)
        {
            var employee = await _employeeService.GetAsync(id);
            var employeeDto = _mapper.Map<EmployeeDto>(employee);
            return Ok(employeeDto);
        }
        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<ActionResult<Employee>> Post([FromBody] EmployeePostModel value)
        {
            var employee = _mapper.Map<Employee>(value);
            await _employeeService.PostAsync(employee);
            var employeeDto = _mapper.Map<EmployeeDto>(employee);
            return Ok(employeeDto);
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel value)
        {
            Employee existPosition = await _employeeService.GetAsync(id);

            if (existPosition is null)
            {
                return NotFound();
            }
            _mapper.Map(value, existPosition);

            await _employeeService.PutAsync(id, existPosition);

            return Ok(_mapper.Map<EmployeeDto>(existPosition));
        }


        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _employeeService.DeleteAsync(id);
        }
    }
}
