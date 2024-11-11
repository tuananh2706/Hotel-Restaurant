namespace Hotel.Request
{
    public class ServiceImageRequest
    {
        public class CreateServiceImageRequest
        {
            public int ServiceId { get; set; }
            public string ImageUrl { get; set; }
        }

        public class UpdateServiceImageRequest
        {
            public int? ServiceId { get; set; }
            public string ImageUrl { get; set; }
        }
    }
}
