using CarrierDomain.Models;
using Microsoft.EntityFrameworkCore;

namespace CarrierAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){}
        public DbSet<User> Users { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Employer> Employers { get; set; }
        public DbSet<Carrier> Carriers { get; set; }
        public DbSet<Country> Countries { get; set;}
        public DbSet<City> Cities { get; set; }
        public DbSet<Salary> Salaries { get; set; }
        public DbSet<Skill> Skills { get; set; }
        public DbSet<University> Universities { get; set; }
        public DbSet<EmployeeSkill> EmployeeSkills { get; set; }
        public DbSet<Advertisement> Advertisements { get; set; }

        protected override void OnModelCreating(ModelBuilder builder) 
        {
            //builder.Entity<Employee>().HasBaseType<User>();
            //builder.Entity<Employer>().HasBaseType<User>();

            builder.Entity<Country>().HasMany(x => x.Cities).WithOne(y => y.Country).HasForeignKey(z => z.CountryId);

            builder.Entity<EmployeeSkill>().HasOne(x => x.Employee).WithMany(y => y.EmployeeSkills)
            .HasForeignKey(z => z.UserId).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<EmployeeSkill>().HasOne(x => x.Skill).WithMany(y => y.EmployeeSkills)
            .HasForeignKey(z => z.SkillId).OnDelete(DeleteBehavior.Restrict);

            //builder.Entity<Employer>().HasMany(x => x.Advertisements).WithOne(y => y.Employer).HasForeignKey(z => z.UserId);
            
            
        }
    }
}