﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace BE1.newModels;

public partial class HotelReview
{
    public int HotelReviewId { get; set; }

    public string AccountName { get; set; }

    public int HotelId { get; set; }

    public int Rating { get; set; }

    public string ReviewText { get; set; }

    public DateOnly? ReviewDate { get; set; }

    public virtual Account AccountNameNavigation { get; set; }

    public virtual Hotel Hotel { get; set; }
}