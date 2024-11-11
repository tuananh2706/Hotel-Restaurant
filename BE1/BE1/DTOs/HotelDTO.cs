using System.Collections.Generic;

namespace Hotel.DTOs
{
    public class HotelDto
    {
        public int HotelId { get; set; }
        public string HotelName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string State { get; set; }
        public string Description { get; set; }

        public List<HotelBookingDto> HotelBookings { get; set; } = new List<HotelBookingDto>();
        public List<HotelImageDto> HotelImages { get; set; } = new List<HotelImageDto>();
        public List<HotelReviewDto> HotelReviews { get; set; } = new List<HotelReviewDto>();
        public List<RoomTypeDto> RoomTypes { get; set; } = new List<RoomTypeDto>();
        public List<RoomDto> Rooms { get; set; } = new List<RoomDto>();
        public List<SocialDto> Socials { get; set; } = new List<SocialDto>();
    }
}
