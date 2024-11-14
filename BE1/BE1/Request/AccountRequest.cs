namespace Hotel.Request
{
    public class AccountRequest
    {
        public class RegisterRequest
        {
            public string AccountName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string? FirstName { get; set; }
            public string? LastName { get; set; }
        }

        public class LoginRequest
        {
            public string EmailOrUserName { get; set; }
            public string Password { get; set; }
        }

        public class UpdateAccountRequest
        {
            public string? FirstName { get; set; }
            public string? LastName { get; set; }
            public string? Email { get; set; }
            public string? Phone { get; set; }
            public string? AvatarUrl { get; set; }
            public DateOnly? BirthDate { get; set; }
            public string? Nationality { get; set; }
        }

        public class ChangePasswordRequest
        {
            public string OldPassword { get; set; }
            public string NewPassword { get; set; }
            public string ConfirmPassword { get; set; }
        }
    }
}
