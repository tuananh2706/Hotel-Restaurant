namespace Hotel.Request
{
    public class HotelRequest
    {
        public class CreateHotelRequest
        {
            public string HotelName { get; set; }
            public string Address { get; set; }
            public string Description { get; set; }
            public int CategoryId { get; set; }
            public int LocationId { get; set; }
            public List<RoomTypeRequest> RoomTypes { get; set; }
            public List<ServiceRequest> Services { get; set; }
            public List<string> HotelImages { get; set; }
            public List<SocialRequest> Social { get; set; }
        }

        public class RoomTypeRequest
        {
            public string TypeName { get; set; }
            public List<RoomRequest> Rooms { get; set; }
        }

        public class RoomRequest
        {
            public decimal PricePerNight { get; set; }
            public string Status { get; set; }
            public string Description { get; set; }
            public int MaxOccupancy { get; set; }
            public int RoomCount { get; set; }
            public List<string> RoomImages { get; set; }
        }

        public class ServiceRequest
        {
            public string ServiceName { get; set; }
            public decimal ServicePrice { get; set; }
            public string ServiceType { get; set; }
            public List<string> ServiceImages { get; set; }
        }

        public class SocialRequest
        {
            public string LinkUrl { get; set; }
        }


        public class UpdateHotelRequest
        {
            public string? HotelName { get; set; }
            public string? Address { get; set; }
            public string? Description { get; set; }
            public int? CategoryId { get; set; }
            public int? LocationId { get; set; }
        }
    }
}
