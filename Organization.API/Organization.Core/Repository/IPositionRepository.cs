using Microsoft.AspNetCore.Mvc;
using Organization.Core.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organization.Core.Repository
{
    public interface IPositionRepository
    {
        public Task<IEnumerable<Position>> GetAsync();
        public Task<Position> GetAsync(int id);
        public Task<Position> PostAsync(Position p);
        public Task PutAsync(int id, Position p);
        public Task DeleteAsync(int id);
    }
}
