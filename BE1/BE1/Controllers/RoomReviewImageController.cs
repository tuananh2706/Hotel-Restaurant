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
    public class RoomReviewImageController : ControllerBase
    {
        private readonly HotelContext _context;

        public RoomReviewImageController(HotelContext context)
        {
            _context = context;
        }

        // POST api/roomreviewimage
        [HttpPost]
        public async Task<IActionResult> CreateRoomReviewImage([FromBody] RoomReviewImageRequest.CreateRoomReviewImageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid room review image data.");
            }

            var roomReviewImage = new RoomReviewImage
            {
                RoomReviewId = request.RoomReviewId,
                ImageUrl = request.ImageUrl
            };

            _context.RoomReviewImages.Add(roomReviewImage);
            await _context.SaveChangesAsync();

            var roomReviewImageDto = new RoomReviewImageDto
            {
                RoomReviewImageId = roomReviewImage.RoomReviewImageId,
                RoomReviewId = roomReviewImage.RoomReviewId,
                ImageUrl = roomReviewImage.ImageUrl
            };

            return CreatedAtAction(nameof(GetRoomReviewImage), new { id = roomReviewImage.RoomReviewImageId }, roomReviewImageDto);
        }

        // GET api/roomreviewimage
        [HttpGet]
        public async Task<IActionResult> GetAllRoomReviewImages()
        {
            var roomReviewImages = await _context.RoomReviewImages.ToListAsync();
            var roomReviewImageDtos = roomReviewImages.Select(rii => new RoomReviewImageDto
            {
                RoomReviewImageId = rii.RoomReviewImageId,
                RoomReviewId = rii.RoomReviewId,
                ImageUrl = rii.ImageUrl
            }).ToList();

            return Ok(roomReviewImageDtos);
        }

        // GET api/roomreviewimage/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoomReviewImage(int id)
        {
            var roomReviewImage = await _context.RoomReviewImages.FindAsync(id);
            if (roomReviewImage == null)
            {
                return NotFound();
            }

            var roomReviewImageDto = new RoomReviewImageDto
            {
                RoomReviewImageId = roomReviewImage.RoomReviewImageId,
                RoomReviewId = roomReviewImage.RoomReviewId,
                ImageUrl = roomReviewImage.ImageUrl
            };

            return Ok(roomReviewImageDto);
        }

        // PUT api/roomreviewimage/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoomReviewImage(int id, [FromBody] RoomReviewImageRequest.UpdateRoomReviewImageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid room review image data.");
            }

            var roomReviewImage = await _context.RoomReviewImages.FindAsync(id);
            if (roomReviewImage == null)
            {
                return NotFound();
            }

            if (request.ImageUrl != null)
            {
                roomReviewImage.ImageUrl = request.ImageUrl;
            }

            _context.RoomReviewImages.Update(roomReviewImage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/roomreviewimage/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomReviewImage(int id)
        {
            var roomReviewImage = await _context.RoomReviewImages.FindAsync(id);
            if (roomReviewImage == null)
            {
                return NotFound();
            }

            _context.RoomReviewImages.Remove(roomReviewImage);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
