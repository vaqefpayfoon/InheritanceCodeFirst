using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarrierDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace CarrierAPI.Data {
    public class EntityRepository : IEntityRepository {
        private readonly DataContext _context;
        public EntityRepository (DataContext context) 
        {
            _context = context;
        }
        public void Add<T> (T entity) where T : class {
            throw new System.NotImplementedException ();
        }

        public void Delete<T> (T entity) where T : class {
            throw new System.NotImplementedException ();
        }

        public async Task<IEnumerable<Carrier>> GetCarriers()
        {
            return await _context.Carriers.ToListAsync();
        }

        public async Task<IEnumerable<City>> GetCities () 
        {
            return await _context.Cities.ToListAsync();
        }
        public async Task<IEnumerable<City>> GetCities (string name) 
        {
            return await _context.Cities.Where(woak => woak.CityName.ToLower().Contains(name.ToLower())).ToListAsync();
        }
        public async Task<IEnumerable<Country>> GetCountries()
        {
            return await _context.Countries.ToListAsync();
        }

        public async Task<IEnumerable<Salary>> GetSalaries()
        {
            return await _context.Salaries.ToListAsync();
        }

        public async Task<IEnumerable<University>> GetUniversities()
        {
            return await _context.Universities.ToListAsync();
        }

        public Task<bool> SaveAll () {
            throw new System.NotImplementedException ();
        }
    }
}