namespace Hotel.DTOs
{
    public class AccountRequest
    {
        public string AccountName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Role { get; set; }
        public string AvatarUrl { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateOnly? BirthDate { get; set; }
        public string? Nationality { get; set; }
    }
}
