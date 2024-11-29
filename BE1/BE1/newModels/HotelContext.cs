﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BE1.newModels;

public partial class HotelContext : DbContext
{
    public HotelContext(DbContextOptions<HotelContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }

    public virtual DbSet<BankCard> BankCards { get; set; }

    public virtual DbSet<FavoriteHotel> FavoriteHotels { get; set; }

    public virtual DbSet<Hotel> Hotels { get; set; }

    public virtual DbSet<HotelBooking> HotelBookings { get; set; }

    public virtual DbSet<HotelCategory> HotelCategories { get; set; }

    public virtual DbSet<HotelImage> HotelImages { get; set; }

    public virtual DbSet<HotelInvoice> HotelInvoices { get; set; }

    public virtual DbSet<HotelReview> HotelReviews { get; set; }

    public virtual DbSet<InvoiceDetail> InvoiceDetails { get; set; }

    public virtual DbSet<Location> Locations { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<RefreshToken> RefreshTokens { get; set; }

    public virtual DbSet<Room> Rooms { get; set; }

    public virtual DbSet<RoomImage> RoomImages { get; set; }

    public virtual DbSet<RoomReview> RoomReviews { get; set; }

    public virtual DbSet<RoomType> RoomTypes { get; set; }

    public virtual DbSet<Service> Services { get; set; }

    public virtual DbSet<ServiceBooking> ServiceBookings { get; set; }

    public virtual DbSet<ServiceImage> ServiceImages { get; set; }

    public virtual DbSet<ServiceInvoice> ServiceInvoices { get; set; }

    public virtual DbSet<ServiceReview> ServiceReviews { get; set; }

    public virtual DbSet<Social> Socials { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasKey(e => e.AccountName).HasName("PK__Accounts__6894C54B7E94B532");

            entity.HasIndex(e => e.Email, "UQ__Accounts__AB6E6164114A8B1D").IsUnique();

            entity.Property(e => e.AccountName)
                .HasMaxLength(255)
                .HasColumnName("account_name");
            entity.Property(e => e.AvatarUrl)
                .HasMaxLength(255)
                .HasColumnName("Avatar_URL");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Email)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("last_name");
            entity.Property(e => e.Nationality).HasMaxLength(100);
            entity.Property(e => e.PasswordHash)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("password_hash");
            entity.Property(e => e.Phone)
                .HasMaxLength(20)
                .HasColumnName("phone");
            entity.Property(e => e.Role)
                .HasMaxLength(50)
                .HasColumnName("role");
            entity.Property(e => e.UpdateAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("update_at");
        });

        modelBuilder.Entity<BankCard>(entity =>
        {
            entity.HasKey(e => e.BankCardId).HasName("PK__Bank_Car__5D513DB18E55E9F3");

            entity.ToTable("Bank_Card");

            entity.HasIndex(e => e.CardNumber, "UQ__Bank_Car__1E6E0AF4A4FE7AD3").IsUnique();

            entity.Property(e => e.BankCardId).HasColumnName("bank_card_id");
            entity.Property(e => e.AccountName)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("account_name");
            entity.Property(e => e.CardNumber)
                .IsRequired()
                .HasMaxLength(20)
                .HasColumnName("card_number");
            entity.Property(e => e.CardType)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("card_type");
            entity.Property(e => e.ExpirationDate).HasColumnName("expiration_date");

            entity.HasOne(d => d.AccountNameNavigation).WithMany(p => p.BankCards)
                .HasForeignKey(d => d.AccountName)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Bank_Card__accou__47DBAE45");
        });

        modelBuilder.Entity<FavoriteHotel>(entity =>
        {
            entity.HasKey(e => e.FavoriteHotelId).HasName("PK__Favorite__575B0BE6537C1B36");

            entity.ToTable("Favorite_Hotels");

            entity.Property(e => e.FavoriteHotelId).HasColumnName("favorite_hotel_id");
            entity.Property(e => e.AccountName)
                .HasMaxLength(255)
                .HasColumnName("account_name");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.HotelId).HasColumnName("hotel_id");

            entity.HasOne(d => d.AccountNameNavigation).WithMany(p => p.FavoriteHotels)
                .HasForeignKey(d => d.AccountName)
                .HasConstraintName("FK__Favorite___accou__7E37BEF6");

            entity.HasOne(d => d.Hotel).WithMany(p => p.FavoriteHotels)
                .HasForeignKey(d => d.HotelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Favorite___hotel__7F2BE32F");
        });

