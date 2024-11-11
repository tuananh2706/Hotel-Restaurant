namespace Hotel.Request
{
    public class HotelImageRequest
    {
        public class CreateHotelImageRequest
        {
            public int HotelId { get; set; }
            public string ImageUrl { get; set; }
        }

        public class UpdateHotelImageRequest
        {
            public int? HotelId { get; set; }
            public string? ImageUrl { get; set; }
        }
    }
}
