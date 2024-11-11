namespace Hotel.DTOs
{
    public class PaymentDto
    {
        public int PaymentId { get; set; }
        public int? HotelBookingId { get; set; }
        public int? ServiceBookingId { get; set; }
        public int? RestaurantBookingId { get; set; }
        public decimal Amount { get; set; }
        public DateTime? PaymentDate { get; set; }
    }
}
