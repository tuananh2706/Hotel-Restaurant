namespace Hotel.Request
{
    public class HotelReviewImageRequest
    {
        public class CreateHotelReviewImageRequest
        {
            public int HotelReviewId { get; set; }
            public string ImageUrl { get; set; }
        }

        public class UpdateHotelReviewImageRequest
        {
            public int? HotelReviewId { get; set; }
            public string? ImageUrl { get; set; }
        }
    }
}
