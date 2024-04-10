using Organization.Core.Entity;

namespace Organization.API.Models
{
    public class EmployeePostModel
    {
        public string Identity { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime StartOfWork { get; set; }
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
    }
}
