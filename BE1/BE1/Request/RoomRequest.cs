namespace Hotel.Request
{
    public class RoomRequest
    {
        public class CreateRoomRequest
        {
            public int RoomTypeId { get; set; }
            public decimal PricePerNight { get; set; }
            public string Status { get; set; }
            public string Description { get; set; }
            public int MaxOccupancy { get; set; }
            public int RoomCount { get; set; } 
        }

        public class UpdateRoomRequest
        {
            public int? RoomTypeId { get; set; }
            public decimal? PricePerNight { get; set; }
            public string Status { get; set; }
            public string? Description { get; set; }
            public int? MaxOccupancy { get; set; }
            public int? RoomCount { get; set; }
        }
    }
}
