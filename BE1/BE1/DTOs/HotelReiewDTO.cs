namespace Hotel.DTOs
{
    public class HotelReviewDto
    {
        public int HotelReviewId { get; set; }
        public string AccountName { get; set; }
        public int HotelId { get; set; }
        public int? Rating { get; set; }
        public string ReviewText { get; set; }
        public DateOnly? ReviewDate { get; set; } // Chuyển sang DateOnly?
    }
}
