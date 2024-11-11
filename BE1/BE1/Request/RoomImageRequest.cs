namespace Hotel.Request
{
    public class RoomImageRequest
    {
        public class CreateRoomImageRequest
        {
            public int RoomId { get; set; }
            public string ImageUrl { get; set; }
        }

        public class UpdateRoomImageRequest
        {
            public string? ImageUrl { get; set; }
        }
    }
}
