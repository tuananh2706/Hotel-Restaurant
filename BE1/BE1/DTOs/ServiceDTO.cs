namespace Hotel.DTOs
{
    public class ServiceDto
    {
        public int ServiceId { get; set; }
        public string ServiceName { get; set; }
        public decimal ServicePrice { get; set; }
        public string Description { get; set; }
        public string ServiceType { get; set; }
        public int? HotelId { get; set; }
    }
}
