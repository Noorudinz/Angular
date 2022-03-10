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
    public class FlatOwnerController : ControllerBase
    {
        private readonly EFMCDbContext _context;
        public FlatOwnerController(EFMCDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetFlatOwners")]
        public async Task<IActionResult> GetFlatOwners()
        {
            //var flatOwners = _context.FlatOwner.ToList();

            var flatOwners = _context.FlatOwner.Join(_context.Building,
                                flat => flat.BuildingId,
                                building => building.BuildingId,
                                (flat, building) => new { Flat = flat, Building = building })
                                .Select(fetch => new
                                {
                                    FlatNo = fetch.Flat.FlatNo,
                                    BuildingType = fetch.Building.BuildingName,
                                    Email = fetch.Flat.Email1,
                                    FirstName = fetch.Flat.FirstName,
                                    MobileNumber = fetch.Flat.MobileNumber,
                                    PossesionDate = fetch.Flat.PossesionDate
                                }).ToList();

            return Ok(new
            {
                draw = 0,
                recordsTotal = flatOwners.Count(),
                //recordsFiltered = flatOwners.Count(),
                data = flatOwners
            });
        }

        [HttpGet]
        [Route("GetFlatOwnerByFlatNo/{flatNo}")]
        public async Task<IActionResult> GetFlatOwnerByFlatNo(string flatNo)
        {
            var flatOwners = _context.FlatOwner.Join(_context.Building,
                            flat => flat.BuildingId,
                            building => building.BuildingId,
                            (flat, building) => new { Flat = flat, Building = building })
                            .Where(f => f.Flat.FlatNo == flatNo)
                            .Select(fetch => new
                            {
                                FlatOwner = fetch.Flat,
                                BuildingType = fetch.Building
                            }).ToList();


            if (flatOwners.Count == 0)
            {
                return Ok(new CommonResponse()
                {
                    Message = "Data not found !",
                    IsUpdated = false
                });

            }

            return Ok(new { flatOwners, IsUpdated = true });
        }

        [HttpPost]
        [Route("AddFlatOwner")]
        public async Task<IActionResult> AddFlatOwner(FlatOwner flatOwner)
        {
            return Ok(new CommonResponse()
            {
                Message = "Flat Owner Added Successfully !",
                IsUpdated = true
            }) ;
        }

        [HttpDelete]
        [Route("DeleteFlat/{flatNo}")]
        public async Task<IActionResult> DeleteFlat(string flatNo)
        {
            return Ok(new DeleteResponse()
            {
                Message = "Deleted Successfully",
                IsDeleted = true
            });
        }

    }
}
