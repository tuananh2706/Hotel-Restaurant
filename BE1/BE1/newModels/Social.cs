﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace BE1.newModels;

public partial class Social
{
    public int Id { get; set; }

    public string LinkUrl { get; set; }

    public int HotelId { get; set; }

    public virtual Hotel Hotel { get; set; }
}