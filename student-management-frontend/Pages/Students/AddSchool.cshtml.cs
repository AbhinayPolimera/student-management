using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using StudentManagement.Models;
using System.Net.Http.Json;

namespace StudentManagement.Pages.Students
{
    public class AddSchoolModel : PageModel
    {
        private readonly HttpClient _httpClient;

        public AddSchoolModel(IHttpClientFactory httpClientFactory)
        {
            _httpClient = httpClientFactory.CreateClient("ApiClient");
        }

        [BindProperty]
        public School School { get; set; } = new School();

        public List<School> Schools { get; set; } = new List<School>();

        public async Task OnGetAsync()
        {
            var response = await _httpClient.GetAsync("Schools");
            if (response.IsSuccessStatusCode)
            {
                Schools = await response.Content.ReadFromJsonAsync<List<School>>();
            }
        }

        public async Task<IActionResult> OnPostAsync()
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }

            try
            {
                var response = await _httpClient.PostAsJsonAsync("Schools", School);
                if (response.IsSuccessStatusCode)
                {
                    return RedirectToPage("Add");
                }

                var errorContent = await response.Content.ReadAsStringAsync();
                ModelState.AddModelError(string.Empty, $"Error adding school: {errorContent}");
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, $"Exception occurred: {ex.Message}");
            }

            return Page();
        }
    }
}