namespace Hotel.Request
{
    public class ServiceBookingRequest
    {
        public class CreateServiceBookingRequest
        {
            public int HotelBookingId { get; set; }
            public int ServiceId { get; set; }
            public int Quantity { get; set; }
        }

        public class UpdateServiceBookingRequest
        {
            public int? HotelBookingId { get; set; }
            public int? ServiceId { get; set; }
            public int? Quantity { get; set; }
            public decimal? TotalPrice { get; set; }
        }
    }
}
