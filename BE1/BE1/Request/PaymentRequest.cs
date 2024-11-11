namespace Hotel.Request
{
    public class PaymentRequest
    {
        public class CreatePaymentRequest
        {
            public int? HotelBookingId { get; set; }
            public int? ServiceBookingId { get; set; }
            public int? RestaurantBookingId { get; set; }
            public decimal Amount { get; set; }
            public DateTime? PaymentDate { get; set; }
        }

        public class UpdatePaymentRequest
        {
            public int? HotelBookingId { get; set; }
            public int? ServiceBookingId { get; set; }
            public int? RestaurantBookingId { get; set; }
            public decimal? Amount { get; set; }
            public DateTime? PaymentDate { get; set; }
        }
    }
}
