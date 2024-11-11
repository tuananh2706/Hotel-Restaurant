namespace Hotel.DTOs
{
    public class ServiceInvoiceDto
    {
        public int ServiceInvoiceId { get; set; }
        public int ServiceBookingId { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; }
    }
}
