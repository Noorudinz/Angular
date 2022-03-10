using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using TodoApp.Data;
using TodoApp.Models;
using TodoApp.Models.DTOs.Responses;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImportsController : ControllerBase
    {
        private readonly EFMCDbContext _context;
        public ImportsController(EFMCDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetBTUList")]
        public async Task<IActionResult> GetBTUList()
        {
            var btuList = _context.BTU.OrderByDescending(x => x.ReadingDate).ToList();
            return Ok(btuList);
        }

        [HttpGet]
        [Route("GetWaterList")]
        public async Task<IActionResult> GetWaterList()
        {
            var waterList = _context.Water.OrderByDescending(x => x.ReadingDate).ToList();
            return Ok(waterList);
        }

        [HttpGet]
        [Route("GetElectricityList")]
        public async Task<IActionResult> GetElectricityList()
        {
            var electricityList = _context.Electricity.OrderByDescending(x => x.ReadingDate).ToList();
            return Ok(electricityList);
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("UploadBTU")]
        public async Task<IActionResult> UploadBTU()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Imports/BTU");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    string datetime = DateTime.Now.ToString("yyyy-MMM-dd__HH-mm-ss__");
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullFileName = datetime + fileName;
                    var fullPath = Path.Combine(pathToSave, fullFileName);
                    var dbPath = Path.Combine(folderName, fullFileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    var btuList = ExcelUtility.ImportExcelUtility.Read(fullPath);    
                    
                    foreach(var btu in btuList)
                    {
                        var importBtu = new BTU();
                        importBtu.FlatNo = btu.FlatNo;
                        importBtu.MeterID = btu.MeterID;
                        importBtu.Reading = btu.Reading;
                        importBtu.ReadingDate = new DateTime(2021, 12, 31); //DateTime.Now;
                        importBtu.CreatedDate = new DateTime(2021, 12, 31); //DateTime.Now;
                        importBtu.flag = false;

                        _context.BTU.Add(importBtu);
                        _context.SaveChanges();
                    }

                    return Ok(new CommonResponse()
                    {
                        Message = "Successfully BTU readings imported :" + btuList.Count().ToString() + " Counts",
                        IsUpdated= true
                    });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return Ok(new CommonResponse() 
                { 
                    Message = ex.ToString(),
                    IsUpdated = false
                });
            }
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("UploadWater")]
        public async Task<IActionResult> UploadWater()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Imports/Water");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    string datetime = DateTime.Now.ToString("yyyy-MMM-dd__HH-mm-ss__");
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullFileName = datetime + fileName;
                    var fullPath = Path.Combine(pathToSave, fullFileName);
                    var dbPath = Path.Combine(folderName, fullFileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    var waterList = ExcelUtility.ImportExcelUtility.Read(fullPath);

                    foreach (var water in waterList)
                    {
                        var importWater = new Water();
                        importWater.FlatNo = water.FlatNo;
                        importWater.MeterID = water.MeterID;
                        importWater.Reading = water.Reading;
                        importWater.ReadingDate = new DateTime(2021, 12, 31); //DateTime.Now;
                        importWater.CreatedDate = new DateTime(2021, 12, 31); //DateTime.Now;
                        importWater.flag = false;

                        _context.Water.Add(importWater);
                        _context.SaveChanges();
                    }

                    return Ok(new CommonResponse()
                    {
                        Message = "Successfully Water readings imported :" + waterList.Count().ToString() + " Counts",
                        IsUpdated = true
                    });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return Ok(new CommonResponse()
                {
                    Message = ex.ToString(),
                    IsUpdated = false
                });
            }
        }

        [HttpPost, DisableRequestSizeLimit]
        [Route("UploadElectricity")]
        public async Task<IActionResult> UploadElectricity()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Imports/Electricity");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    string datetime = DateTime.Now.ToString("yyyy-MMM-dd__HH-mm-ss__");
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullFileName = datetime + fileName;
                    var fullPath = Path.Combine(pathToSave, fullFileName);
                    var dbPath = Path.Combine(folderName, fullFileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }

                    var electricityList = ExcelUtility.ImportExcelUtility.Read(fullPath);

                    foreach (var electricity in electricityList)
                    {
                        var importElectricity = new Electricity();
                        importElectricity.FlatNo = electricity.FlatNo;
                        importElectricity.MeterID = electricity.MeterID;
                        importElectricity.Reading = electricity.Reading;
                        importElectricity.ReadingDate = new DateTime(2021, 12, 31); //DateTime.Now;
                        importElectricity.CreatedDate = new DateTime(2021, 12, 31);
                        importElectricity.flag = false;

                        _context.Electricity.Add(importElectricity);
                        _context.SaveChanges();
                    }

                    return Ok(new CommonResponse()
                    {
                        Message = "Successfully Electricity readings imported :" + electricityList.Count().ToString() + " Counts",
                        IsUpdated = true
                    });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return Ok(new CommonResponse()
                {
                    Message = ex.ToString(),
                    IsUpdated = false
                });
            }
        }

    }
}
