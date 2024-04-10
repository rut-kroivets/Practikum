using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Organization.Core.Entity
{
    public enum Gender
    {
        Male=1,
        Female
    }
    public class Employee
    {
        public int Id { get; set; }
        public string Identity { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartOfWork { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public List<Position> Positions { get; set; }
        public bool Status { get; set; } = true;
    }
}
