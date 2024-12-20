﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Hotel_1.Models
{
    public partial class Service
    {
        public Service()
        {
            BillsServiceDetails = new HashSet<BillsServiceDetail>();
            ServiceBookings = new HashSet<ServiceBooking>();
            ServiceImages = new HashSet<ServiceImage>();
            ServiceReviews = new HashSet<ServiceReview>();
        }

        public int ServiceId { get; set; }
        public string ServiceName { get; set; }
        public decimal ServicePrice { get; set; }
        public string Description { get; set; }

        public virtual ICollection<BillsServiceDetail> BillsServiceDetails { get; set; }
        public virtual ICollection<ServiceBooking> ServiceBookings { get; set; }
        public virtual ICollection<ServiceImage> ServiceImages { get; set; }
        public virtual ICollection<ServiceReview> ServiceReviews { get; set; }
    }
}