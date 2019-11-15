using CarrierDomain.Models;

namespace CarrierAPI.Dtos
{
    public class UsersFullData
    {
        public User User { get; set; }
        public Employee Employee { get; set; }
        public Employer Employer { get; set; }
        public string Password { get; set; }
    }
    public class EmployeeSave
    {
        public Employee WholeUserData { get; set; }
        public string Password { get; set; }
    }
    public class WholeUserData
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string FullName { get; set; }
        public string Website { get; set; }
        public string Age { get; set; }
        public string LastActive { get; set; }
        public string CV { get; set; }
        public string MoreInfo { get; set; }
        public string Section { get; set; }
        public string PhotoUrl { get; set; }
        public string userType { get; set; }
        public string CityId { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public string carrierId { get; set; }
        public string SalaryId { get; set; }
        public string UniversityId { get; set; }
        public string UniversityInfo { get; set; }
        public string Address { get; set; }
    }
}