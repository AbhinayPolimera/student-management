using StudentManagement.Models;

namespace StudentManagement.Services
{
    public interface IStudentService
    {
        Task<List<Student>> GetStudentsAsync();
    }
}
