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
    public class HotelImageController : ControllerBase
    {
        private readonly HotelContext _context;

        public HotelImageController(HotelContext context)
        {
            _context = context;
        }

        // POST api/hotelimage
        [HttpPost]
        public async Task<IActionResult> CreateHotelImage([FromBody] HotelImageRequest.CreateHotelImageRequest imageRequest)
        {
            if (imageRequest == null)
            {
                return BadRequest("Invalid image data.");
            }

            var hotelImage = new HotelImage
            {
                HotelId = imageRequest.HotelId,
                ImageUrl = imageRequest.ImageUrl
            };

            await _context.HotelImages.AddAsync(hotelImage);
            await _context.SaveChangesAsync();

            var imageDto = new HotelImageDto
            {
                HotelImagesId = hotelImage.HotelImagesId,
                HotelId = hotelImage.HotelId,
                ImageUrl = hotelImage.ImageUrl
            };

            return CreatedAtAction(nameof(GetHotelImage), new { id = hotelImage.HotelImagesId }, imageDto);
        }

        // GET api/hotelimage
        [HttpGet]
        public async Task<IActionResult> GetAllHotelImages()
        {
            var images = await _context.HotelImages.ToListAsync();
            var imageDtos = images.Select(i => new HotelImageDto
            {
                HotelImagesId = i.HotelImagesId,
                HotelId = i.HotelId,
                ImageUrl = i.ImageUrl
            }).ToList();

            return Ok(imageDtos);
        }

        // GET api/hotelimage/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHotelImage(int id)
        {
            var image = await _context.HotelImages.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            var imageDto = new HotelImageDto
            {
                HotelImagesId = image.HotelImagesId,
                HotelId = image.HotelId,
                ImageUrl = image.ImageUrl
            };

            return Ok(imageDto);
        }

        // PUT api/hotelimage/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHotelImage(int id, [FromBody] HotelImageRequest.UpdateHotelImageRequest imageRequest)
        {
            if (imageRequest == null)
            {
                return BadRequest("Invalid image data.");
            }

            var image = await _context.HotelImages.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            // Cập nhật thông tin chỉ khi thuộc tính không null
            if (imageRequest.HotelId != null)
            {
                image.HotelId = imageRequest.HotelId.Value;
            }
            if (imageRequest.ImageUrl != null)
            {
                image.ImageUrl = imageRequest.ImageUrl;
            }

            _context.HotelImages.Update(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/hotelimage/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotelImage(int id)
        {
            var image = await _context.HotelImages.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            _context.HotelImages.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
