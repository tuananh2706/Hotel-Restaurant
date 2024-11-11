using Microsoft.AspNetCore.Mvc;
using BE1.Models;
using Hotel.Request;
using Hotel.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelReviewImageController : ControllerBase
    {
        private readonly HotelContext _context;

        public HotelReviewImageController(HotelContext context)
        {
            _context = context;
        }

        // POST api/hotelreviewimage
        [HttpPost]
        public async Task<IActionResult> CreateHotelReviewImage([FromBody] HotelReviewImageRequest.CreateHotelReviewImageRequest imageRequest)
        {
            if (imageRequest == null)
            {
                return BadRequest("Invalid image data.");
            }

            var hotelReviewImage = new HotelReviewImage
            {
                HotelReviewId = imageRequest.HotelReviewId,
                ImageUrl = imageRequest.ImageUrl
            };

            await _context.HotelReviewImages.AddAsync(hotelReviewImage);
            await _context.SaveChangesAsync();

            var imageDto = new HotelReviewImageDto
            {
                HotelReviewImageId = hotelReviewImage.HotelReviewImageId,
                HotelReviewId = hotelReviewImage.HotelReviewId,
                ImageUrl = hotelReviewImage.ImageUrl
            };

            return CreatedAtAction(nameof(GetHotelReviewImage), new { id = hotelReviewImage.HotelReviewImageId }, imageDto);
        }

        // GET api/hotelreviewimage
        [HttpGet]
        public async Task<IActionResult> GetAllHotelReviewImages()
        {
            var images = await _context.HotelReviewImages.ToListAsync();
            var imageDtos = images.Select(i => new HotelReviewImageDto
            {
                HotelReviewImageId = i.HotelReviewImageId,
                HotelReviewId = i.HotelReviewId,
                ImageUrl = i.ImageUrl
            }).ToList();

            return Ok(imageDtos);
        }

        // GET api/hotelreviewimage/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHotelReviewImage(int id)
        {
            var image = await _context.HotelReviewImages.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            var imageDto = new HotelReviewImageDto
            {
                HotelReviewImageId = image.HotelReviewImageId,
                HotelReviewId = image.HotelReviewId,
                ImageUrl = image.ImageUrl
            };

            return Ok(imageDto);
        }

        // PUT api/hotelreviewimage/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHotelReviewImage(int id, [FromBody] HotelReviewImageRequest.UpdateHotelReviewImageRequest imageRequest)
        {
            if (imageRequest == null)
            {
                return BadRequest("Invalid image data.");
            }

            var image = await _context.HotelReviewImages.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            // Update information only if the property is not null
            if (imageRequest.HotelReviewId != null)
            {
                image.HotelReviewId = imageRequest.HotelReviewId.Value;
            }
            if (imageRequest.ImageUrl != null)
            {
                image.ImageUrl = imageRequest.ImageUrl;
            }

            _context.HotelReviewImages.Update(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/hotelreviewimage/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotelReviewImage(int id)
        {
            var image = await _context.HotelReviewImages.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            _context.HotelReviewImages.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
