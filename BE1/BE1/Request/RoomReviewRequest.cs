namespace Hotel.Request
{
    public class RoomReviewRequest
    {
        public class CreateRoomReviewRequest
        {
            public string AccountName { get; set; }
            public int RoomId { get; set; }
            public int Rating { get; set; }
            public string ReviewText { get; set; }
        }

        public class UpdateRoomReviewRequest
        {
            public int? Rating { get; set; }
            public string? ReviewText { get; set; }
        }
    }
}
