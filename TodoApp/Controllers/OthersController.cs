using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApp.Data;
using TodoApp.Others;

namespace TodoApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OthersController : ControllerBase
    {
        private readonly ApiDbContext _context;

        public OthersController(ApiDbContext context)
        {
            _context = context;

        }
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee(Employee employee)
        {
            //employee.Id = Guid.NewGuid().ToString();
            //_context.Employee.Add(employee);
            //try
            //{
            //    await _context.SaveChangesAsync();
            //}
            //catch (DbUpdateException)
            //{
            //    if (EmployeeExists(employee.Id))
            //    {
            //        return Conflict();
            //    }
            //    else
            //    {
            //        throw;
            //    }
            //}

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }
    }
}
