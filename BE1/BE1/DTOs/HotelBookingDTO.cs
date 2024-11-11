using System;

namespace Hotel.DTOs
{
    public class HotelBookingDto
    {
        public int HotelBookingId { get; set; }
        public string AccountName { get; set; }
        public int RoomId { get; set; }
        public int HotelId { get; set; }
        public DateOnly CheckInDate { get; set; }
        public DateOnly CheckOutDate { get; set; }
        public decimal? TotalPrice { get; set; }
        public string Status { get; set; }
        public DateTime? CreateAt { get; set; }
    }
}
