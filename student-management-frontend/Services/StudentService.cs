using StudentManagement.Models;
using System.Net.Http.Json;

namespace StudentManagement.Services
{
    public class StudentService : IStudentService
    {
        private readonly HttpClient _httpClient;

        public StudentService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<List<Student>> GetStudentsAsync()
        {
            return await _httpClient.GetFromJsonAsync<List<Student>>("/Students");
        }
    }
}
