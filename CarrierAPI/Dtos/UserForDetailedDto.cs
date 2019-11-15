using System;
using CarrierDomain.Models;

namespace CarrierAPI.Dtos
{
    public class UserForDetailedDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Website { get; set; }        
        public int Age { get; set; }        
        public DateTime LastActive { get; set; }
        public string CV { get; set; }
        public string MoreInfo { get; set; }
        public string Section { get; set; }
        public string PhotoUrl { get; set; }     
        public string UserType { get; set; }
        public string Address { get; set; }
        public Guid CityId { get; set; }
        public Guid CountryId { get; set; }
        public Guid UniversityId { get; set; }
        public Guid GenderId { get; set; }
        public Guid CarrierId { get; set; }
        public Guid SalaryId { get; set; }
        public string UniversityInfo { get; set; }
    }
}