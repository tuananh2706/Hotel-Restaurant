namespace Hotel.Request
{
    public class SocialRequest
    {
        public class CreateSocialRequest
        {
            public string LinkUrl { get; set; }
            public int HotelId { get; set; }
        }

        public class UpdateSocialRequest
        {
            public string LinkUrl { get; set; }
        }
    }
}
