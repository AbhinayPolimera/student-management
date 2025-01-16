using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using StudentManagement.Models;
using System.Net.Http.Json;

namespace StudentManagement.Pages.Students
{
    public class AddModel : PageModel
    {
        private readonly HttpClient _httpClient;

        public AddModel(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("ApiClient");
        }

        [BindProperty]
        public Student Student { get; set; }

        public List<string> Schools { get; set; } = new List<string>();

        public async Task OnGetAsync()
        {
            var response = await _httpClient.GetAsync("Schools");
            if (response.IsSuccessStatusCode)
            {
                var schoolData = await response.Content.ReadFromJsonAsync<List<School>>();
                Schools = schoolData?.Select(s => s.Name).ToList() ?? new List<string>();
            }
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            Student.DateModified = DateTime.UtcNow;

            var response = await _httpClient.PostAsJsonAsync("Students", Student);
            if (response.IsSuccessStatusCode)
            {
                return RedirectToPage("Index");
            }

            ModelState.AddModelError(string.Empty, "An error occurred while adding the student.");
            return Page();
        }
    }
}
