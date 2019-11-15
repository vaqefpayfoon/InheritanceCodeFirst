using System.Collections.Generic;

namespace CarrierDomain.Models
{
    public class Employer : User
    {
        public string Address { get; set; }
        public IEnumerable<Advertisement> Advertisements { get; set; }
    }
}