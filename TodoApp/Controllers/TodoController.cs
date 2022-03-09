using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Data;
using TodoApp.Models;
using TodoApp.Models.DTOs.Responses;
using System.Linq;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")] // api/todo
    [ApiController]
    //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TodoController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly EFMCDbContext _efmc;

        public TodoController(ApiDbContext context, EFMCDbContext efmc)
        {   
            _context = context;
            _efmc = efmc;
        }

        [HttpGet]
        [Route("GetTODO")]
        public async Task<IActionResult> GetItems()
        {
            var items = await _context.Items.ToListAsync();
            return Ok(items);
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem(ItemData data)
        {
            if(ModelState.IsValid)
            {
                await _context.Items.AddAsync(data);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetItem", new {data.Id}, data);
            }

            return new JsonResult("Something went wrong") {StatusCode = 500};
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetItem(int id)
        {
            var item = await _context.Items.FirstOrDefaultAsync(x => x.Id == id);

            if(item == null)
                return NotFound();

            return Ok(item);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, ItemData item)
        {
            if(id != item.Id)
                return BadRequest();

            var existItem = await _context.Items.FirstOrDefaultAsync(x => x.Id == id);

            if(existItem == null)
                return NotFound();

            existItem.Title = item.Title;
            existItem.Description = item.Description;
            existItem.Done = item.Done;
            
            // Implement the changes on the database level
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var existItem = await _context.Items.FirstOrDefaultAsync(x => x.Id == id);

            if(existItem == null)
                return NotFound();

            _context.Items.Remove(existItem);
            await _context.SaveChangesAsync();

            return Ok(existItem);
        }

        //-------------------------------------------------------------------------------------------------

        //Generate invoice by particular flat

        [HttpGet]
        [Route("InvoiceByFlatNo/{flatNo}")]
        public async Task<IActionResult> InvoiceByFlatNo(string flatNo)
        {

            var flatDetail = _efmc.FlatOwner.FirstOrDefault(f => f.FlatNo == flatNo);

            var priceFactor = _efmc.PriceFactor.FirstOrDefault();

            var today = DateTime.Today;
            var month = new DateTime(today.Year, today.Month, 1);
            var cycleFrom = month.AddMonths(-1);
            var cycleTo = month.AddDays(-1);

            //------------List-------------------------------
            var btuList = _efmc.BTU
                .OrderByDescending(a => a.ReadingDate)
                .Where(r => r.FlatNo == flatNo).ToList();

            var waterList = _efmc.Water
               .OrderByDescending(a => a.ReadingDate)
               .Where(r => r.FlatNo == flatNo).ToList();

            var electricityList = _efmc.Electricity
               .OrderByDescending(a => a.ReadingDate)
               .Where(r => r.FlatNo == flatNo).ToList();

            //------------Current reading---------------------------

            var btuCurrentReading = btuList
                .Where(a => Convert.ToDateTime(a.ReadingDate).Month == DateTime.Now.Month)
                .FirstOrDefault();

            var waterCurrentReading = waterList
               .Where(a => Convert.ToDateTime(a.ReadingDate).Month == DateTime.Now.Month)
               .FirstOrDefault();

            var electCurrentReading = electricityList
               .Where(a => Convert.ToDateTime(a.ReadingDate).Month == DateTime.Now.Month)
               .FirstOrDefault();

            //------------Previous reading------------------------------

            var btuPreviousReading = _efmc.Bills
                .OrderByDescending(o => o.cycle_to)
                .Where(f => f.FlatNo == flatNo).First();

            var waterPreviousReading = _efmc.Bills
               .OrderByDescending(o => o.cycle_to)
               .Where(f => f.FlatNo == flatNo).First();

            var electPreviousReading = _efmc.Bills
               .OrderByDescending(o => o.cycle_to)
               .Where(f => f.FlatNo == flatNo).First();

            //----------------------Consumption--------------------------------------

            var btuConsumption = btuCurrentReading.Reading - btuPreviousReading.btu_prev;
            var waterConsumption = waterCurrentReading.Reading - waterPreviousReading.water_prev;
            var electConsumption = electCurrentReading.Reading - electPreviousReading.elec_prev;

            //---------------------Charge-------------------------------------------

            var btuAmount = btuConsumption * priceFactor.BTUFactor;
            var waterAmount = waterConsumption * priceFactor.WaterFactor;
            var electAmount = electConsumption * priceFactor.ElectricityFactor;

            //----------------------Previous arrear-----------------------------------------------
            var lastBillDetails = _efmc.Bills
               .OrderBy(o => o.BillNo)
               .Where(f => f.FlatNo == flatNo).Last();

            var bill = new Bills();
            string buildingName = _efmc.Building.FirstOrDefault(f => f.BuildingId == flatDetail.BuildingId).BuildingName;

            bill.FlatNo = flatNo;
            bill.cycle_from = cycleFrom;
            bill.cycle_to = cycleTo;
            bill.BTU_amount = btuAmount;
            bill.electricity_amount = electAmount;
            bill.water_amount = waterAmount;
            bill.service_charge = priceFactor.ServiceCharge;
            bill.other_charge = priceFactor.OtherCharges;
            bill.current_bill = btuAmount + waterAmount + electAmount;
            bill.previous_arrear = lastBillDetails.previous_arrear;
            bill.Amount = bill.current_bill + bill.previous_arrear;
            bill.paid = 0;
            bill.created_date = DateTime.Now;
            bill.due_date = DateTime.Now.AddDays(10);
            bill.elec_current = electCurrentReading.Reading;
            bill.elec_prev = electPreviousReading.elec_prev;
            bill.elec_consum = electConsumption;
            bill.water_current = waterCurrentReading.Reading;
            bill.water_prev = waterPreviousReading.water_prev;
            bill.water_consum = waterConsumption;
            bill.btu_current = btuCurrentReading.Reading;
            bill.btu_prev = btuPreviousReading.btu_prev;
            bill.btu_consum = btuConsumption;
            bill.FirstName = flatDetail.FirstName;
            bill.FloorNo = flatDetail.FloorNo;
            bill.BuildingName = buildingName;
            bill.MobileNumber = flatDetail.MobileNumber;
            bill.Email1 = flatDetail.Email1;
            bill.Address = flatDetail.Address;
            bill.FaxNumber = null;

            _efmc.Bills.Add(bill);
            _efmc.SaveChanges();

            var records = _efmc.Bills.OrderByDescending(o => o.BillNo)
                .Where(f => f.FlatNo == flatNo).Take(100);

            return Ok(records);
        }

        [HttpGet]
        [Route("InvoiceByFlatNo")]
        public async Task<IActionResult> InvoiceByFlatNo()
        {

            var records = _efmc.Bills.OrderByDescending(o => o.BillNo)                         
                          .Take(100).ToList();

            return Ok(records);
        }

        [HttpGet]
        [Route("InvoiceByBillNo/{billNo}")]
        public async Task<IActionResult> InvoiceByBillNo(Int64 billNo)
        {

            var records = _efmc.Bills.Where(f => f.BillNo == billNo).ToList();

            return Ok(records);
        }

        [HttpGet]
        [Route("InvoiceByPeriods/{selectedDate}")]
        public async Task<IActionResult> InvoiceByPeriods(DateTime selectedDate)
        {
            //ExcelUtility.Convertor.ConvertorToPDF();

            var fromPeriod = new DateTime(selectedDate.Year, selectedDate.Month, 1);
            var toPeriod = new DateTime(selectedDate.Year, selectedDate.Month, DateTime.DaysInMonth(selectedDate.Year, selectedDate.Month));

            var records = _efmc.Bills
                .Where(f => f.cycle_from.Date >= fromPeriod
                && f.cycle_to.Date <= toPeriod)
                .ToList();

            return Ok(records);
        }

        [HttpGet]
        [Route("GetMailListToSendByPeriods/{selectedDate}")]
        public async Task<IActionResult> GetMailListToSendByPeriods(DateTime selectedDate)
        {

            var fromPeriod = new DateTime(selectedDate.Year, selectedDate.Month, 1);
            var toPeriod = new DateTime(selectedDate.Year, selectedDate.Month, DateTime.DaysInMonth(selectedDate.Year, selectedDate.Month));

            var records = _efmc.Bills
                .Where(f => f.cycle_from.Date >= fromPeriod
                && f.cycle_to.Date <= toPeriod && f.IsMailSend == false)
                .ToList();

            return Ok(records);
        }

        [HttpGet]
        [Route("SendMailGeneratedBills/{selectedDate}")]
        public async Task<IActionResult> SendMailGeneratedBills(DateTime selectedDate)
        {

            var fromPeriod = new DateTime(selectedDate.Year, selectedDate.Month, 1);
            var toPeriod = new DateTime(selectedDate.Year, selectedDate.Month, DateTime.DaysInMonth(selectedDate.Year, selectedDate.Month));

            var recordsBeforeMailSend = _efmc.Bills
                .Where(f => f.cycle_from.Date >= fromPeriod
                && f.cycle_to.Date <= toPeriod && f.IsMailSend == false)
                .ToList();

            var emailSettings = _efmc.Email.FirstOrDefault();

            foreach(var bill in recordsBeforeMailSend)
            {
                ManageMails.MailSender.SendEmails(bill, emailSettings);

                var foundData = _efmc.Bills.FirstOrDefault(a => a.BillNo == bill.BillNo);

                foundData.IsMailSend = true;

                _efmc.SaveChanges();
               
            }

            ManageMails.MailSender.DeleteFiles();

            var recordsAfterMailSend = _efmc.Bills
               .Where(f => f.cycle_from.Date >= fromPeriod
               && f.cycle_to.Date <= toPeriod && f.IsMailSend == false)
               .ToList();

            return Ok(recordsAfterMailSend);

        }

        [HttpGet]
        [Route("GenerateBill/{selectedDate}")]
        public async Task<IActionResult> GenerateBill(DateTime selectedDate)
        {
            try
            {               

                var fromPeriod = new DateTime(selectedDate.Year, selectedDate.Month, 1);
                var toPeriod = new DateTime(selectedDate.Year, selectedDate.Month, DateTime.DaysInMonth(selectedDate.Year, selectedDate.Month));

                var billsDetails = _efmc.Bills
                    .Where(f => f.cycle_from.Date >= fromPeriod
                    && f.cycle_to.Date <= toPeriod).Count();
                    

                if (billsDetails == 0)
                {
                    var btuList = _efmc.BTU.Where(f => f.ReadingDate.Value.Date >= fromPeriod
                    && f.ReadingDate.Value.Date <= toPeriod).ToList();

                    var waterList = _efmc.Water.Where(f => f.ReadingDate.Value.Date >= fromPeriod
                    && f.ReadingDate.Value.Date <= toPeriod).ToList();

                    var electricityList = _efmc.Electricity.Where(f => f.ReadingDate.Value.Date >= fromPeriod
                    && f.ReadingDate.Value.Date <= toPeriod).ToList();

                    var priceFactor = _efmc.PriceFactor.FirstOrDefault();

                    foreach (var flatOwner in _efmc.FlatOwner)
                    {
                        //---------------flat details----------------------------------------------
                        var flatDetail = _efmc.FlatOwner.FirstOrDefault(f => f.FlatNo == flatOwner.FlatNo);

                        //--------------get imported reading by flat no------------------------------
                        var getBTUbyFlatNo = btuList.FirstOrDefault(e => e.FlatNo == flatOwner.FlatNo);
                        var getWaterbyFlatNo = waterList.FirstOrDefault(e => e.FlatNo == flatOwner.FlatNo);
                        var getElectbyFlatNo = electricityList.FirstOrDefault(e => e.FlatNo == flatOwner.FlatNo);

                        //------------current readings-----------------------------------------
                        decimal? currentBTU = getBTUbyFlatNo.Reading;
                        decimal? currentWater = getWaterbyFlatNo.Reading;
                        decimal? currentElect = getElectbyFlatNo.Reading;

                        //-------------Previous readings---------------------------------------

                        var lastBill = _efmc.Bills.OrderByDescending(o => o.cycle_from)
                            .ThenByDescending(t => t.cycle_to)
                            .FirstOrDefault(e => e.FlatNo == flatOwner.FlatNo);

                        //var lastBill = _efmc.Bills
                        //                   .OrderBy(o => o.BillNo)
                        //                   .Where(f => f.FlatNo == flatOwner.FlatNo).Last();


                        decimal? previousBTU = lastBill.btu_current;
                        decimal? previousWater = lastBill.water_current;
                        decimal? previousElect = lastBill.elec_current;

                        //----------------Consumption---------------------------------------

                        var btuConsumption = currentBTU - previousBTU;
                        var waterConsumption = currentWater - previousWater;
                        var electConsumption = currentElect - previousElect;

                        //----------------Charge-------------------------------------------

                        var btuAmount = btuConsumption * priceFactor.BTUFactor;
                        var waterAmount = waterConsumption * priceFactor.WaterFactor;
                        var electAmount = electConsumption * priceFactor.ElectricityFactor;
                       

                        var bill = new Bills();
                        string buildingName = _efmc.Building.FirstOrDefault(f => f.BuildingId == flatDetail.BuildingId).BuildingName;

                        bill.FlatNo = flatDetail.FlatNo;
                        bill.cycle_from = fromPeriod;
                        bill.cycle_to = toPeriod;
                        bill.BTU_amount = btuAmount;
                        bill.electricity_amount = electAmount;
                        bill.water_amount = waterAmount;
                        bill.service_charge = priceFactor.ServiceCharge;
                        bill.other_charge = priceFactor.OtherCharges;
                        bill.current_bill = btuAmount + waterAmount + electAmount;
                        bill.previous_arrear = lastBill.previous_arrear;
                        bill.Amount = bill.current_bill + bill.previous_arrear;
                        bill.paid = 0;
                        bill.created_date = toPeriod; //DateTime.Now;
                        bill.due_date = toPeriod.AddDays(10); //DateTime.Now.AddDays(10);
                        bill.elec_current = currentElect;
                        bill.elec_prev = previousElect;
                        bill.elec_consum = electConsumption;
                        bill.water_current = currentWater;
                        bill.water_prev = previousWater;
                        bill.water_consum = waterConsumption;
                        bill.btu_current = currentBTU;
                        bill.btu_prev = previousBTU;
                        bill.btu_consum = btuConsumption;
                        bill.FirstName = flatDetail.FirstName;
                        bill.FloorNo = flatDetail.FloorNo;
                        bill.BuildingName = buildingName;
                        bill.MobileNumber = flatDetail.MobileNumber;
                        bill.Email1 = flatDetail.Email1;
                        bill.Address = flatDetail.Address;
                        bill.FaxNumber = null;

                        _efmc.Bills.Add(bill);                       

                    }

                    _efmc.SaveChanges();

                    //--------------Accounts summary----------------------------------

                    foreach (var flatOwner in _efmc.FlatOwner)
                    {                      

                        var lastSummaryByFlatNo = _efmc.AccountSummary.Where(e => e.FlatNo == flatOwner.FlatNo)
                         .OrderByDescending(a => a.AccontNo)
                         .Take(1).FirstOrDefault();

                        var lastBillDetailsByFlatNo = _efmc.Bills.Where(e => e.FlatNo == flatOwner.FlatNo)
                            .OrderBy(e => e.BillNo).Last();

                        var accounts = new AccountSummary();
                        accounts.FlatNo = flatOwner.FlatNo;
                        accounts.Narration = "Utility bill month of" + toPeriod.ToString("MMM/yyyy");
                        accounts.Charge = lastBillDetailsByFlatNo.current_bill;
                        accounts.Receipts = Convert.ToDecimal(0.000);
                        accounts.Amount = lastSummaryByFlatNo.Amount + (lastBillDetailsByFlatNo.current_bill);
                        accounts.created_date = DateTime.Now;
                        accounts.charge_id = lastBillDetailsByFlatNo.BillNo;
                        accounts.receipt_id = 0;

                        _efmc.AccountSummary.Add(accounts);
                                         
                    }

                    _efmc.SaveChanges();

                    //-------------Payment Arrears-------------------------------------------------------
                    foreach (var flatOwner in _efmc.FlatOwner)
                    {
                        var lastBillDetailsByFlatNo = _efmc.Bills.Where(e => e.FlatNo == flatOwner.FlatNo)
                        .OrderBy(e => e.BillNo).Last();

                        var lastPay = _efmc.Payment.FirstOrDefault(e => e.FlatNo == flatOwner.FlatNo);
                        lastPay.Arrears = lastPay.Arrears + lastBillDetailsByFlatNo.current_bill;
                        lastPay.updated_date = DateTime.Now;                       
                    }

                    _efmc.SaveChanges();

                }

                var billRecords = _efmc.Bills
                                .Where(f => f.cycle_from.Date >= fromPeriod
                                 && f.cycle_to.Date <= toPeriod).ToList();

                return Ok(billRecords);
            }
            catch(Exception ex)
            {
                return Ok(ex.ToString());
            }
         
        }
    }
}