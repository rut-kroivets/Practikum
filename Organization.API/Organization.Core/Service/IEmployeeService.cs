using Microsoft.AspNetCore.Mvc;
using Organization.Core.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organization.Core.Service
{
    public interface IEmployeeService
    {
        public Task<IEnumerable<Employee>> GetAsync();
        public Task<Employee> GetAsync(int id);
        public Task<Employee> PostAsync(Employee e);
        public Task PutAsync(int id, Employee e);
        public Task DeleteAsync(int id);
    }
}
