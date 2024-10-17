namespace Hotel_1.Requests
{
	public class RegisterRequest
	{
		public string AccountName { get; set; }
		public string Email { get; set; }
		public string Password { get; set; }

	}
	public class LoginRequest
		{
			public string Email { get; set; }
			public string Password { get; set; }
		}
	public class UpdateRequest
	{
		public string ?AccountName { get; set; }
		public string ?FirstName { get; set; }
		public string ?LastName { get; set; }
		public string ?Email { get; set; }
		public string ?Phone { get; set; }
		public string ?Role { get; set; }
		public string ?AvatarUrl { get; set; }
	}
}


