using Microsoft.AspNetCore.Mvc.RazorPages;
using StudentManagement.Models;
using System.Net.Http.Json;

namespace StudentManagement.Pages.Students
{
    public class IndexModel : PageModel
    {
        private readonly HttpClient _httpClient;

        public List<Student> Students { get; set; } = new List<Student>();

        public IndexModel(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("ApiClient");
        }

        public async Task OnGetAsync()
        {
            Students = await _httpClient.GetFromJsonAsync<List<Student>>("Students");
        }
    }
}
