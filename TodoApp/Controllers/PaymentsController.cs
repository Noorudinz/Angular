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
    public class PaymentsController : ControllerBase
    {
        private readonly ApiDbContext _context;
        private readonly EFMCDbContext _efmc;
        public PaymentsController(ApiDbContext context, EFMCDbContext efmc)
        {
            _context = context;
            _efmc = efmc;
        }

        [HttpGet]
        [Route("GetReceiptList")]
        public async Task<IActionResult> GetReceiptList()
        {
            //List<AccountSummary> summary = new List<AccountSummary>();

            //foreach (var flatDet in _efmc.FlatOwner)
            //{
            //    var filteredRecords = _efmc.AccountSummary.Where(e => e.FlatNo == flatDet.FlatNo)
            //        .OrderBy(e => e.AccontNo).Last();

            //    summary.Add(filteredRecords);

            //    var arrear = _efmc.Payment.FirstOrDefault(e => e.FlatNo == flatDet.FlatNo);               
            //    arrear.Arrears = filteredRecords.Amount;       

            //}

            //_efmc.SaveChanges();    

           // var sortedRecords = summary.OrderByDescending(e => e.AccontNo).ToList();           

            var receiptList = _efmc.Receipt.Take(1000).OrderByDescending(e => e.ReceiptNo)
                .ToList();

            return Ok(receiptList);
        }

        [HttpGet]
        [Route("GetReceiptByReceiptNo/{flatNo}")]
        public async Task<IActionResult> GetReceiptByReceiptNo(string flatNo)
        {

            var records = _efmc.Receipt.Where(f => f.FlatNo == flatNo)
                .OrderByDescending(e => e.ReceiptNo)
                .ToList();

            return Ok(records);
        }

        [HttpGet]
        [Route("GetLastSummaryDetail")]
        public async Task<IActionResult> GetLastSummaryDetail()
        {

            List<AccountSummary> summary = new List<AccountSummary>();

            foreach (var flatDet in _efmc.FlatOwner)
            {
                var filteredRecords = _efmc.AccountSummary.Where(e => e.FlatNo == flatDet.FlatNo)
                    .OrderBy(e => e.AccontNo).Last();               

                summary.Add(filteredRecords);
            }

            var sortedRecords = summary.OrderByDescending(e => e.AccontNo).ToList();

            return Ok(sortedRecords);
        }

        [HttpGet]
        [Route("GetSummaryByFlatNo/{flatNo}")]
        public async Task<IActionResult> GetSummaryByFlatNo(string flatNo)
        {

            var records = _efmc.AccountSummary.Where(f => f.FlatNo == flatNo)
                .OrderByDescending(e => e.AccontNo)
                .ToList();

            return Ok(records);
        }

        [HttpPost]
        [Route("AddReceipt")]
        public async Task<IActionResult> AddReceipt(Receipt receipt)
        {
            if (receipt != null)
            {
                var flatDet = _efmc.FlatOwner.FirstOrDefault(e => e.FlatNo == receipt.FlatNo);

                if(flatDet != null)
                {
                    var addReceipt = new Receipt();

                    addReceipt.FlatNo = flatDet.FlatNo;
                    addReceipt.PaymentMode = receipt.PaymentMode;
                    addReceipt.ChequeNo = receipt.ChequeNo;
                    addReceipt.ChequeDate = receipt.ChequeDate;
                    addReceipt.Bank = receipt.Bank;
                    addReceipt.AmountReceived = receipt.AmountReceived;
                    addReceipt.ReceivedBy = receipt.ReceivedBy;
                    addReceipt.Narration = receipt.Narration;
                    addReceipt.CreatedDate = DateTime.Now;

                    _efmc.Receipt.Add(addReceipt);
                    _efmc.SaveChanges();

                    var accounts = new AccountSummary();

                    var lastSummaryByFlatNo = _efmc.AccountSummary.Where(e => e.FlatNo == flatDet.FlatNo)
                        .OrderByDescending(a => a.AccontNo)
                        .Take(1).FirstOrDefault();

                    var lastReceiptDetailsByFlatNo = _efmc.Receipt.Where(e => e.FlatNo == flatDet.FlatNo)
                            .OrderBy(e => e.ReceiptNo).Last();

                    accounts.FlatNo = receipt.FlatNo;
                    accounts.Narration = receipt.Narration;
                    accounts.Charge = 0;
                    accounts.Receipts = receipt.AmountReceived;
                    accounts.Amount = lastSummaryByFlatNo.Amount - (receipt.AmountReceived);
                    accounts.created_date = DateTime.Now;
                    accounts.charge_id = 0;
                    accounts.receipt_id = lastReceiptDetailsByFlatNo.ReceiptNo;

                    _efmc.AccountSummary.Add(accounts);
                    _efmc.SaveChanges();

                    var lastPay = _efmc.Payment.FirstOrDefault(e => e.FlatNo == flatDet.FlatNo);
                    lastPay.Arrears = lastPay.Arrears - receipt.AmountReceived;
                    lastPay.updated_date = DateTime.Now;

                    _efmc.SaveChanges();

                    return Ok(new CommonResponse()
                    {
                        Message = "Receipt created Successfully !",
                        IsUpdated = true
                    });
                }              
            }

            return Ok(new CommonResponse()
            {
                Message = "Invalid request !",
                IsUpdated = false
            });

        }
    }
}
