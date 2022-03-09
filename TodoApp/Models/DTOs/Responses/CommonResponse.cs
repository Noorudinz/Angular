using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TodoApp.Models.DTOs.Responses
{
    public class CommonResponse
    {
        public string Message { get; set; }
        public bool IsUpdated { get; set; }
    }
}
