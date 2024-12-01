namespace Hotel.Request
{
    public class HotelInvoiceRequest
    {
        public class CreateInvoiceRequest
        {
            public int HotelBookingId { get; set; }
            public DateOnly? InvoiceDate { get; set; }
            public decimal TotalAmount { get; set; }
            public string Status { get; set; }
        }

        public class UpdateInvoiceRequest
        {
            public int? HotelBookingId { get; set; }
            public DateOnly? InvoiceDate { get; set; }
            public decimal? TotalAmount { get; set; }
            public string? Status { get; set; }
        }
    }
}
