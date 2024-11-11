namespace Hotel.Request
{
    public class HotelBookingRequest
    {
        public class CreateBookingRequest
        {
            public string AccountName { get; set; }
            public int RoomId { get; set; }
            public int HotelId { get; set; }
            public DateOnly CheckInDate { get; set; }
            public DateOnly CheckOutDate { get; set; }
            public decimal TotalPrice { get; set; }
            public string Status { get; set; }
        }

        public class UpdateBookingRequest
        {
            public string? AccountName { get; set; }
            public int? RoomId { get; set; }
            public int? HotelId { get; set; }
            public DateOnly? CheckInDate { get; set; }
            public DateOnly? CheckOutDate { get; set; }
            public decimal TotalPrice { get; set; }
            public string? Status { get; set; }
            public DateTime? CreateAt { get; set; }
        }
    }
}
