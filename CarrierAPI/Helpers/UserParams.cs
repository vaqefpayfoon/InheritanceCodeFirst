using System;
using CarrierDomain.Models;

namespace CarrierAPI.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }
        public Guid UserId { get; set; }
        public string OrderBy { get; set; }
        public Gender Gender { get; set; }
    }
}