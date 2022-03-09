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
    public class PriceFactorController : ControllerBase
    {
        private readonly EFMCDbContext _context;
        public PriceFactorController(EFMCDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetPriceFactor")]
        public async Task<IActionResult> GetPriceFactor()
        {
            var priceFactor = _context.PriceFactor.Where(id => id.PriceID == 1);
            return Ok(priceFactor);
        }

        [HttpPost]
        [Route("UpdatePriceFactor")]
        public async Task<IActionResult> UpdatePriceFactor(PriceFactor priceFactor)
        {
            if(priceFactor != null)
            {               
                var foundData = _context.PriceFactor.FirstOrDefault(a => a.PriceID == 1);
                foundData.BTUFactor = priceFactor.BTUFactor;
                foundData.ElectricityFactor = priceFactor.ElectricityFactor;
                foundData.WaterFactor = priceFactor.WaterFactor;
                foundData.ServiceCharge = priceFactor.ServiceCharge;
                foundData.OtherCharges = priceFactor.OtherCharges;            
                foundData.updated_date = DateTime.Now;

                _context.SaveChanges();

                return Ok(new CommonResponse()
                {
                    Message = "Price Factor Updated Successfully !",
                    IsUpdated = true
                });
            }

            return Ok(new CommonResponse()
            {
                Message = "Invalid request!",
                IsUpdated = false
            });
        }
    }
}
