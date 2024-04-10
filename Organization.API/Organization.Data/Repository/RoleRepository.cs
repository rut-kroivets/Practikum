using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Organization.Core.Entity;
using Organization.Core.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organization.Data.Repository
{
    public class RoleRepository:IRoleRepository
    {
        private readonly DataContext _dataContext;
        public RoleRepository(DataContext context)
        {
            _dataContext = context;
        }

        public async Task<IEnumerable<Role>> GetAsync()
        {
            return await _dataContext.roles.ToListAsync();
        }

        public async Task<Role> GetAsync(int id)
        {
            return await _dataContext.roles.FindAsync(id);
        }

        public async Task<Role> PostAsync(Role r)
        {
            _dataContext.roles.Add(r);
            await _dataContext.SaveChangesAsync();
            return r;
        }

        public async Task PutAsync(int id, Role r)
        {
            var role = _dataContext.roles.Find(id);
            role.Name = r.Name;
            await _dataContext.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var role = _dataContext.roles.Find(id);
            _dataContext.roles.Remove(role);
            await _dataContext.SaveChangesAsync();
        }
    }
}
