using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{
    public class Email
    {
        public int id { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string Host { get; set; }
        public string Port { get; set; }
        public string CC { get; set; }
        public DateTime? Updated_Date { get; set; }
    }
}
