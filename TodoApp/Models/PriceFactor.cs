using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{
    public class PriceFactor
    {
        [Key]
        public int PriceID { get; set; }
        public decimal BTUFactor { get; set; }
        public decimal ElectricityFactor { get; set; }
        public decimal WaterFactor { get; set; }
        public decimal ServiceCharge { get; set; }
        public decimal OtherCharges { get; set; }
        public DateTime? created_date { get; set; }
        public DateTime? updated_date { get; set; }
    }
}
