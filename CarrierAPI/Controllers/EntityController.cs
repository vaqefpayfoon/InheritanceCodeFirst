using System.Threading.Tasks;
using CarrierAPI.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace CarrierAPI.Controllers 
{
    [Route ("api/[controller]")]
    [ApiController]
    [AllowAnonymous]
    public class EntityController : ControllerBase 
    {
        private readonly IEntityRepository _repo;
        public EntityController (IEntityRepository repo) 
        {
            _repo = repo;
        }

        [HttpGet("GetCities")]
        public async Task<IActionResult> GetCities() 
        {        
            var cities = await _repo.GetCities();
            return Ok (cities);
        }
        [HttpGet("GetCity")]
        public async Task<IActionResult> GetCity(string key) 
        {        
            var cities = await _repo.GetCities();
            var city = cities.FirstOrDefault(woak => woak.CityName == key);
            return Ok (city);
        }
        //[HttpGet("{key}", Name = "filteredCities")]
        [HttpGet("filteredCities")]
        public async Task<IActionResult> filteredCities(string key) 
        {        
            var cities = await _repo.GetCities(key);
            IEnumerable<string> CityName = cities.Select(a => a.CityName);
            string output = JsonConvert.SerializeObject(CityName);
            return Ok (output);
        }
        [HttpGet("GetCarriers")]
        public async Task<IActionResult> GetCarriers() 
        {        
            var carriers = await _repo.GetCarriers();
            return Ok (carriers);
        }
        [HttpGet("GetUniversities")]
        public async Task<IActionResult> GetUniversities() 
        {        
            var universities = await _repo.GetUniversities();
            return Ok (universities);
        }
        [HttpGet("GetSalaries")]
        public async Task<IActionResult> GetSalaries() 
        {        
            var salaries = await _repo.GetSalaries();
            return Ok (salaries);
        }
        [HttpGet("GetCountries")]
        public async Task<IActionResult> GetCountries() 
        {        
            var countries = await _repo.GetCountries();
            return Ok (countries);
        }
    }
}