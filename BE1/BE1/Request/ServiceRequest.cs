namespace Hotel.Request
{
    public class ServiceRequest
    {
        public class CreateServiceRequest
        {
            public int HotelId { get; set; }
            public string ServiceName { get; set; }
            public decimal ServicePrice { get; set; }
            public string Description { get; set; }
            public string ServiceType { get; set; }
        }

        public class UpdateServiceRequest
        {
            public int HotelId { get; set; }
            public string? ServiceName { get; set; }
            public decimal? ServicePrice { get; set; }
            public string? Description { get; set; }
            public string? ServiceType { get; set; }
        }

        public class SearchServiceRequest
        {
            public int? HotelId { get; set; }
        }
    }
}
