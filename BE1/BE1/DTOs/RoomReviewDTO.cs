namespace Hotel.DTOs
{
    public class RoomReviewDto
    {
        public int RoomReviewId { get; set; }
        public string AccountName { get; set; }
        public int RoomId { get; set; }
        public int? Rating { get; set; }
        public string ReviewText { get; set; }
        public DateOnly? ReviewDate { get; set; }
    }
}
