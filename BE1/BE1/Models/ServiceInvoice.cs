﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace BE1.Models;

public partial class ServiceInvoice
{
    public int ServiceInvoiceId { get; set; }

    public int ServiceBookingId { get; set; }

    public DateTime? InvoiceDate { get; set; }

    public decimal TotalAmount { get; set; }

    public string Status { get; set; }

    public virtual ServiceBooking ServiceBooking { get; set; }
}