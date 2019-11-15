using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using CarrierAPI.Dtos;
using CarrierAPI.Helpers;
using CarrierDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace CarrierAPI.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public AuthRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<UsersFullData> Login(string username, string password)
        {
            var user = await _context.Users.Include(c => c.City).FirstOrDefaultAsync(x => x.Username == username);
            Employee employee = null;
            Employer employer = null;
            if(user.UserType == UserType.Employee)
                employee = await _context.Employees.Include(u => u.University).Include(c => c.Carrier)
                .Include(s => s.Salary).FirstOrDefaultAsync();
            else if(user.UserType == UserType.Employer)
                employer = await _context.Employers.FirstOrDefaultAsync();
            if (user == null)
                return null;
            
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                return null;

            return new UsersFullData{User = user, Employee = employee, Employer = employer};
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }
                return true;
            }
        }
        public async Task<Employee> Register(Employee user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;
            
            await _context.Employees.AddAsync(user);

            await _context.SaveChangesAsync();

            return user;
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            } 
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _context.Users.AnyAsync(x => x.Username == username))
                return true;

            return false;
        }

        public async Task<Employee> GetUser(Guid id)
        {
            return await _context.Employees.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<IEnumerable<Employee>> GetUsers()
        {
            return await _context.Employees.ToListAsync();
        }

        public async Task<bool> SetPhoto(Guid userId, string photoUrl)
        {
            User editedPhoto = await _context.Users.FirstOrDefaultAsync(user => user.Id == userId);
            editedPhoto.PhotoUrl = photoUrl;
             return await _context.SaveChangesAsync() > 0;
        }

        public async Task<PagedList<Employee>> GetUsers(UserParams userParams)
        {
            var users = _context.Employees.OrderByDescending(u => u.LastActive).AsQueryable();

            users = users.Where(u => u.Id != userParams.UserId);
            users = userParams.Gender != Gender.Other ? users.Where(Woak => Woak.Gender == userParams.Gender) : users;

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "CreatedAt":
                        users = users.OrderByDescending(u => u.CreatedAt);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<Employee>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }
    }
}