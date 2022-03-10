using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models.DTOs
{
 
    public class Building
    {
      [Key]
      public int BuildingId { get; set; }
      public string BuildingName { get; set; }
      public string BuildingCode { get; set; }
      public string BuildingIncharge { get; set; }
      public string Floors { get; set; }
      public decimal? ERF { get; set; }
      public decimal? ARF { get; set; }
      public decimal? WRF { get; set; }
      public string Remarks { get; set; }
      public string created_ByUserId { get; set; }
      public string updated_ByUserId { get; set; }
      public DateTime? TimeStamp { get; set; }
    }

    public class BuildingResponse
    {
        public string Message { get; set; }
        public bool IsUpdated { get; set; }
    } 
}