        modelBuilder.Entity<Hotel>(entity =>
        {
            entity.HasKey(e => e.HotelId).HasName("PK__Hotels__45FE7E269266F657");

            entity.Property(e => e.HotelId).HasColumnName("hotel_id");
            entity.Property(e => e.Address)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.HotelName)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("hotel_name");
            entity.Property(e => e.LocationId).HasColumnName("location_id");

            entity.HasOne(d => d.Category).WithMany(p => p.Hotels)
                .HasForeignKey(d => d.CategoryId)
                .HasConstraintName("FK_Hotels_Hotel_Categories");

            entity.HasOne(d => d.Location).WithMany(p => p.Hotels)
                .HasForeignKey(d => d.LocationId)
                .HasConstraintName("FK_Hotels_Locations");
        });

        modelBuilder.Entity<HotelBooking>(entity =>
        {
            entity.HasKey(e => e.HotelBookingId).HasName("PK__Hotel_Bo__4D87FD92073F1738");

            entity.ToTable("Hotel_Bookings");

            entity.Property(e => e.HotelBookingId).HasColumnName("hotel_booking_id");
            entity.Property(e => e.AccountName)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("account_name");
            entity.Property(e => e.CheckInDate).HasColumnName("check_in_date");
            entity.Property(e => e.CheckOutDate).HasColumnName("check_out_date");
            entity.Property(e => e.CreateAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("create_at");
            entity.Property(e => e.HotelId).HasColumnName("hotel_id");
            entity.Property(e => e.RoomId).HasColumnName("room_id");
            entity.Property(e => e.Status)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("status");
            entity.Property(e => e.TotalPrice)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("total_price");

            entity.HasOne(d => d.AccountNameNavigation).WithMany(p => p.HotelBookings)
                .HasForeignKey(d => d.AccountName)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Hotel_Boo__accou__4BAC3F29");

            entity.HasOne(d => d.Hotel).WithMany(p => p.HotelBookings)
                .HasForeignKey(d => d.HotelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Hotel_Boo__hotel__4D94879B");

            entity.HasOne(d => d.Room).WithMany(p => p.HotelBookings)
                .HasForeignKey(d => d.RoomId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Hotel_Boo__room___4CA06362");
        });

        modelBuilder.Entity<HotelCategory>(entity =>
        {
            entity.HasKey(e => e.CategoryId).HasName("PK__Hotel_Ca__D54EE9B45CCAE406");

            entity.ToTable("Hotel_Categories");

            entity.Property(e => e.CategoryId).HasColumnName("category_id");
            entity.Property(e => e.CategoryName)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("category_name");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<HotelImage>(entity =>
        {
            entity.HasKey(e => e.HotelImagesId).HasName("PK__Hotel_Im__039E3CC9BE719CE8");

            entity.ToTable("Hotel_Images");

            entity.Property(e => e.HotelImagesId).HasColumnName("Hotel_Images_id");
            entity.Property(e => e.HotelId).HasColumnName("hotel_id");
            entity.Property(e => e.ImageUrl)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("image_url");

            entity.HasOne(d => d.Hotel).WithMany(p => p.HotelImages)
                .HasForeignKey(d => d.HotelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Hotel_Ima__hotel__59FA5E80");
        });

        modelBuilder.Entity<HotelInvoice>(entity =>
        {
            entity.HasKey(e => e.HotelInvoiceId).HasName("PK__Hotel_In__53B4F48C427972BB");

            entity.ToTable("Hotel_Invoices");

            entity.Property(e => e.HotelInvoiceId).HasColumnName("hotel_invoice_id");
            entity.Property(e => e.HotelBookingId).HasColumnName("hotel_booking_id");
            entity.Property(e => e.InvoiceDate).HasColumnName("invoice_date");
            entity.Property(e => e.Status)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("status");
            entity.Property(e => e.TotalAmount)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("total_amount");

            entity.HasOne(d => d.HotelBooking).WithMany(p => p.HotelInvoices)
                .HasForeignKey(d => d.HotelBookingId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Hotel_Inv__hotel__5FB337D6");
        });

        modelBuilder.Entity<HotelReview>(entity =>
        {
            entity.HasKey(e => e.HotelReviewId).HasName("PK__Hotel_Re__1E97B0F4EE94D9EE");

            entity.ToTable("Hotel_Reviews");

            entity.Property(e => e.HotelReviewId).HasColumnName("hotel_review_id");
            entity.Property(e => e.AccountName)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("account_name");
            entity.Property(e => e.HotelId).HasColumnName("hotel_id");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.ReviewDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("review_date");
            entity.Property(e => e.ReviewText).HasColumnName("review_text");

            entity.HasOne(d => d.AccountNameNavigation).WithMany(p => p.HotelReviews)
                .HasForeignKey(d => d.AccountName)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Hotel_Rev__accou__5165187F");

            entity.HasOne(d => d.Hotel).WithMany(p => p.HotelReviews)
                .HasForeignKey(d => d.HotelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Hotel_Rev__hotel__52593CB8");
        });

        modelBuilder.Entity<InvoiceDetail>(entity =>
        {
            entity.HasKey(e => e.InvoiceDetailId).HasName("PK__Invoice___84908DB623F4E5B5");

            entity.ToTable("Invoice_Details");

            entity.Property(e => e.InvoiceDetailId).HasColumnName("invoice_detail_id");
            entity.Property(e => e.InvoiceId).HasColumnName("invoice_id");
            entity.Property(e => e.InvoiceType)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("invoice_type");
            entity.Property(e => e.Price)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("price");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.RoomId).HasColumnName("room_id");
            entity.Property(e => e.ServiceId).HasColumnName("service_id");

            entity.HasOne(d => d.Invoice).WithMany(p => p.InvoiceDetails)
                .HasForeignKey(d => d.InvoiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Invoice_D__invoi__628FA481");

            entity.HasOne(d => d.Room).WithMany(p => p.InvoiceDetails)
                .HasForeignKey(d => d.RoomId)
                .HasConstraintName("FK__Invoice_D__room___6383C8BA");

            entity.HasOne(d => d.Service).WithMany(p => p.InvoiceDetails)
                .HasForeignKey(d => d.ServiceId)
                .HasConstraintName("FK__Invoice_D__servi__6477ECF3");
        });

        modelBuilder.Entity<Location>(entity =>
        {
            entity.HasKey(e => e.LocationId).HasName("PK__Location__771831EA973DFF66");

            entity.Property(e => e.LocationId).HasColumnName("location_id");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("created_at");
            entity.Property(e => e.District)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("district");
            entity.Property(e => e.UpdatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("updated_at");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.PaymentId).HasName("PK__Payments__ED1FC9EAD5236DCF");

            entity.Property(e => e.PaymentId).HasColumnName("payment_id");
            entity.Property(e => e.Amount)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("amount");
            entity.Property(e => e.HotelBookingId).HasColumnName("hotel_booking_id");
            entity.Property(e => e.PaymentDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("payment_date");
            entity.Property(e => e.RestaurantBookingId).HasColumnName("restaurant_booking_id");
            entity.Property(e => e.ServiceBookingId).HasColumnName("service_booking_id");

            entity.HasOne(d => d.HotelBooking).WithMany(p => p.Payments)
                .HasForeignKey(d => d.HotelBookingId)
                .HasConstraintName("FK__Payments__hotel___68487DD7");
        });

        modelBuilder.Entity<RefreshToken>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__RefreshT__3214EC074D216FDF");

            entity.Property(e => e.AccountName)
                .HasMaxLength(255)
                .HasColumnName("account_name");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Revoked).HasDefaultValue(false);
            entity.Property(e => e.Token).HasMaxLength(500);

            entity.HasOne(d => d.AccountNameNavigation).WithMany(p => p.RefreshTokens)
                .HasForeignKey(d => d.AccountName)
                .HasConstraintName("FK__RefreshTo__accou__03F0984C");
        });

        modelBuilder.Entity<Room>(entity =>
        {
            entity.HasKey(e => e.RoomId).HasName("PK__Rooms__19675A8A76179965");

            entity.Property(e => e.RoomId).HasColumnName("room_id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.MaxOccupancy).HasColumnName("max_occupancy");
            entity.Property(e => e.PricePerNight)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("price_per_night");
            entity.Property(e => e.RoomCount).HasColumnName("room_count");
            entity.Property(e => e.RoomTypeId).HasColumnName("room_type_id");
            entity.Property(e => e.Status)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("status");

            entity.HasOne(d => d.RoomType).WithMany(p => p.Rooms)
                .HasForeignKey(d => d.RoomTypeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Rooms__room_type__412EB0B6");
        });

        modelBuilder.Entity<RoomImage>(entity =>
        {
            entity.HasKey(e => e.ImageId).HasName("PK__Room_Ima__DC9AC9556C1C521A");

            entity.ToTable("Room_Images");

            entity.Property(e => e.ImageId).HasColumnName("image_id");
            entity.Property(e => e.ImageUrl)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("image_url");
            entity.Property(e => e.RoomId).HasColumnName("room_id");

            entity.HasOne(d => d.Room).WithMany(p => p.RoomImages)
                .HasForeignKey(d => d.RoomId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Room_Imag__room___5CD6CB2B");
        });

        modelBuilder.Entity<RoomReview>(entity =>
        {
            entity.HasKey(e => e.RoomReviewId).HasName("PK__Room_Rev__C28CA8A3B0C8B835");

            entity.ToTable("Room_Reviews");

            entity.Property(e => e.RoomReviewId).HasColumnName("room_review_id");
            entity.Property(e => e.AccountName)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("account_name");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.ReviewDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("review_date");
            entity.Property(e => e.ReviewText).HasColumnName("review_text");
            entity.Property(e => e.RoomId).HasColumnName("room_id");

            entity.HasOne(d => d.AccountNameNavigation).WithMany(p => p.RoomReviews)
                .HasForeignKey(d => d.AccountName)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Room_Revi__accou__5629CD9C");

            entity.HasOne(d => d.Room).WithMany(p => p.RoomReviews)
                .HasForeignKey(d => d.RoomId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Room_Revi__room___571DF1D5");
        });

        modelBuilder.Entity<RoomType>(entity =>
        {
            entity.HasKey(e => e.RoomTypeId).HasName("PK__Room_Typ__42395E84C0FB19EF");

            entity.ToTable("Room_Types");

            entity.Property(e => e.RoomTypeId).HasColumnName("room_type_id");
            entity.Property(e => e.HotelId).HasColumnName("hotel_id");
            entity.Property(e => e.TypeName)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("type_name");

            entity.HasOne(d => d.Hotel).WithMany(p => p.RoomTypes)
                .HasForeignKey(d => d.HotelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Room_Type__hotel__3E52440B");
        });

        modelBuilder.Entity<Service>(entity =>
        {
            entity.HasKey(e => e.ServiceId).HasName("PK__Services__3E0DB8AF026BE88E");

            entity.Property(e => e.ServiceId).HasColumnName("service_id");
            entity.Property(e => e.Description).HasColumnName("description");
            entity.Property(e => e.HotelId).HasColumnName("hotel_id");
            entity.Property(e => e.ServiceName)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("service_name");
            entity.Property(e => e.ServicePrice)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("service_price");
            entity.Property(e => e.ServiceType)
                .IsRequired()
                .HasMaxLength(100)
                .HasColumnName("service_type");

            entity.HasOne(d => d.Hotel).WithMany(p => p.Services)
                .HasForeignKey(d => d.HotelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Services__hotel___440B1D61");
        });

        modelBuilder.Entity<ServiceBooking>(entity =>
        {
            entity.HasKey(e => e.ServiceBookingId).HasName("PK__Service___E1542436B626732B");

            entity.ToTable("Service_Bookings");

            entity.Property(e => e.ServiceBookingId).HasColumnName("service_booking_id");
            entity.Property(e => e.HotelBookingId).HasColumnName("hotel_booking_id");
            entity.Property(e => e.Quantity).HasColumnName("quantity");
            entity.Property(e => e.ServiceId).HasColumnName("service_id");
            entity.Property(e => e.TotalPrice)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("total_price");

            entity.HasOne(d => d.HotelBooking).WithMany(p => p.ServiceBookings)
                .HasForeignKey(d => d.HotelBookingId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Service_B__hotel__6B24EA82");

            entity.HasOne(d => d.Service).WithMany(p => p.ServiceBookings)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Service_B__servi__6C190EBB");
        });

        modelBuilder.Entity<ServiceImage>(entity =>
        {
            entity.HasKey(e => e.ImageId).HasName("PK__Service___DC9AC95584390B07");

            entity.ToTable("Service_Images");

            entity.Property(e => e.ImageId).HasColumnName("image_id");
            entity.Property(e => e.ImageUrl)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("image_url");
            entity.Property(e => e.ServiceId).HasColumnName("service_id");

            entity.HasOne(d => d.Service).WithMany(p => p.ServiceImages)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Service_I__servi__778AC167");
        });

        modelBuilder.Entity<ServiceInvoice>(entity =>
        {
            entity.HasKey(e => e.ServiceInvoiceId).HasName("PK__Service___A5F8C773FA8B7D65");

            entity.ToTable("Service_Invoices");

            entity.Property(e => e.ServiceInvoiceId).HasColumnName("service_invoice_id");
            entity.Property(e => e.InvoiceDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime")
                .HasColumnName("invoice_date");
            entity.Property(e => e.ServiceBookingId).HasColumnName("service_booking_id");
            entity.Property(e => e.Status)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("status");
            entity.Property(e => e.TotalAmount)
                .HasColumnType("decimal(18, 2)")
                .HasColumnName("total_amount");

            entity.HasOne(d => d.ServiceBooking).WithMany(p => p.ServiceInvoices)
                .HasForeignKey(d => d.ServiceBookingId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Service_I__servi__74AE54BC");
        });

        modelBuilder.Entity<ServiceReview>(entity =>
        {
            entity.HasKey(e => e.ServiceReviewId).HasName("PK__Service___4FF2E5DD3B02D3D5");

            entity.ToTable("Service_Reviews");

            entity.Property(e => e.ServiceReviewId).HasColumnName("service_review_id");
            entity.Property(e => e.AccountName)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("account_name");
            entity.Property(e => e.Rating).HasColumnName("rating");
            entity.Property(e => e.ReviewDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnName("review_date");
            entity.Property(e => e.ReviewText).HasColumnName("review_text");
            entity.Property(e => e.ServiceId).HasColumnName("service_id");

            entity.HasOne(d => d.AccountNameNavigation).WithMany(p => p.ServiceReviews)
                .HasForeignKey(d => d.AccountName)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Service_R__accou__6FE99F9F");

            entity.HasOne(d => d.Service).WithMany(p => p.ServiceReviews)
                .HasForeignKey(d => d.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Service_R__servi__70DDC3D8");
        });

        modelBuilder.Entity<Social>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Social__3214EC27CDC3D82B");

            entity.ToTable("Social");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.HotelId).HasColumnName("hotel_id");
            entity.Property(e => e.LinkUrl)
                .IsRequired()
                .HasMaxLength(255)
                .HasColumnName("Link_URL");

            entity.HasOne(d => d.Hotel).WithMany(p => p.Socials)
                .HasForeignKey(d => d.HotelId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Social__hotel_id__7A672E12");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}