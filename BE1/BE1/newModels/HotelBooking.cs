﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace BE1.newModels;

public partial class HotelBooking
{
    public int HotelBookingId { get; set; }

    public string AccountName { get; set; }

    public int RoomId { get; set; }

    public int HotelId { get; set; }

    public DateOnly CheckInDate { get; set; }

    public DateOnly CheckOutDate { get; set; }

    public decimal TotalPrice { get; set; }

    public string Status { get; set; }

    public DateTime? CreateAt { get; set; }

    public virtual Account AccountNameNavigation { get; set; }

    public virtual Hotel Hotel { get; set; }

    public virtual ICollection<HotelInvoice> HotelInvoices { get; set; } = new List<HotelInvoice>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual Room Room { get; set; }

    public virtual ICollection<ServiceBooking> ServiceBookings { get; set; } = new List<ServiceBooking>();
}