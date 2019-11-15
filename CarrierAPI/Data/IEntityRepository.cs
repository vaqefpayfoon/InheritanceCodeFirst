using System.Collections.Generic;
using System.Threading.Tasks;
using CarrierDomain.Models;

namespace CarrierAPI.Data
{
    public interface IEntityRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<IEnumerable<City>> GetCities();
         Task<IEnumerable<City>> GetCities(string name);
         Task<IEnumerable<Carrier>> GetCarriers();
         Task<IEnumerable<University>> GetUniversities();
         Task<IEnumerable<Country>> GetCountries();
         Task<IEnumerable<Salary>> GetSalaries();
    }
}