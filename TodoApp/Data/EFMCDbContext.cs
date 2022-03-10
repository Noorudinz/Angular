using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Models;
using TodoApp.Models.DTOs;

namespace TodoApp.Data
{
    public class EFMCDbContext : IdentityDbContext
    {
        public EFMCDbContext(DbContextOptions<EFMCDbContext> options)
           : base(options)
        {

        }

        public DbSet<Company> Company { get; set; }
        public DbSet<Building> Building { get; set; }
        public DbSet<FlatOwner> FlatOwner { get; set; }
        public DbSet<Payment> Payment { get; set; }
        public DbSet<Receipt> Receipt { get; set; }
        public DbSet<PriceFactor> PriceFactor { get; set; }
        public DbSet<Email> Email { get; set; }
        public DbSet<BTU> BTU { get; set; }
        public DbSet<Water> Water { get; set; }
        public DbSet<Electricity> Electricity { get; set; }
        public DbSet<Bills> Bills { get; set; }
        public DbSet<AccountSummary> AccountSummary { get; set; }
        public DbSet<TotalAmountDue> TotalAmountDue  { get; set; }
        public DbSet<BarChartData> BarChartData { get; set; }
        public DbSet<PieChartData> PieChartData { get; set; }

    }
}
