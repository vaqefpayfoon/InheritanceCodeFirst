using System;
using System.Collections.Generic;

namespace CarrierDomain.Models
{
    public class Employee : User
    {
        public string Email { get; set; }
        public string Phone { get; set; }
        public Gender Gender { get; set; }        
        public Guid SalaryId { get; set; }
        public Guid CarrierId { get; set; }
        public Guid UniversityId { get; set; }
        public Salary Salary { get; set; }
        public University University { get; set; }
        public string UniversityInfo { get; set; }
        public Carrier Carrier { get; set; }
        public IEnumerable<EmployeeSkill> EmployeeSkills { get; set; }
    }
}