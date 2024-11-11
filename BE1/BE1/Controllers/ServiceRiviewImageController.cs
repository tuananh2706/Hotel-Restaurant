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
    public class ServicesReviewImageController : ControllerBase
    {
        private readonly HotelContext _context;

        public ServicesReviewImageController(HotelContext context)
        {
            _context = context;
        }

        // POST api/servicesreviewimage
        [HttpPost]
        public async Task<IActionResult> CreateServicesReviewImage([FromBody] ServicesReviewImageRequest.CreateServicesReviewImageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid services review image data.");
            }

            var servicesReviewImage = new ServicesReviewImage
            {
                ServiceReviewId = request.ServiceReviewId,
                ImageUrl = request.ImageUrl
            };

            await _context.ServicesReviewImages.AddAsync(servicesReviewImage);
            await _context.SaveChangesAsync();

            var servicesReviewImageDto = new ServicesReviewImageDto
            {
                ServicesReviewImageId = servicesReviewImage.ServicesReviewImageId,
                ServiceReviewId = servicesReviewImage.ServiceReviewId,
                ImageUrl = servicesReviewImage.ImageUrl
            };

            return CreatedAtAction(nameof(GetServicesReviewImage), new { id = servicesReviewImage.ServicesReviewImageId }, servicesReviewImageDto);
        }

        // GET api/servicesreviewimage
        [HttpGet]
        public async Task<IActionResult> GetAllServicesReviewImages()
        {
            var servicesReviewImages = await _context.ServicesReviewImages.ToListAsync();
            var servicesReviewImageDtos = servicesReviewImages.Select(sri => new ServicesReviewImageDto
            {
                ServicesReviewImageId = sri.ServicesReviewImageId,
                ServiceReviewId = sri.ServiceReviewId,
                ImageUrl = sri.ImageUrl
            }).ToList();

            return Ok(servicesReviewImageDtos);
        }

        // GET api/servicesreviewimage/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetServicesReviewImage(int id)
        {
            var servicesReviewImage = await _context.ServicesReviewImages.FindAsync(id);
            if (servicesReviewImage == null)
            {
                return NotFound();
            }

            var servicesReviewImageDto = new ServicesReviewImageDto
            {
                ServicesReviewImageId = servicesReviewImage.ServicesReviewImageId,
                ServiceReviewId = servicesReviewImage.ServiceReviewId,
                ImageUrl = servicesReviewImage.ImageUrl
            };

            return Ok(servicesReviewImageDto);
        }

        // PUT api/servicesreviewimage/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateServicesReviewImage(int id, [FromBody] ServicesReviewImageRequest.UpdateServicesReviewImageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid services review image data.");
            }

            var servicesReviewImage = await _context.ServicesReviewImages.FindAsync(id);
            if (servicesReviewImage == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(request.ImageUrl))
            {
                servicesReviewImage.ImageUrl = request.ImageUrl;
            }

            _context.ServicesReviewImages.Update(servicesReviewImage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/servicesreviewimage/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServicesReviewImage(int id)
        {
            var servicesReviewImage = await _context.ServicesReviewImages.FindAsync(id);
            if (servicesReviewImage == null)
            {
                return NotFound();
            }

            _context.ServicesReviewImages.Remove(servicesReviewImage);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
