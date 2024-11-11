namespace Hotel.Request
{
    public class RoomTypeRequest
    {
        public class CreateRoomTypeRequest
        {
            public int HotelId { get; set; }
            public string TypeName { get; set; }
        }

        public class UpdateRoomTypeRequest
        {
            public string? TypeName { get; set; }
        }
    }
}
