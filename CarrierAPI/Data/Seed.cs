using System;
using System.Collections.Generic;
using System.Linq;
using CarrierDomain.Models;
using Newtonsoft.Json;

namespace CarrierAPI.Data
{
    public class Seed
    {
        private readonly DataContext _context;
        public Seed(DataContext context)
        {
            _context = context;
        }
        public void InitialDb()
        {
            Guid CarrierGuid = Guid.NewGuid();
            if (!_context.Carriers.Any())            
                _context.Carriers.Add(new Carrier { Id = CarrierGuid, CreatedAt = DateTime.Now, CarrierTitle = "Web Developer" });
            
            Guid CountryGuid = Guid.NewGuid();                
            if (!_context.Countries.Any())            
                _context.Countries.Add(new Country { Id = CountryGuid, CreatedAt = DateTime.Now, CountryName = "Iran" });
            
            Guid CityGuid = Guid.NewGuid(); 
            if (!_context.Cities.Any())
                _context.Cities.Add(new City { Id = CityGuid, CreatedAt = DateTime.Now, CityName = "Tehran", CountryId = CountryGuid });

            Guid UniversityGuid = Guid.NewGuid();                
            if (!_context.Universities.Any())            
                _context.Universities.Add(new University { Id = UniversityGuid, CreatedAt = DateTime.Now, UniversityName = "Shiraz" });

            Guid SkillGuid = Guid.NewGuid();                
            if (!_context.Skills.Any())            
                _context.Skills.Add(new Skill { Id = SkillGuid, CreatedAt = DateTime.Now, SkillTitle = "DotNetCore" });
            
            Guid SalaryGuid = Guid.NewGuid();                
            if (!_context.Salaries.Any())            
                _context.Salaries.Add(new Salary { Id = SalaryGuid, CreatedAt = DateTime.Now, FromSalary = 2500, ToSalary = 3000 });
            Guid EmployeeGuid = Guid.NewGuid();
            Guid EmployerGuid = Guid.NewGuid();
            if (!_context.Users.Any())
            {
                byte[] passwordHash, passwordSalt;
                    CreatePasswordHash("password", out passwordHash, out passwordSalt);
                    Employee employee = new Employee()
                    {
                        Id = EmployeeGuid,
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        Username = "Vaqef",
                        FullName = "Vaqef Payfoon",
                        Website = "WWw.VaqefPayfoon.com",
                        DateOfBirth = DateTime.Now.AddYears(-31),
                        LastActive = DateTime.Now,
                        CV = @"C#/.NET Core / Angular 7	VS Code , Visual Studio	Design patterns / Dependency Injection
                            ASP.NET MVC / ASP.NET Web Form
                            / Silverlight	Git / TFS  / VSS	OOP/D
                            LINQ / Entity Framework / JQuery / Typescript / Ajax / Web API
                            WCF / Web Services / Html / CSS	Microstation / Dreamweaver / 
                            Photoshop / …
                                Agile development
                            Sql Server / Oracle / sqlite	SQL Server 2017 / Oracle SQL Developer / Browser SQLite	UML",
                        MoreInfo = "UWP, WPF, Geometric Tools, SQL Query Optimizing, Stimulsoft, FastReport",
                        CityId = CityGuid,
                        Section = "Section 5",
                        PhotoUrl = "https://res.cloudinary.com/vaqef/image/upload/v1563877277/hs9sprj2s9fhidnnkzny.jpg",
                        UserType = UserType.Employee,
                        Email = "vaqef.payfoon@outlook.com",
                        Phone = "05314814048",
                        UniversityId = UniversityGuid,
                        Gender = Gender.Male,
                        SalaryId = SalaryGuid,
                        CarrierId = CarrierGuid                        
                    };
                    _context.Users.Add(employee);
                    Employer employer = new Employer()
                    {
                        Id = EmployerGuid,
                        PasswordHash = passwordHash,
                        PasswordSalt = passwordSalt,
                        Username = "TakapoTeb",
                        FullName = "TakapoTeb",
                        Website = "WWw.TakapoTeb.com",
                        DateOfBirth = DateTime.Now.AddYears(-22),
                        LastActive = DateTime.Now,
                        CV = @"Medical Imaging and Labrator",
                        CityId = CityGuid,
                        Section = "Section 2",
                        PhotoUrl = "https://res.cloudinary.com/vaqef/image/upload/v1563536750/sample.jpg",
                        UserType = UserType.Employer,
                        Address = "Kheradmand Street"
                    };
                    _context.Users.Add(employer);              
            }
            if (!_context.EmployeeSkills.Any())
            {
                _context.EmployeeSkills.Add(new EmployeeSkill()
                {
                    UserId = EmployeeGuid,
                    SkillId = SkillGuid
                });
            }
            if (!_context.Advertisements.Any())
            {
                _context.Advertisements.Add(new Advertisement()
                {
                    UserId = EmployerGuid,
                    CarrierId = CarrierGuid,
                    AdvertisementTitle = "Senior Developer",
                    AdvertisementPassage = @"Üniversitelerin ilgili mühendislik bölümlerinden mezun (Bilgisayar Mühendisliği, Yazılım Mühendisliği, Matematik Mühendisliği, Elektrik-Elektronik Mühendisliği vb.) 
                    Microsoft ASP.Net, C# platformlarında tecrübeli 
                    ASP.NET, MVC, WCF, Javascript, Entity Framework gibi teknolojilere hakim 
                    Nesneye dayalı tasarım ve programlamaya ileri düzeyde hakim 
                    Oracle ya da benzeri bir ilişkisel veri tabanı ile çalışmış, SQL konusunda tecrübeli, veritabanı modelleme konularına hakim
                    RESTful servisler ve SOAP tabanlı web servisler geliştirme tecrübesine sahip 
                    Tercihen bir Source Control yazılımı (GIT, SVN, CVS, SourceSafe, TFS) kullanarak proje geliştirmiş",
                    Position = "Programming Engineer",
                    ActiveAdv = true
                });
            }
            _context.SaveChanges();
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}