using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using CarrierAPI.Data;
using CarrierAPI.Dtos;
using CarrierAPI.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Configuration;
using CarrierDomain.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Collections.Generic;
using System.Text;

namespace CarrierAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;        
        private readonly IMapper _mapper;
        private Cloudinary _cloudinary;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IOptions<CloudinarySettings> cloudinaryConfig,
         IMapper mapper, IConfiguration config)
        {
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;
            _repo = repo;
            _config = config;
            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register(EmployeeSave employeeSave)
        {
            employeeSave.WholeUserData.Username = employeeSave.WholeUserData.Username.ToLower();

            if (await _repo.UserExists(employeeSave.WholeUserData.Username))
                return BadRequest("Username already exists");

            //User userToCreate = _mapper.Map<User>(wholeUserData);

            Employee createdUser = await _repo.Register(employeeSave.WholeUserData, employeeSave.Password);

            var userToReturn = _mapper.Map<UserForDetailedDto>(createdUser);
            
            // return CreatedAtRoute(
            // routeName: "GetUser",
            // routeValues: new { id = createdUser.Id },
            // value: createdUser);
            return Ok(new {id = createdUser.Id});
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {
            UsersFullData userFromRepo = await _repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
                return Unauthorized();

            Claim[] claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.User.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.User.Username),
                new Claim(ClaimTypes.Role, userFromRepo.User.UserType.ToString())
            };

            SymmetricSecurityKey key = new SymmetricSecurityKey(Encoding.UTF8
                .GetBytes(_config.GetSection("AppSettings:Token").Value));

            SigningCredentials creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();

            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            UserForDetailedDto user = _mapper.Map<UserForDetailedDto>(userFromRepo.User);
            Employee employee = userFromRepo.Employee;
            Employer employer = userFromRepo.Employer;
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                user,
                employee,
                employer
            });
        }
        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var user = _mapper.Map<UserForDetailedDto>(await _repo.GetUser(id));
            return Ok(user);
        }
        [HttpGet("GetUsers")]
        public async Task<IActionResult> GetUsers() 
        {        
            var users = await _repo.GetUsers();
            IEnumerable<WholeUserData> user = _mapper.Map<IEnumerable<WholeUserData>>(users);
            return Ok (user);
        }
        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers([FromQuery]UserParams userParams)
        {
            //var currentUserId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var currentUserId = userParams.UserId;
            var userFromRepo = await _repo.GetUser(currentUserId);

            userParams.UserId = currentUserId;
            var users = await _repo.GetUsers(userParams);

            var result = _mapper.Map<IEnumerable<WholeUserData>>(users);

            Response.AddPagination(users.CurrentPage, users.PageSize,
                users.TotalCount, users.TotalPages);

            return Ok(result);
        }
        [HttpPost("SetPhoto")]
        public async Task<IActionResult> SetPhoto([FromForm]PhotoForCreationDto photoForCreationDto) 
        {       
            // if (photoForCreationDto.UserId.ToString().Equals(User.FindFirst(ClaimTypes.NameIdentifier).Value.ToString()))
            //     return Unauthorized();

            var userFromRepo = await _repo.GetUser(photoForCreationDto.UserId);

            var file = photoForCreationDto.File;

            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation()
                            .Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;
             
            bool bln = await _repo.SetPhoto(photoForCreationDto.UserId, photoForCreationDto.Url);
            if(bln)
                return Ok();
            return BadRequest();
        }
    }
}