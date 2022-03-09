using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Data;
using TodoApp.Models;
using TodoApp.Models.DTOs.Responses;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly EFMCDbContext _context;
        public EmailController(EFMCDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetEmail")]
        public async Task<IActionResult> GetEmail()
        {
            var priceFactor = _context.Email.FirstOrDefault(id => id.id == 1);
            return Ok(priceFactor);
        }

        [HttpPost]
        [Route("UpdateEmailSetting")]
        public async Task<IActionResult> UpdateEmailSetting(Email email)
        {
            if (email != null)
            {
                var foundData = _context.Email.FirstOrDefault(a => a.id == 1);
                foundData.EmailAddress = email.EmailAddress;
                foundData.Password = email.Password;
                foundData.Host = email.Host;
                foundData.Port = email.Port;
                foundData.CC = email.CC;
                foundData.Updated_Date = DateTime.Now;

                _context.SaveChanges();

                return Ok(new CommonResponse()
                {
                    Message = "SMTP Email settings updated successfully !",
                    IsUpdated = true
                });
            }

            return Ok(new CommonResponse()
            {
                Message = "Invalid request!",
                IsUpdated = false
            });
        }

        [HttpGet]
        [Route("GetEmailById/{Id}")]
        public async Task<IActionResult> GetEmailById(int Id)
        {
            var email = _context.Email.Where(f => f.id == Id).ToList();
            return Ok(email);
        }
    }
}
