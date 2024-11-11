namespace Hotel.Request
{
    public class ServiceReviewRequest
    {
        public class CreateServiceReviewRequest
        {
            public string AccountName { get; set; }
            public int ServiceId { get; set; }
            public int Rating { get; set; }
            public string ReviewText { get; set; }
        }

        public class UpdateServiceReviewRequest
        {
            public string AccountName { get; set; }
            public int? ServiceId { get; set; }
            public int? Rating { get; set; }
            public string ReviewText { get; set; }
        }
    }
}
