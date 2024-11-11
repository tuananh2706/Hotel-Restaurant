using Microsoft.AspNetCore.Mvc;
using BE1.Models;
using Hotel.Request;
using Hotel.DTOs;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomTypeController : ControllerBase
    {
        private readonly HotelContext _context;

        public RoomTypeController(HotelContext context)
        {
            _context = context;
        }

        // POST api/roomtype
        [HttpPost]
        public async Task<IActionResult> CreateRoomType([FromBody] RoomTypeRequest.CreateRoomTypeRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid room type data.");
            }

            var roomType = new RoomType
            {
                HotelId = request.HotelId,
                TypeName = request.TypeName
            };

            _context.RoomTypes.Add(roomType);
            await _context.SaveChangesAsync();

            var roomTypeDto = new RoomTypeDto
            {
                RoomTypeId = roomType.RoomTypeId,
                HotelId = roomType.HotelId,
                TypeName = roomType.TypeName
            };

            return CreatedAtAction(nameof(GetRoomType), new { id = roomType.RoomTypeId }, roomTypeDto);
        }

        // GET api/roomtype?hotelId={hotelId}
        [HttpGet]
        public async Task<IActionResult> GetRoomTypesByHotelId([FromQuery] int hotelId)
        {
            var roomTypes = await _context.RoomTypes.Where(rt => rt.HotelId == hotelId).ToListAsync();
            if (!roomTypes.Any())
            {
                return NotFound("No room types found for this hotel.");
            }

            var roomTypeDtos = roomTypes.Select(rt => new RoomTypeDto
            {
                RoomTypeId = rt.RoomTypeId,
                HotelId = rt.HotelId,
                TypeName = rt.TypeName
            }).ToList();

            return Ok(roomTypeDtos);
        }

        // GET api/roomtype/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoomType(int id)
        {
            var roomType = await _context.RoomTypes.FindAsync(id);
            if (roomType == null)
            {
                return NotFound();
            }

            var roomTypeDto = new RoomTypeDto
            {
                RoomTypeId = roomType.RoomTypeId,
                HotelId = roomType.HotelId,
                TypeName = roomType.TypeName
            };

            return Ok(roomTypeDto);
        }

        // PUT api/roomtype/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoomType(int id, [FromBody] RoomTypeRequest.UpdateRoomTypeRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid room type data.");
            }

            var roomType = await _context.RoomTypes.FindAsync(id);
            if (roomType == null)
            {
                return NotFound();
            }

            // Update room type information
            if (!string.IsNullOrEmpty(request.TypeName))
            {
                roomType.TypeName = request.TypeName;
            }

            _context.RoomTypes.Update(roomType);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/roomtype/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomType(int id)
        {
            var roomType = await _context.RoomTypes.FindAsync(id);
            if (roomType == null)
            {
                return NotFound();
            }

            _context.RoomTypes.Remove(roomType);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
