using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ProductCatalogue.Models;
using ProductCatalogue.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ProductCatalogue.Services
{
    public class AuthService : IAuth
    {
        private readonly ProductCatalogueContext _context;
        private readonly IMapper mapper;
        private readonly ILogger<ProductService> logger;
        private readonly IConfiguration _config;
        public AuthService(ProductCatalogueContext context, IMapper mapper, ILogger<ProductService> logger, IConfiguration config)
        {
            this._context = context;
            this.mapper = mapper;
            this.logger = logger;
            this._config = config;
        }
        public string Login(User user)
        {
            var existingUser = _context.Users.FirstOrDefault(u => u.UserName == user.UserName);

            if (existingUser == null || existingUser.Password != user.Password)
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                new Claim(ClaimTypes.Name, existingUser.UserName),
            }),
                Expires = DateTime.UtcNow.AddHours(50),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            return tokenString;
        }

        public bool SignUp(User user)
        {
            var existingUser = _context.Users.FirstOrDefault(u => u.UserName == user.UserName);
            if (existingUser != null)
            {
                return false;
            }

            _context.Add(user);
            _context.SaveChanges();
            return true;
        }
    }
}
