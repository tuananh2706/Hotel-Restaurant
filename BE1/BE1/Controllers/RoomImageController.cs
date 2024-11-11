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
    public class RoomImageController : ControllerBase
    {
        private readonly HotelContext _context;

        public RoomImageController(HotelContext context)
        {
            _context = context;
        }

        // POST api/roomimage
        [HttpPost]
        public async Task<IActionResult> CreateRoomImage([FromBody] RoomImageRequest.CreateRoomImageRequest roomImageRequest)
        {
            if (roomImageRequest == null)
            {
                return BadRequest("Invalid room image data.");
            }

            var roomImage = new RoomImage
            {
                RoomId = roomImageRequest.RoomId,
                ImageUrl = roomImageRequest.ImageUrl
            };

            _context.RoomImages.Add(roomImage);
            await _context.SaveChangesAsync();

            var roomImageDto = new RoomImageDto
            {
                ImageId = roomImage.ImageId,
                RoomId = roomImage.RoomId,
                ImageUrl = roomImage.ImageUrl
            };

            return CreatedAtAction(nameof(GetRoomImage), new { id = roomImage.ImageId }, roomImageDto);
        }

        // GET api/roomimage/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoomImage(int id)
        {
            var roomImage = await _context.RoomImages.FindAsync(id);
            if (roomImage == null)
            {
                return NotFound();
            }

            var roomImageDto = new RoomImageDto
            {
                ImageId = roomImage.ImageId,
                RoomId = roomImage.RoomId,
                ImageUrl = roomImage.ImageUrl
            };

            return Ok(roomImageDto);
        }

        // GET api/roomImage?roomId={roomID}
        [HttpGet]
        public async Task<IActionResult> GetRoomImagesByRoomId([FromQuery] int roomId)
        {
            var roomImages = await _context.RoomImages
                .Where(ri => ri.RoomId == roomId)
                .ToListAsync();

            if (!roomImages.Any())
            {
                return NotFound("No images found for the specified room ID.");
            }

            var roomImageDtos = roomImages.Select(ri => new RoomImageDto
            {
                ImageId = ri.ImageId,
                RoomId = ri.RoomId,
                ImageUrl = ri.ImageUrl
            }).ToList();

            return Ok(roomImageDtos);
        }

        // PUT api/roomimage/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoomImage(int id, [FromBody] RoomImageRequest.UpdateRoomImageRequest roomImageRequest)
        {
            if (roomImageRequest == null)
            {
                return BadRequest("Invalid room image data.");
            }

            var roomImage = await _context.RoomImages.FindAsync(id);
            if (roomImage == null)
            {
                return NotFound();
            }

            // Update the properties only if they are not null
            if (roomImageRequest.ImageUrl != null)
            {
                roomImage.ImageUrl = roomImageRequest.ImageUrl;
            }

            _context.RoomImages.Update(roomImage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/roomimage/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomImage(int id)
        {
            var roomImage = await _context.RoomImages.FindAsync(id);
            if (roomImage == null)
            {
                return NotFound();
            }

            _context.RoomImages.Remove(roomImage);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
