namespace Hotel.DTOs
{
    public class InvoiceDetailDto
    {
        public int InvoiceDetailId { get; set; }
        public int InvoiceId { get; set; }
        public string InvoiceType { get; set; }
        public int? RoomId { get; set; }
        public int? ServiceId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
