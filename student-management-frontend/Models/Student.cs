namespace StudentManagement.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string School { get; set; }
        public string Major { get; set; }
        public DateTime DateModified { get; set; }
        public bool IsActive { get; set; }
    }
}
