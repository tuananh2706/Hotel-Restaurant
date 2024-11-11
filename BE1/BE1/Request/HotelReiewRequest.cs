namespace Hotel.Request
{
    public class HotelReviewRequest
    {
        public class CreateHotelReviewRequest
        {
            public string AccountName { get; set; }
            public int HotelId { get; set; }
            public int Rating { get; set; }
            public string ReviewText { get; set; }
        }

        public class UpdateHotelReviewRequest
        {
            public string? AccountName { get; set; }
            public int? HotelId { get; set; }
            public int? Rating { get; set; }
            public string? ReviewText { get; set; }
        }
    }
}
