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
    public class ServiceController : ControllerBase
    {
        private readonly HotelContext _context;

        public ServiceController(HotelContext context)
        {
            _context = context;
        }

        // POST api/service
        [HttpPost]
        public async Task<IActionResult> CreateService([FromBody] ServiceRequest.CreateServiceRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid service data.");
            }

            var service = new Service
            {
                HotelId = request.HotelId,
                ServiceName = request.ServiceName,
                ServicePrice = request.ServicePrice,
                Description = request.Description,
                ServiceType = request.ServiceType
            };

            _context.Services.Add(service);
            await _context.SaveChangesAsync();

            var serviceDto = new ServiceDto
            {
                ServiceId = service.ServiceId,
                HotelId = service.HotelId,
                ServiceName = service.ServiceName,
                ServicePrice = service.ServicePrice,
                Description = service.Description,
                ServiceType = service.ServiceType
            };

            return CreatedAtAction(nameof(GetService), new { id = service.ServiceId }, serviceDto);
        }

        // GET api/service?hotelId={hotelId}
        [HttpGet]
        public async Task<IActionResult> GetServicesByHotelId([FromQuery] int hotelId)
        {
            var services = await _context.Services.Where(s => s.HotelId == hotelId).ToListAsync();
            if (!services.Any())
            {
                return NotFound("No services found for this hotel.");
            }

            var serviceDtos = services.Select(s => new ServiceDto
            {
                ServiceId = s.ServiceId,
                HotelId = s.HotelId,
                ServiceName = s.ServiceName,
                ServicePrice = s.ServicePrice,
                Description = s.Description,
                ServiceType = s.ServiceType
            }).ToList();

            return Ok(serviceDtos);
        }

        // GET api/service/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetService(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null)
            {
                return NotFound();
            }

            var serviceDto = new ServiceDto
            {
                ServiceId = service.ServiceId,
                HotelId = service.HotelId,
                ServiceName = service.ServiceName,
                ServicePrice = service.ServicePrice,
                Description = service.Description,
                ServiceType = service.ServiceType
            };

            return Ok(serviceDto);
        }

        // PUT api/service/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateService(int id, [FromBody] ServiceRequest.UpdateServiceRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid service data.");
            }

            var service = await _context.Services.FindAsync(id);
            if (service == null)
            {
                return NotFound();
            }

            // Cập nhật thông tin dịch vụ
            if (!string.IsNullOrEmpty(request.ServiceName))
            {
                service.ServiceName = request.ServiceName;
            }
            if (request.ServicePrice.HasValue)
            {
                service.ServicePrice = request.ServicePrice.Value;
            }
            if (!string.IsNullOrEmpty(request.Description))
            {
                service.Description = request.Description;
            }
            if (!string.IsNullOrEmpty(request.ServiceType))
            {
                service.ServiceType = request.ServiceType;
            }

            _context.Services.Update(service);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/service/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteService(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service == null)
            {
                return NotFound();
            }

            _context.Services.Remove(service);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
