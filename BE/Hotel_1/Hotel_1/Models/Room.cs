﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Hotel_1.Models
{
    public partial class Room
    {
        public Room()
        {
            BillsHotelDetails = new HashSet<BillsHotelDetail>();
            HotelBookings = new HashSet<HotelBooking>();
            RoomImages = new HashSet<RoomImage>();
            RoomReviews = new HashSet<RoomReview>();
        }

        public int RoomId { get; set; }
        public int RoomTypeId { get; set; }
        public decimal PricePerNight { get; set; }
        public bool Status { get; set; }
        public string Description { get; set; }
        public int MaxOccupancy { get; set; }

        public virtual RoomType RoomType { get; set; }
        public virtual ICollection<BillsHotelDetail> BillsHotelDetails { get; set; }
        public virtual ICollection<HotelBooking> HotelBookings { get; set; }
        public virtual ICollection<RoomImage> RoomImages { get; set; }
        public virtual ICollection<RoomReview> RoomReviews { get; set; }
    }
}