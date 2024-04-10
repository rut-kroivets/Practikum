using Microsoft.AspNetCore.Mvc;
using Organization.Core.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organization.Core.Service
{
    public interface IRoleService
    {
        public Task<IEnumerable<Role>> GetAsync();
        public Task<Role> GetAsync(int id);
        public Task<Role> PostAsync(Role r);
        public Task PutAsync(int id, Role r);
        public Task DeleteAsync(int id);
    }
}
