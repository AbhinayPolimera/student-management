using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using StudentManagement.Models;
using System.Net.Http.Json;

namespace StudentManagement.Pages.Students
{
    public class EditModel : PageModel
    {
        private readonly HttpClient _httpClient;

        [BindProperty]
        public Student Student { get; set; }

        public EditModel(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("ApiClient");
        }

        public async Task<IActionResult> OnGetAsync(int id)
        {
            Student = await _httpClient.GetFromJsonAsync<Student>($"https://localhost:7231/api/Students/{id}");
            if (Student == null)
            {
                return NotFound();
            }

            return Page();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

        var response = await _httpClient.PutAsJsonAsync($"https://localhost:7231/api/Students/{Student.Id}", Student);
            if (response.IsSuccessStatusCode)
            {
                return RedirectToPage("Index");
            }

            ModelState.AddModelError(string.Empty, "An error occurred while saving changes.");
            return Page();
        }
    }
}
