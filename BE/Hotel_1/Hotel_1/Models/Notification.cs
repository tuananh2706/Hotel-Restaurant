﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace Hotel_1.Models
{
    public partial class Notification
    {
        public int NotificationId { get; set; }
        public string AccountName { get; set; }
        public string Role { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool IsRead { get; set; }

        public virtual Account AccountNameNavigation { get; set; }
    }
}