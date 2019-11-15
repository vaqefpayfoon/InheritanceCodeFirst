using System.ComponentModel.DataAnnotations;
using System;
using CarrierDomain.Models;

namespace CarrierAPI.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify a password between 4 and 8 characters")]
        public string Password { get; set; }
        [Required]
        public string FullName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Phone { get; set; }
        public string Website { get; set; }        
        [Required]
        public DateTime DateOfBirth { get; set; }        
        public DateTime LastActive { get; set; }
        public DateTime CreateAt { get; set; }
        [Required]
        public string CV { get; set; }
        public string MoreInfo { get; set; }
        [Required]
        public Guid CityId { get; set; }
        public string Section { get; set; }
        public string PhotoUrl { get; set; }     
        public UserType UserType { get; set; }
        public string Address { get; set; }
        [Required]        
        public Gender Gender { get; set; }        
        [Required]
        public Guid SalaryId { get; set; }
        [Required]
        public Guid CarrierId { get; set; }
        [Required]
        public Guid UniversityId { get; set; }

        public UserForRegisterDto()
        {
            CreateAt = DateTime.Now;
            LastActive = DateTime.Now;
        }
    }
}