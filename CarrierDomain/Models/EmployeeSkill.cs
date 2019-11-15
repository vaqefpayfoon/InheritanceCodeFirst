using System;

namespace CarrierDomain.Models
{
    public class EmployeeSkill : Entity
    {
        public Guid UserId { get; set; }
        public Guid SkillId { get; set; }
        public Employee Employee { get; set; }
        public Skill Skill { get; set; }
    }
}