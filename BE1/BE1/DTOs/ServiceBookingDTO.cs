namespace Hotel.DTOs
{
    public class ServiceBookingDto
    {
        public int ServiceBookingId { get; set; }
        public int HotelBookingId { get; set; }
        public int ServiceId { get; set; }
        public int Quantity { get; set; }
        public decimal? TotalPrice { get; set; }
    }
}
