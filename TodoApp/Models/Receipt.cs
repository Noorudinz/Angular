using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{
    public class Receipt
    {
        [Key]
        public long ReceiptNo { get; set; }
        public long? BillNo { get; set; }
        public string FlatNo { get; set; }
        public string PaymentMode { get; set; }
        public string ChequeNo { get; set; }
        public string ChequeDate { get; set; }
        public string Bank { get; set; }
        public decimal? AmountReceived { get; set; }
        public string ReceivedBy { get; set; }
        public string Narration { get; set; }
        public DateTime? CreatedDate { get; set; }
    }
}
