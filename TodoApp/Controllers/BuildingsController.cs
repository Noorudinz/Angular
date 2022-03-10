using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Data;
using TodoApp.Models.DTOs;
using TodoApp.Models.DTOs.Responses;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuildingsController : ControllerBase
    {
        private readonly EFMCDbContext _context;
        public BuildingsController(EFMCDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        [Route("GetBuildings")]
        public async Task<IActionResult> GetBuildings()
        {
            var buildings = _context.Building.ToList();
            return Ok(buildings);
        }

        [HttpPost]
        [Route("AddOrUpdateBuilding")]
        public async Task<IActionResult> AddOrUpdateBuilding(Building building)
        {
            if (building != null)
            {                                 

                if (building.BuildingId != 0)
                {
                    var updateBuilding = _context.Building
                        .FirstOrDefault(e => e.BuildingId == building.BuildingId);

                    if(updateBuilding != null)
                    {
                        updateBuilding.BuildingName = building.BuildingName;
                        updateBuilding.BuildingCode = building.BuildingCode;
                        updateBuilding.BuildingIncharge = building.BuildingIncharge;
                        updateBuilding.Floors = building.Floors;
                        updateBuilding.ERF = building.ERF;
                        updateBuilding.ARF = building.ARF;
                        updateBuilding.WRF = building.WRF;
                        updateBuilding.Remarks = building.Remarks;
                        updateBuilding.TimeStamp = DateTime.Now;
                        updateBuilding.updated_ByUserId = building.updated_ByUserId;
                        updateBuilding.BuildingId = building.BuildingId;

                        _context.SaveChanges();

                        return Ok(new BuildingResponse()
                        {
                            Message = "Building Updated Successfully !",
                            IsUpdated = true
                        });
                    }                 
                }
                else
                {
                    var addBuilding = new Building();

                    addBuilding.BuildingName = building.BuildingName;
                    addBuilding.BuildingCode = building.BuildingCode;
                    addBuilding.BuildingIncharge = building.BuildingIncharge;
                    addBuilding.Floors = building.Floors;
                    addBuilding.ERF = building.ERF;
                    addBuilding.ARF = building.ARF;
                    addBuilding.WRF = building.WRF;
                    addBuilding.Remarks = building.Remarks;
                    addBuilding.TimeStamp = DateTime.Now;
                    addBuilding.created_ByUserId = building.created_ByUserId;
       
                    _context.Building.Add(addBuilding);
                    _context.SaveChanges();

                    return Ok(new BuildingResponse()
                    {
                        Message = "Building Added Successfully !",
                        IsUpdated = true
                    });

                }
            }

            return Ok(new BuildingResponse()
            {
                Message = "Invalid request !",
                IsUpdated = false
            });

        }

        [HttpDelete]
        [Route("DeleteBuilding/{id}/{code}")]
        public async Task<IActionResult> DeleteUser(int id, string code)
        {
            var foundBuilding = _context.Building.FirstOrDefault(w => w.BuildingId == id && w.BuildingCode == code);

            if (foundBuilding != null)
            {
                _context.Building.Remove(foundBuilding);
                _context.SaveChanges();

                return Ok(new DeleteResponse()
                {
                    Message = "Deleted Successfully",
                    IsDeleted = true
                });

            }

            return Ok(new DeleteResponse()
            {
                Message = "Something went wrong on delete building   !",
                IsDeleted = false
            });
        }

        [HttpGet]
        [Route("GetBuildingById/{Id}")]
        public async Task<IActionResult> GetBuildingById(int Id)
        {
            var buildings = _context.Building.Where(f => f.BuildingId == Id).ToList();
            return Ok(buildings);
        }
    }
}
