﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace BE1.Models;

public partial class Account
{
    public string AccountName { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    public string Email { get; set; }

    public string PasswordHash { get; set; }

    public string Phone { get; set; }

    public DateOnly? BirthDate { get; set; }

    public string Nationality { get; set; }

    public string Role { get; set; }

    public string AvatarUrl { get; set; }

    public DateTime? CreatedAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public virtual ICollection<BankCard> BankCards { get; set; } = new List<BankCard>();

    public virtual ICollection<FavoriteHotel> FavoriteHotels { get; set; } = new List<FavoriteHotel>();

    public virtual ICollection<HotelBooking> HotelBookings { get; set; } = new List<HotelBooking>();

    public virtual ICollection<HotelReview> HotelReviews { get; set; } = new List<HotelReview>();

    public virtual ICollection<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();

    public virtual ICollection<RoomReview> RoomReviews { get; set; } = new List<RoomReview>();

    public virtual ICollection<ServiceReview> ServiceReviews { get; set; } = new List<ServiceReview>();
}