using System;
using System.Collections.Generic;

namespace CarrierDomain.Models
{
    public class User : Entity
    {
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string FullName { get; set; }
        public string Website { get; set; }        
        public DateTime DateOfBirth { get; set; }        
        public DateTime LastActive { get; set; }
        public string CV { get; set; }
        public string MoreInfo { get; set; }
        public Guid CityId { get; set; }
        public City City { get; set; }       
        public string Section { get; set; }
        public string PhotoUrl { get; set; }     
        public UserType UserType { get; set; }   
    }
}