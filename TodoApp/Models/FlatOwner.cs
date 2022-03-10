using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models
{
    public class FlatOwner
    {
        [Key]
        public int FlatId { get; set; }
        public int? BuildingId { get; set; }
        public string FlatNo { get; set; }
        public string FloorNo { get; set; }
        public decimal? Area { get; set; }
        public DateTime? PossesionDate { get; set; }
        public string BedRooms { get; set; }
        public string CarParks { get; set; }
        public string FamilyName { get; set; }
        public string FirstName { get; set; }
        public string MobileNumber { get; set; }
        public string TelNumber { get; set; }
        public string Email1 { get; set; }
        public string Email2 { get; set; }
        public string Address { get; set; }
        public string CarNo  { get; set; }
        public string CarParkNos { get; set; }
        public string created_by { get; set; }
        public string updated_by { get; set; }
        public DateTime? Created_date { get; set; }
        public DateTime? updated_date { get; set; }
        public bool Isdel { get; set; }
    }
}
