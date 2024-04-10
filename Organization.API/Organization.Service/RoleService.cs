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
    public class RoleService:IRoleService
    {
        private readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository context)
        {
            _roleRepository = context;
        }
        public async Task<IEnumerable<Role>> GetAsync()
        {
            return await _roleRepository.GetAsync();
        }

        public async Task<Role> GetAsync(int id)
        {
            return await _roleRepository.GetAsync(id);
        }

        public async Task<Role> PostAsync(Role r)
        {
            return await _roleRepository.PostAsync(r);
        }

        public async Task PutAsync(int id, Role r)
        {
            await _roleRepository.PutAsync(id, r);
        }

        public async Task DeleteAsync(int id)
        {
            await _roleRepository.DeleteAsync(id);
        }
    }
}
