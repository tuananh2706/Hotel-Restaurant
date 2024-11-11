namespace Hotel.DTOs
{
    public class ServiceReviewDto
    {
        public int ServiceReviewId { get; set; }
        public string AccountName { get; set; }
        public int ServiceId { get; set; }
        public int? Rating { get; set; }
        public string ReviewText { get; set; }
        public DateOnly? ReviewDate { get; set; }
    }
}
