﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Hotel_1.Models
{
    public partial class ServicesReviewImage
    {
        public int ServicesReviewImageId { get; set; }
        public int ServiceReviewId { get; set; }
        public string ImageUrl { get; set; }

        public virtual ServiceReview ServiceReview { get; set; }
    }
}