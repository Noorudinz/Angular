using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Data;
using TodoApp.Models;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly EFMCDbContext _context;
        public DashboardController(EFMCDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetDashboardDetails")]
        public async Task<IActionResult> GetDashboardDetails()
        {
                        
            var totalFlatOwners = _context.FlatOwner.Count();
            var totalOutPayments = _context.Payment.Select(s => s.Arrears).Sum();

            var topFiveOP = _context.FlatOwner
                                        .Join(_context.Payment,
                                        FO => FO.FlatNo,
                                        OP => OP.FlatNo,
                                        (FO, OP) => new { FlatOwner = FO, OutPay = OP })
                                        .Select(t => new
                                        {
                                            Name = t.FlatOwner.FamilyName + ' ' + t.FlatOwner.FirstName,
                                            FlatNo = t.FlatOwner.FlatNo,
                                            Amount = t.OutPay.Arrears
                                        })
                                        .OrderByDescending(e => e.Amount)
                                        .Take(5).ToList();

            var amountDue = await _context.TotalAmountDue
                                    .FromSqlRaw("select sum(Amount) as Amount from AccountSummary a, FlatOwner f where a.AccontNo in (SELECT MAX(AccontNo)" +
                                                "FROM AccountSummary GROUP BY FlatNo) and(f.FlatNo = a.FlatNo)").ToListAsync();

            var today = DateTime.Today;
            var month = new DateTime(today.Year, today.Month, 1);
            var first = month.AddMonths(-1);
            var last = month.AddDays(-1);

            var lastMonthTotalBills = _context.Bills
                .Where(a => a.cycle_from.Date == first && a.cycle_to.Date == last)
                 .Sum(e => e.Amount);

            var lastMonthTotalRevenue = _context.Receipt
                 .Where(a => (a.CreatedDate.Value.Date >= first.Date) && (a.CreatedDate.Value.Date <= last.Date))
                 .Sum(e => e.AmountReceived);


            return Ok(new
            {
                FlatOwnersCount = totalFlatOwners,
                TotalOutstandingPayments = amountDue,
                LastMonthTotBills = lastMonthTotalBills,
                LastMonthTotalRevenue = lastMonthTotalRevenue,
                TopFiveOP = topFiveOP.ToList()
            });           
        }

        [HttpGet]
        [Route("FetchDataForBarCharts")]
        public async Task<IActionResult> FetchDataForCharts()
        {
           

            var data = await _context.BarChartData
                               .FromSqlRaw("select sum(BTU_amount) as BTU, sum(water_amount) as WATER, sum(electricity_amount) as ELECTRICITY, "+
                                           "DATENAME(MONTH, DATEADD(MONTH, month(cycle_to), -1)) as [Month], YEAR(cycle_to) as [Year] from "+
                                           "Bills group by MONTH(cycle_to), YEAR(cycle_to) order by YEAR(cycle_to) desc, month(cycle_to) desc")
                               .ToListAsync();


            var barChartList = new List<BarChart>();
            foreach (var d in data)
            {
                List<decimal> allData = new List<decimal>();
                var barChart = new BarChart();

                barChart.Name = d.Month;              

                allData.Add(d.BTU);
                allData.Add(d.WATER);
                allData.Add(d.ELECTRICITY);

                barChart.Data = allData.ToArray();

                barChartList.Add(barChart);
            }

            return Ok(barChartList);       

        }

        [HttpGet]
        [Route("FetchDataForPieCharts")]
        public async Task<IActionResult> FetchDataForPieCharts()
        {


            var data = await _context.PieChartData
                               .FromSqlRaw("select (sum(AmountReceived) / (select sum(AmountReceived) from Receipt)) * 100 as Y, " +
                                            "(SUBSTRING(DATENAME(MONTH, DATEADD(MONTH, month(CreatedDate), -1)), 1, 3)+'/'+" +
                                            "CAST(YEAR(CreatedDate) as varchar(10))) as [Name] from Receipt group by MONTH(CreatedDate), YEAR(CreatedDate) " +
                                            "order by YEAR(CreatedDate) desc").ToListAsync();


            //var barChartList = new List<BarChart>();
            //foreach (var d in data)   
            //{
            //    List<decimal> allData = new List<decimal>();
            //    var barChart = new BarChart();

            //    barChart.Name = d.Month;

            //    allData.Add(d.BTU);
            //    allData.Add(d.WATER);
            //    allData.Add(d.ELECTRICITY);

            //    barChart.Data = allData.ToArray();

            //    barChartList.Add(barChart);
            //}

            return Ok(data);

        }

    }
}
