namespace Hotel.Request
{
    public class ServiceInvoiceRequest
    {
        public class CreateServiceInvoiceRequest
        {
            public int ServiceBookingId { get; set; }
            public DateTime? InvoiceDate { get; set; }
            public decimal TotalAmount { get; set; }
            public string Status { get; set; }
        }

        public class UpdateServiceInvoiceRequest
        {
            public int? ServiceBookingId { get; set; }
            public DateTime? InvoiceDate { get; set; }
            public decimal? TotalAmount { get; set; }
            public string Status { get; set; }
        }
    }
}
