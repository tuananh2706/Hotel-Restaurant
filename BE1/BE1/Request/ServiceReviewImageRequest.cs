namespace Hotel.Request
{
    public class ServicesReviewImageRequest
    {
        public class CreateServicesReviewImageRequest
        {
            public int ServiceReviewId { get; set; }
            public string ImageUrl { get; set; }
        }

        public class UpdateServicesReviewImageRequest
        {
            public string ImageUrl { get; set; }
        }
    }
}
