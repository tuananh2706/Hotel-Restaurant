namespace BE1.Request
{
    public class RefreshTokenRequest
    {
        public string AccountName { get; set; }
        public string refreshToken { get; set; }
    }
}