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
    public class ServiceImageController : ControllerBase
    {
        private readonly HotelContext _context;

        public ServiceImageController(HotelContext context)
        {
            _context = context;
        }

        // POST api/serviceimage
        [HttpPost]
        public async Task<IActionResult> CreateServiceImage([FromBody] ServiceImageRequest.CreateServiceImageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid service image data.");
            }

            var serviceImage = new ServiceImage
            {
                ServiceId = request.ServiceId,
                ImageUrl = request.ImageUrl
            };

            _context.ServiceImages.Add(serviceImage);
            await _context.SaveChangesAsync();

            var serviceImageDto = new ServiceImageDto
            {
                ImageId = serviceImage.ImageId,
                ServiceId = serviceImage.ServiceId,
                ImageUrl = serviceImage.ImageUrl
            };

            return CreatedAtAction(nameof(GetServiceImage), new { id = serviceImage.ImageId }, serviceImageDto);
        }

        // GET api/serviceimage/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetServiceImage(int id)
        {
            var serviceImage = await _context.ServiceImages.FindAsync(id);
            if (serviceImage == null)
            {
                return NotFound();
            }

            var serviceImageDto = new ServiceImageDto
            {
                ImageId = serviceImage.ImageId,
                ServiceId = serviceImage.ServiceId,
                ImageUrl = serviceImage.ImageUrl
            };

            return Ok(serviceImageDto);
        }

        // GET api/serviceimage?serviceId={serviceId}
        [HttpGet]
        public async Task<IActionResult> GetServiceImageByServiceId([FromQuery] int serviceId)
        {
            var serviceImages = await _context.ServiceImages
                .Where(si => si.ServiceId == serviceId)
                .ToListAsync();

            if (!serviceImages.Any())
            {
                return NotFound();
            }

            var serviceImageDtos = serviceImages.Select(serviceImage => new ServiceImageDto
            {
                ImageId = serviceImage.ImageId,
                ServiceId = serviceImage.ServiceId,
                ImageUrl = serviceImage.ImageUrl
            }).ToList();

            return Ok(serviceImageDtos);
        }

        // PUT api/serviceimage/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateServiceImage(int id, [FromBody] ServiceImageRequest.UpdateServiceImageRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid service image data.");
            }

            var serviceImage = await _context.ServiceImages.FindAsync(id);
            if (serviceImage == null)
            {
                return NotFound();
            }

            if (request.ServiceId.HasValue)
            {
                serviceImage.ServiceId = request.ServiceId.Value;
            }
            if (!string.IsNullOrEmpty(request.ImageUrl))
            {
                serviceImage.ImageUrl = request.ImageUrl;
            }

            _context.ServiceImages.Update(serviceImage);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/serviceimage/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceImage(int id)
        {
            var serviceImage = await _context.ServiceImages.FindAsync(id);
            if (serviceImage == null)
            {
                return NotFound();
            }

            _context.ServiceImages.Remove(serviceImage);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
