namespace Hotel.Request
{
    public class InvoiceDetailRequest
    {
        public class CreateInvoiceDetaiRequest
        {
            public int InvoiceId { get; set; }
            public string InvoiceType { get; set; }
            public int? RoomId { get; set; }
            public int? ServiceId { get; set; }
            public int Quantity { get; set; }
            public decimal Price { get; set; }
        }

        public class UpdateInvoiceDetaiRequest
        {
            public int? InvoiceId { get; set; }
            public string? InvoiceType { get; set; }
            public int? RoomId { get; set; }
            public int? ServiceId { get; set; }
            public int? Quantity { get; set; }
            public decimal? Price { get; set; }
        }
    }
}
