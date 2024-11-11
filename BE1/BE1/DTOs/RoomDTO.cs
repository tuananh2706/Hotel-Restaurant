namespace Hotel.DTOs
{
    public class RoomDto
    {
        public int RoomId { get; set; }
        public int RoomTypeId { get; set; }
        public decimal PricePerNight { get; set; }
        public string Status { get; set; }
        public string? Description { get; set; }
        public int MaxOccupancy { get; set; }
        public int RoomCount { get; set; }
    }
}
