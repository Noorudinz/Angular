using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Data;
using TodoApp.Models;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly EFMCDbContext _context;
        public CompanyController(EFMCDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetCompany")]
        public async Task<IActionResult> GetCompany()
        {
            Company company = _context.Company.Where(f => f.OrgId == 1).FirstOrDefault();           
            return Ok(company);
        }

        [HttpPost]
        [Route("UpdateCompany")]
        public async Task<IActionResult> UpdateCompany(Company request)
        {
            if (request == null)
            {
                return Ok(new CompanyResponse()
                {
                    Message = "Invalid request !",
                    IsUpdated = false
                });
            }
              

            var foundCompany = _context.Company.FirstOrDefault(e => e.OrgId == request.OrgId);

            if (foundCompany != null)
            {
                foundCompany.Org_Code = request.Org_Code;
                foundCompany.Org_Name = request.Org_Name;
                foundCompany.Org_Address = request.Org_Address;
                foundCompany.Org_Email = request.Org_Email;
                foundCompany.Org_Phone = request.Org_Phone;
                foundCompany.Org_Remarks = request.Org_Remarks;
                foundCompany.Org_Website = request.Org_Website;
                foundCompany.Org_Zip = request.Org_Zip;
                foundCompany.Updated_ByUserId = request.Updated_ByUserId;
                foundCompany.updated_date = DateTime.Now;

                _context.SaveChanges();

                return Ok(new CompanyResponse()
                {
                    Message = "Updated Successfully !",
                    IsUpdated = true
                }); 
            }

            return Ok(new CompanyResponse()
            {
                Message = "Invalid request !",
                IsUpdated = false
            });
        }
    }
}
