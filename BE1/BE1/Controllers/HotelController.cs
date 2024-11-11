using Microsoft.AspNetCore.Mvc;
using BE1.Models;
using Hotel.Request;
using Hotel.DTOs;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly HotelContext _context;

        public HotelController(HotelContext context)
        {
            _context = context;
        }

        // POST api/hotel
        [HttpPost]
        public async Task<IActionResult> CreateHotel([FromBody] HotelRequest.CreateHotelRequest hotelRequest)
        {
            if (hotelRequest == null)
            {
                return BadRequest("Invalid hotel data.");
            }

            var hotel = new BE1.Models.Hotel
            {
                HotelName = hotelRequest.HotelName,
                Address = hotelRequest.Address,
                City = hotelRequest.City,
                District = hotelRequest.District,
                State = hotelRequest.State,
                Description = hotelRequest.Description
            };

            await _context.Hotels.AddAsync(hotel);
            await _context.SaveChangesAsync();

            var hotelDto = new HotelDto
            {
                HotelId = hotel.HotelId,
                HotelName = hotel.HotelName,
                Address = hotel.Address,
                City = hotel.City,
                District = hotel.District,
                State = hotel.State,
                Description = hotel.Description
            };

            return CreatedAtAction(nameof(GetHotel), new { id = hotel.HotelId }, hotelDto);
        }

        // GET api/hotel
        [HttpGet]
        public async Task<IActionResult> GetAllHotels()
        {
            var hotels = await _context.Hotels.ToListAsync();
            var hotelDtos = hotels.Select(h => new HotelDto
            {
                HotelId = h.HotelId,
                HotelName = h.HotelName,
                Address = h.Address,
                City = h.City,
                District = h.District,
                State = h.State,
                Description = h.Description
            }).ToList();

            return Ok(hotelDtos);
        }

        // GET api/hotel/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);
            if (hotel == null)
            {
                return NotFound();
            }

            var hotelDto = new HotelDto
            {
                HotelId = hotel.HotelId,
                HotelName = hotel.HotelName,
                Address = hotel.Address,
                City = hotel.City,
                District = hotel.District,
                State = hotel.State,
                Description = hotel.Description
            };

            return Ok(hotelDto);
        }

        // PUT api/hotel/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHotel(int id, [FromBody] HotelRequest.UpdateHotelRequest hotelRequest)
        {
            if (hotelRequest == null)
            {
                return BadRequest("Invalid hotel data.");
            }

            var hotel = await _context.Hotels.FindAsync(id);
            if (hotel == null)
            {
                return NotFound();
            }

            // Cập nhật thông tin chỉ khi thuộc tính không null
            if (hotelRequest.HotelName != null)
            {
                hotel.HotelName = hotelRequest.HotelName;
            }
            if (hotelRequest.Address != null)
            {
                hotel.Address = hotelRequest.Address;
            }
            if (hotelRequest.City != null)
            {
                hotel.City = hotelRequest.City;
            }
            if (hotelRequest.District != null)
            {
                hotel.District = hotelRequest.District;
            }
            if (hotelRequest.State != null)
            {
                hotel.State = hotelRequest.State;
            }
            if (hotelRequest.Description != null)
            {
                hotel.Description = hotelRequest.Description;
            }

            _context.Hotels.Update(hotel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/hotel/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotel(int id)
        {
            var hotel = await _context.Hotels.FindAsync(id);
            if (hotel == null)
            {
                return NotFound();
            }

            _context.Hotels.Remove(hotel);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
