using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;


namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExcelController : ControllerBase
    {
        [Route("UploadExcel")]
        [HttpPost]
        public HttpResponseMessage SaveEmployee(List<Sample> employee)
        {
            //string Result = "Name: " + employee.Name + " Age: " + employee.Dept;

            //return Request.CreateResponse(HttpStatusCode.OK, Result);
            return null;
        }
    }

    public class Sample
    {
        public int Sno { get; set; }
        public string Name { get; set; }
        public string Dept { get; set; }
        public int Salary { get; set; }
    }
}
