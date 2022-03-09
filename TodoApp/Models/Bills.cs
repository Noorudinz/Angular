using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{
    public class Bills
    {
        [Key]
        public Int64 BillNo { get; set; }
        public string FlatNo { get; set; }
        public DateTime cycle_from { get; set; }
        public DateTime cycle_to { get; set; }
        public decimal? BTU_amount { get; set; }
        public decimal? electricity_amount { get; set; }
        public decimal? water_amount { get; set; }
        public decimal? service_charge { get; set; }
        public decimal? other_charge { get; set; }
        public decimal? current_bill { get; set; }
        public decimal? previous_arrear { get; set; }
        public decimal? Amount { get; set; }
        public byte paid { get; set; }
        public DateTime created_date { get; set; }
        public DateTime due_date { get; set; }
        public decimal? elec_current { get; set; }
        public decimal? elec_prev { get; set; }
        public decimal? elec_consum { get; set; }
        public decimal? btu_current { get; set; }
        public decimal? btu_prev { get; set; }
        public decimal? btu_consum { get; set; }
        public decimal? water_current { get; set; }
        public decimal? water_prev { get; set; }
        public decimal? water_consum { get; set; }
        public string FirstName { get; set; }
        public string FloorNo { get; set; }
        public string BuildingName { get; set; }
        public string MobileNumber { get; set; }
        public string Email1 { get; set; }
        public string Address { get; set; }
        public string FaxNumber { get; set; }
        public bool IsMailSend { get; set; }
    }
}
