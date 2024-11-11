namespace Hotel.Request
{
    public class RoomReviewImageRequest
    {
        public class CreateRoomReviewImageRequest
        {
            public int RoomReviewId { get; set; }
            public string ImageUrl { get; set; }
        }

        public class UpdateRoomReviewImageRequest
        {
            public string? ImageUrl { get; set; }
        }
    }
}
