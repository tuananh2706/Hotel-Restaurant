using Microsoft.AspNetCore.Mvc;
using BE1.Models;
using Hotel.Request;
using Hotel.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelBookingController : ControllerBase
    {
        private readonly HotelContext _context;

        public HotelBookingController(HotelContext context)
        {
            _context = context;
        }

        // POST api/hotelbooking
        [HttpPost]
        public async Task<IActionResult> CreateHotelBooking([FromBody] HotelBookingRequest.CreateBookingRequest bookingRequest)
        {
            if (bookingRequest == null)
            {
                return BadRequest("Invalid booking data.");
            }

            var hotelBooking = new HotelBooking
            {
                AccountName = bookingRequest.AccountName,
                RoomId = bookingRequest.RoomId,
                HotelId = bookingRequest.HotelId,
                CheckInDate = bookingRequest.CheckInDate,
                CheckOutDate = bookingRequest.CheckOutDate,
                TotalPrice = bookingRequest.TotalPrice,
                Status = bookingRequest.Status,
                CreateAt = DateTime.Now // Gán thời gian tạo là thời điểm hiện tại
            };

            await _context.HotelBookings.AddAsync(hotelBooking);
            await _context.SaveChangesAsync();

            var bookingDto = new HotelBookingDto
            {
                HotelBookingId = hotelBooking.HotelBookingId,
                AccountName = hotelBooking.AccountName,
                RoomId = hotelBooking.RoomId,
                HotelId = hotelBooking.HotelId,
                CheckInDate = hotelBooking.CheckInDate,
                CheckOutDate = hotelBooking.CheckOutDate,
                TotalPrice = hotelBooking.TotalPrice,
                Status = hotelBooking.Status,
                CreateAt = hotelBooking.CreateAt
            };

            return CreatedAtAction(nameof(GetHotelBooking), new { id = hotelBooking.HotelBookingId }, bookingDto);
        }

        // GET api/hotelbooking
        [HttpGet]
        public async Task<IActionResult> GetAllHotelBookings()
        {
            var bookings = await _context.HotelBookings.ToListAsync();
            var bookingDtos = bookings.Select(b => new HotelBookingDto
            {
                HotelBookingId = b.HotelBookingId,
                AccountName = b.AccountName,
                RoomId = b.RoomId,
                HotelId = b.HotelId,
                CheckInDate = b.CheckInDate,
                CheckOutDate = b.CheckOutDate,
                TotalPrice = b.TotalPrice,
                Status = b.Status,
                CreateAt = b.CreateAt
            }).ToList();

            return Ok(bookingDtos);
        }

        // GET api/hotelbooking/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHotelBooking(int id)
        {
            var booking = await _context.HotelBookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            var bookingDto = new HotelBookingDto
            {
                HotelBookingId = booking.HotelBookingId,
                AccountName = booking.AccountName,
                RoomId = booking.RoomId,
                HotelId = booking.HotelId,
                CheckInDate = booking.CheckInDate,
                CheckOutDate = booking.CheckOutDate,
                TotalPrice = booking.TotalPrice,
                Status = booking.Status,
                CreateAt = booking.CreateAt
            };

            return Ok(bookingDto);
        }

        // PUT api/hotelbooking/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHotelBooking(int id, [FromBody] HotelBookingRequest.UpdateBookingRequest bookingRequest)
        {
            if (bookingRequest == null)
            {
                return BadRequest("Invalid booking data.");
            }

            var booking = await _context.HotelBookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            // Cập nhật thông tin chỉ khi thuộc tính không null
            if (bookingRequest.AccountName != null)
            {
                booking.AccountName = bookingRequest.AccountName;
            }
            if (bookingRequest.RoomId != null)
            {
                booking.RoomId = bookingRequest.RoomId.Value;
            }
            if (bookingRequest.HotelId != null)
            {
                booking.HotelId = bookingRequest.HotelId.Value;
            }
            if (bookingRequest.CheckInDate != null)
            {
                booking.CheckInDate = bookingRequest.CheckInDate.Value;
            }
            if (bookingRequest.CheckOutDate != null)
            {
                booking.CheckOutDate = bookingRequest.CheckOutDate.Value;
            }
            if (bookingRequest.TotalPrice != null)
            {
                booking.TotalPrice = bookingRequest.TotalPrice;
            }
            if (bookingRequest.Status != null)
            {
                booking.Status = bookingRequest.Status;
            }
            if (bookingRequest.CreateAt != null)
            {
                booking.CreateAt = bookingRequest.CreateAt;
            }

            _context.HotelBookings.Update(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/hotelbooking/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotelBooking(int id)
        {
            var booking = await _context.HotelBookings.FindAsync(id);
            if (booking == null)
            {
                return NotFound();
            }

            _context.HotelBookings.Remove(booking);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
