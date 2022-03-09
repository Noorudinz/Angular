using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{
    public class Payment
    {
        [Key]
        public int PaymentId { get; set; }
        public string FlatNo { get; set; }
        public decimal? Arrears { get; set; }
        public DateTime? created_date { get; set; }
        public DateTime? updated_date { get; set; }

    }
}
