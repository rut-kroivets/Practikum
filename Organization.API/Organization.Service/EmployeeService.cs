using Microsoft.AspNetCore.Mvc;
using Organization.Core.Entity;
using Organization.Core.Repository;
using Organization.Core.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organization.Service
{
    public class EmployeeService :IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        public EmployeeService(IEmployeeRepository context)
        {
            _employeeRepository = context;
        }
        public async Task<IEnumerable<Employee>> GetAsync()
        {
            return await _employeeRepository.GetAsync();
        }

        public async Task<Employee> GetAsync(int id)
        {
            return await _employeeRepository.GetAsync(id);
        }

        public async Task<Employee> PostAsync(Employee e)
        {
            return await _employeeRepository.PostAsync(e);
        }

        public async Task PutAsync(int id, Employee e)
        {
            await _employeeRepository.PutAsync(id, e);
        }

        public async Task DeleteAsync(int id)
        {
            await _employeeRepository.DeleteAsync(id);
        }
    }
}
