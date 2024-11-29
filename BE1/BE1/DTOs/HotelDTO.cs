using System.Collections.Generic;

namespace Hotel.DTOs
{
    public class HotelDto
    {
        public int HotelId { get; set; }

        public string HotelName { get; set; }

        public string Address { get; set; }

        public string Description { get; set; }

        public int? CategoryId { get; set; }

        public string CategoryName { get; set; }

        public int? LocationId { get; set; }

        public string LocationName { get; set; }

        public List<string> ImageUrls { get; set; } = new List<string>();

        public List<string> RoomTypes { get; set; } = new List<string>();

        public List<string> Services { get; set; } = new List<string>();

        public List<string> SocialLinks { get; set; } = new List<string>();

        public double? LowestPrice { get; set; } // Optional: You can calculate and return the lowest price from HotelBookings
    }
}
