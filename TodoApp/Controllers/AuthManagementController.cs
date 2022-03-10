using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TodoApp.Configuration;
using TodoApp.Models.DTOs.Requests;
using TodoApp.Models.DTOs.Responses;

namespace TodoApp.Controllers
{
    //[EnableCors("CorsPolicy")]
    [Route("api/[controller]")] // api/authManagement
    [ApiController]
    public class AuthManagementController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly JwtConfig _jwtConfig;
        private readonly RoleManager<IdentityRole> _roleManager;
  

        public AuthManagementController(
            UserManager<IdentityUser> userManager,
            RoleManager<IdentityRole> roleManager,      
            IOptionsMonitor<JwtConfig> optionsMonitor)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _jwtConfig = optionsMonitor.CurrentValue;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationDto user)
        {
            if (ModelState.IsValid)
            {              

                if (user.Id != null && !string.IsNullOrEmpty(user.Id))
                {
                    var userById = await _userManager.FindByIdAsync(user.Id);

                    if(userById == null)
                    {
                        return BadRequest(new RegistrationResponse()
                        {
                            Errors = new List<string>() {
                                "Invalid request try again"
                            },
                            IsRegistered = false
                        });
                    }

                    var isUpdated = await _userManager.UpdateAsync(userById);

                    if (isUpdated.Succeeded)
                    {
                        var rolesList = await _userManager.GetRolesAsync(userById).ConfigureAwait(false);

                        IEnumerable<string> clearRoles = rolesList;

                        IdentityResult clearRolesResult = await _userManager.RemoveFromRolesAsync(userById, clearRoles);

                        if (clearRolesResult.Succeeded)
                        {
                            foreach (var role in user.roles)
                                await _userManager.AddToRoleAsync(userById, role);

                            return Ok(new RegistrationResponse()
                            {
                                Message = "Updated successfully",
                                IsRegistered = true
                            });
                        }                      
                    }                 
                }

                var existinguser = await _userManager.FindByEmailAsync(user.Email);

                if (existinguser != null)
                {
                    return BadRequest(new RegistrationResponse()
                    {
                        Errors = new List<string>() {
                                "email already in use"
                            },
                        IsRegistered = false
                    });
                }

                var newuser = new IdentityUser() { Email = user.Email, UserName = user.UserName };

                var iscreated = await _userManager.CreateAsync(newuser, user.Password);

                if (iscreated.Succeeded)
                {                        
                    var newUserRegister = await _userManager.FindByEmailAsync(user.Email);

                    foreach (var role in user.roles)                                 
                            await _userManager.AddToRoleAsync(newUserRegister, role);
                                                                   
                    return Ok(new RegistrationResponse()
                    {
                        Message = "Created successfully",
                        IsRegistered = true
                    }); 
                }
                else
                {
                    return BadRequest(new RegistrationResponse()
                    {
                        Errors = iscreated.Errors.Select(x => x.Description).ToList(),
                        IsRegistered = false
                    });
                }
            }

            return BadRequest(new RegistrationResponse()
            {
                Errors = new List<string>() {
                        "Something went wrong! try again..."
                    },
                IsRegistered = false
            });

        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequest user)
        {
            
            if (ModelState.IsValid)
            {
                var existingUser = await _userManager.FindByEmailAsync(user.Email);            

                if (existingUser == null)
                {
                    return BadRequest(new RegistrationResponse()
                    {
                        Errors = new List<string>() {
                            "Invalid login request"
                        },
                        IsRegistered = false
                    });
                }

                var isCorrect = await _userManager.CheckPasswordAsync(existingUser, user.Password);

                if (!isCorrect)
                {
                    return BadRequest(new RegistrationResponse()
                    {
                        Errors = new List<string>() {
                            "Invalid login request"
                        },
                        IsRegistered = false
                    });
                }

              
                var role = await _userManager.GetRolesAsync(existingUser);            

                var jwtToken = GenerateJwtToken(existingUser);

                return Ok(new RegistrationResponse()
                {
                    IsRegistered = true,
                    IdToken = jwtToken.IdToken,
                    ExpiresIn = jwtToken.ExpiresIn,
                    RefreshToken = jwtToken.RefreshToken,
                    Name = jwtToken.Name,
                    Email = jwtToken.Email,
                    LocalId = jwtToken.LocalId,
                    RolesName = role as List<string>
                });

                //return Ok(jwtToken);
            }

            return BadRequest(new RegistrationResponse()
            {
                Errors = new List<string>() {
                    "Invalid payload"
                },
                IsRegistered = false
            });        
          
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<IEnumerable<UserList>> GetUsers()
        {
            var userLists = new List<UserList>();

            var users = _userManager.Users.ToList();

            foreach (var user in users)
            {
                var userList = new UserList();
                var roles = await _userManager.GetRolesAsync(user);
                userList.Id = user.Id;
                userList.UserName = user.UserName;
                userList.Email = user.Email;
                userList.Roles = String.Join(",", roles);
                userLists.Add(userList);                  
            }

            return userLists;
        }

        [HttpGet]
        [Route("GetRoles")]
        public async Task<IEnumerable<Roles>> GetRoles()
        {
            var roleLists = new List<Roles>();

            var roles =  _roleManager.Roles.ToList();

            foreach(var role in roles)
            {
                var roleList = new Roles();
                roleList.RoleId = role.Id;
                roleList.RoleName = role.Name;
                roleList.IsChecked = false;
                roleLists.Add(roleList);
            }

            return roleLists;
        }

        [HttpGet]
        [Route("GetUserById/{userId}")]
        public async Task<IActionResult> GetUserById(string userId)
        {
            var fetchUser = new UserRegistrationDto();
            var roleLists = new List<Roles>();
     
            if (userId != null && !string.IsNullOrEmpty(userId))
            {
                var user = await _userManager.FindByIdAsync(userId);

                foreach (var role in _roleManager.Roles)
                {
                    var userRolesViewModel = new Roles
                    {
                        RoleId = role.Id,
                        RoleName = role.Name
                    };

                    if (await _userManager.IsInRoleAsync(user, role.Name))                    
                        userRolesViewModel.IsChecked = true;                    
                    else                    
                        userRolesViewModel.IsChecked = false;                    

                    roleLists.Add(userRolesViewModel);
                }

                fetchUser.Id = user.Id;
                fetchUser.UserName = user.UserName;
                fetchUser.Email = user.Email;
                fetchUser.RoleList = roleLists;
            }

            return Ok(fetchUser);
        }

        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if(user != null)
            {
                var IsDeleteResult = await _userManager.DeleteAsync(user);

                if (IsDeleteResult.Succeeded)
                {
                    return Ok(new DeleteResponse()
                    {
                        Message = "Deleted Successfully",
                        IsDeleted = true
                    });
                }
            }

            return Ok(new DeleteResponse()
            {
                Message = "Something went wrong on delete user !",
                IsDeleted = false
            });
        }

        [HttpGet]
        [Route("GetEmail/{email}")]
        public async Task<IActionResult> GetEmail(string email)
        {
            if (!string.IsNullOrEmpty(email))
            {              
                Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
                Match match = regex.Match(email);

                if (match.Success)
                {
                    var getUserByEmail = await _userManager.FindByEmailAsync(email);

                    if(getUserByEmail != null)
                    {
                        return Ok(new SendEmailResponse()
                        {
                            Message = "Email sent successfully !",
                            IsSend = true
                        });
                    }
                    else
                    {
                        return Ok(new SendEmailResponse()
                        {
                            Message = "Email not found !",
                            IsSend = false
                        });
                    }

                }
            }

            return Ok(new SendEmailResponse()
            {
                Message = "Invalid request!",
                IsSend = false
            });

        }

        [HttpPost]
        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword(ChangePasswordRequest request)
        {
            if (request != null)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);

                if (user != null)
                {
                    var response = await _userManager.ChangePasswordAsync(user, request.OldPassword, request.ConfirmPassword);

                    if (response.Succeeded)
                    {
                        return Ok(new ChangePasswordResponse()
                        {
                            Message = "Password changed successfully !",
                            IsChanges = true
                        });
                    }
                }
            }
            return Ok(new ChangePasswordResponse()
            {
                Message = "Invalid request !",
                IsChanges = false
            });       

        }

        private TokenResponse GenerateJwtToken(IdentityUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();

            var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("Id", user.Id),                   
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),                   
                }),              
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature),

            };            

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);

            var response = new TokenResponse 
            { 
                LocalId = user.Id,
                IdToken = jwtTokenHandler.WriteToken(token),
                ExpiresIn = _jwtConfig.ExpiresIn,
                Email = user.Email,
                Name = user.UserName,
                RefreshToken = token.Id
            };

            return response;
        }
        
    }    

}