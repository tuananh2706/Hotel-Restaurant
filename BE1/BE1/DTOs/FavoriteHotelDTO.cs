namespace BE1.DTOs
{
    public class FavoriteHotelDto
    {
        public int FavoriteHotelId { get; set; }
        public string AccountName { get; set; }
        public int HotelId { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
