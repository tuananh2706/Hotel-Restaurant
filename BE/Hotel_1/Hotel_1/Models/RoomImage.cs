﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Hotel_1.Models
{
    public partial class RoomImage
    {
        public int ImageId { get; set; }
        public int? RoomId { get; set; }
        public string ImageUrl { get; set; }

        public virtual Room Room { get; set; }
    }
}