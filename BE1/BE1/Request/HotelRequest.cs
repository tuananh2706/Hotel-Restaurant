namespace Hotel.Request
{
    public class HotelRequest
    {
        public class CreateHotelRequest // Đổi tên lớp CreateRequest thành CreateHotelRequest
        {
            public string HotelName { get; set; }
            public string Address { get; set; }
            public string City { get; set; }
            public string District { get; set; }
            public string State { get; set; }
            public string Description { get; set; }
        }

        public class UpdateHotelRequest
        {
            public string? HotelName { get; set; }
            public string? Address { get; set; }
            public string? City { get; set; }
            public string? District { get; set; }
            public string? State { get; set; }
            public string? Description { get; set; }
        }
    }
}
