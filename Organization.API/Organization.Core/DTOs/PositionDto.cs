using Organization.Core.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organization.Core.DTOs
{
    public class PositionDto
    {
        public int Id { get; set; }
        public Role Role { get; set; }
        public bool IsAdmin { get; set; }
        public DateTime EnterDate { get; set; }
        public int EmployeeId { get; set; }
    }
}
