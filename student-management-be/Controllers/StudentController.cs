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
    public class StudentsController : ControllerBase
    {
        private static List<Student> students = new List<Student>
    {
        new Student { Id = 1, FirstName = "Abinay", LastName = "Polimera", School = "UMKC", Major = "Computer Science", IsActive = true },
        new Student { Id = 2, FirstName = "Jane", LastName = "Smith", School = "St Louis University", Major = "Science", IsActive = false },
        new Student { Id = 3, FirstName = "John", LastName = "Doe", School = "UMKC", Major = "Computer Science", IsActive = true },
        new Student { Id = 4, FirstName = "Clara", LastName = "Elaine", School = "St Louis University", Major = "Science", IsActive = false },
        new Student { Id = 5, FirstName = "Beth", LastName = "Ferry", School = "UCM", Major = "Computer Science", IsActive = true },
        new Student { Id = 6, FirstName = "Nick", LastName = "Jonas", School = "Maryville University", Major = "Science", IsActive = false },
        new Student { Id = 7, FirstName = "Priyanka", LastName = "Chopra", School = "Webster University", Major = "Computer Science", IsActive = true },
        new Student { Id = 8, FirstName = "Aishwarya", LastName = "Rai", School = "UCM", Major = "Science", IsActive = false }
    };

        [HttpGet]
        public IActionResult GetStudents()
        {
            return Ok(students);
        }

        [HttpGet("{id}")]
        public IActionResult GetStudent(int id)
        {
            var student = students.FirstOrDefault(s => s.Id == id);
            if (student == null)
                return NotFound();
            return Ok(student);
        }

        [HttpPost]
        public IActionResult CreateStudent([FromBody] Student student)
        {
            student.Id = students.Max(s => s.Id) + 1;
            students.Add(student);
            return CreatedAtAction(nameof(GetStudent), new { id = student.Id }, student);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateStudent(int id, [FromBody] Student student)
        {
            var existingStudent = students.FirstOrDefault(s => s.Id == id);
            if (existingStudent == null)
                return NotFound();

            existingStudent.FirstName = student.FirstName;
            existingStudent.LastName = student.LastName;
            existingStudent.School = student.School;
            existingStudent.Major = student.Major;
            existingStudent.IsActive = student.IsActive;
            existingStudent.DateModified = DateTime.Now;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteStudent(int id)
        {
            var student = students.FirstOrDefault(s => s.Id == id);
            if (student == null)
                return NotFound();

            students.Remove(student);
            return NoContent();
        }
    }
}