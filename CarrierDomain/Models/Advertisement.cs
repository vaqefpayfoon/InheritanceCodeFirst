using System;

namespace CarrierDomain.Models
{
    public class Advertisement : Entity
    {
        public Guid CarrierId { get; set; }
        public Carrier Carrier { get; set; }
        public string AdvertisementTitle { get; set; }
        public string AdvertisementPassage { get; set; }
        public string Position { get; set; }
        public bool ActiveAdv { get; set; }
        public Guid UserId { get; set; }
        public Employer Employer { get; set; }
        
    }
}