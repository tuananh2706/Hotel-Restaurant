using Microsoft.AspNetCore.Mvc;
using BE1.Models;
using Hotel.Request;
using Hotel.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly HotelContext _context;

        public RoomController(HotelContext context)
        {
            _context = context;
        }

        // POST api/room
        [HttpPost]
        public async Task<IActionResult> CreateRoom([FromBody] RoomRequest.CreateRoomRequest roomRequest)
        {
            if (roomRequest == null)
            {
                return BadRequest("Invalid room data.");
            }

            var room = new Room
            {
                RoomTypeId = roomRequest.RoomTypeId,
                PricePerNight = roomRequest.PricePerNight,
                Status = roomRequest.Status,
                Description = roomRequest.Description,
                MaxOccupancy = roomRequest.MaxOccupancy,
                RoomCount = roomRequest.RoomCount,
            };

            await _context.Rooms.AddAsync(room);
            await _context.SaveChangesAsync();

            var roomDto = new RoomDto
            {
                RoomId = room.RoomId,
                RoomTypeId = room.RoomTypeId,
                PricePerNight = room.PricePerNight,
                Status = room.Status,
                Description = room.Description,
                MaxOccupancy = room.MaxOccupancy,
                RoomCount = room.RoomCount,
            };

            return CreatedAtAction(nameof(GetRoom), new { id = room.RoomId }, roomDto);
        }

        // GET api/room/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                return NotFound("Room not found.");
            }

            var roomDto = new RoomDto
            {
                RoomId = room.RoomId,
                RoomTypeId = room.RoomTypeId,
                PricePerNight = room.PricePerNight,
                Status = room.Status,
                Description = room.Description,
                MaxOccupancy = room.MaxOccupancy,
                RoomCount = room.RoomCount,
            };

            return Ok(roomDto);
        }

        // GET api/room?roomTypeId={roomTypeId}
        [HttpGet]
        public async Task<IActionResult> GetRoomsByRoomTypeId([FromQuery] int roomTypeId)
        {
            var rooms = await _context.Rooms
                .Where(r => r.RoomTypeId == roomTypeId)
                .Select(r => new RoomDto
                {
                    RoomId = r.RoomId,
                    RoomTypeId = r.RoomTypeId,
                    PricePerNight = r.PricePerNight,
                    Status = r.Status,
                    Description = r.Description,
                    MaxOccupancy = r.MaxOccupancy,
                    RoomCount = r.RoomCount
                })
                .ToListAsync();

            if (!rooms.Any())
            {
                return NotFound("No rooms found for this room type.");
            }

            return Ok(rooms);
        }

        // PUT api/room/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoom(int id, [FromBody] RoomRequest.UpdateRoomRequest roomRequest)
        {
            if (roomRequest == null)
            {
                return BadRequest("Invalid room data.");
            }

            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                return NotFound("Room not found.");
            }

            if (roomRequest.RoomTypeId.HasValue)
            {
                room.RoomTypeId = roomRequest.RoomTypeId.Value;
            }
            if (roomRequest.PricePerNight.HasValue)
            {
                room.PricePerNight = roomRequest.PricePerNight.Value;
            }
            if (!string.IsNullOrEmpty(roomRequest.Status))
            {
                room.Status = roomRequest.Status;
            }

            if (!string.IsNullOrEmpty(roomRequest.Description))
            {
                room.Description = roomRequest.Description;
            }
            if (roomRequest.MaxOccupancy.HasValue)
            {
                room.MaxOccupancy = roomRequest.MaxOccupancy.Value;
            }
            if (roomRequest.RoomCount.HasValue)
            {
                room.RoomCount = roomRequest.RoomCount.Value;
            }

            _context.Rooms.Update(room);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/room/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoom(int id)
        {
            var room = await _context.Rooms.FindAsync(id);
            if (room == null)
            {
                return NotFound("Room not found.");
            }

            _context.Rooms.Remove(room);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
