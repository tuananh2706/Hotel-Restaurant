namespace Hotel.DTOs
{
    public class HotelInvoiceDto
    {
        public int HotelInvoiceId { get; set; }
        public int HotelBookingId { get; set; }
        public DateOnly? InvoiceDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
    }
}
