
using System.Collections.Generic;

namespace CarrierDomain.Models
{
    public class Skill : Entity
    {
        public string SkillTitle { get; set; }
        public IEnumerable<EmployeeSkill> EmployeeSkills { get; set; }
    }
}