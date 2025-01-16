using Microsoft.AspNetCore.Mvc;
using StudentManagement.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace StudentManagement.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SchoolsController : ControllerBase
    {
        private static List<School> schools = new List<School>
    {
        new School { Id = 1, Name = "UMKC", Address1 = "123 Main St", City = "Kansas", State = "MO", ZipCode = "64112" },
        new School { Id = 2, Name = "St Louis University", Address1 = "456 Another St", City = "St Louis", State = "MO", ZipCode = "54123" },
        new School { Id = 3, Name = "UCM", Address1 = "45 Wishwood CT", City = "Chesterfield", State = "MO", ZipCode = "63017" },
        new School { Id = 4, Name = "Maryville University", Address1 = "845 Page St", City = "Ballwin", State = "MO", ZipCode = "64758" },
        new School { Id = 5, Name = "Webster University", Address1 = "952 Lackland Rd", City = "Creve Cour", State = "MO", ZipCode = "62100" }
    };

        [HttpGet]
        public IActionResult GetSchools()
        {
            return Ok(schools);
        }

        [HttpPost]
        public IActionResult CreateSchool([FromBody] School school)
        {
            school.Id = schools.Max(s => s.Id) + 1;
            schools.Add(school);
            return CreatedAtAction(nameof(GetSchools), new { id = school.Id }, school);
        }
    }
}
