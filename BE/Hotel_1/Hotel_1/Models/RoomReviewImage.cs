﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Hotel_1.Models
{
    public partial class RoomReviewImage
    {
        public int RoomReviewImageId { get; set; }
        public int RoomReviewId { get; set; }
        public string ImageUrl { get; set; }

        public virtual RoomReview RoomReview { get; set; }
    }
}