using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{
    public class Company
    {
        [Key]
        public int OrgId { get; set; }
        public string Org_Code { get; set; }
        public string Org_Name { get; set; }
        public string Org_Address { get; set; }
        public string Org_Zip { get; set; }
        public string Org_Phone { get; set; }
        public string Org_Email { get; set; }
        public string Org_Website { get; set; }
        public string Org_Remarks { get; set; }
        public string Org_Logo { get; set; }
        public DateTime? created_date { get; set; }
        public DateTime? updated_date { get; set; }
        public int? created_by { get; set; }
        public int? updated_by { get; set; }
        public string Updated_ByUserId { get; set; }
    }

    public class CompanyResponse
    {
        public string Message { get; set; }
        public bool IsUpdated { get; set; }
    }
}
