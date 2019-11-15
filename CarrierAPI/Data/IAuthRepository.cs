using System.Collections.Generic;
using System.Threading.Tasks;
using CarrierAPI.Dtos;
using CarrierAPI.Helpers;
using CarrierDomain.Models;

namespace CarrierAPI.Data
{
     public interface IAuthRepository
    {
         Task<Employee> Register(Employee user, string password);
         Task<UsersFullData> Login(string username, string password);
         Task<bool> UserExists(string username);
         Task<Employee> GetUser(System.Guid id);
         Task<IEnumerable<Employee>> GetUsers();
         Task<bool> SetPhoto(System.Guid userId, string photoUrl);
         Task<PagedList<Employee>> GetUsers(UserParams userParams);
    }
}