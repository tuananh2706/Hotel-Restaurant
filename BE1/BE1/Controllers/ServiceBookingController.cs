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
    public class ServiceBookingController : ControllerBase
    {
        private readonly HotelContext _context;

        public ServiceBookingController(HotelContext context)
        {
            _context = context;
        }

        // POST api/servicebooking
        [HttpPost]
        public async Task<IActionResult> CreateServiceBooking([FromBody] ServiceBookingRequest.CreateServiceBookingRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid service booking data.");
            }

            var serviceBooking = new ServiceBooking
            {
                HotelBookingId = request.HotelBookingId,
                ServiceId = request.ServiceId,
                Quantity = request.Quantity
            };

            _context.ServiceBookings.Add(serviceBooking);
            await _context.SaveChangesAsync();

            var serviceBookingDto = new ServiceBookingDto
            {
                ServiceBookingId = serviceBooking.ServiceBookingId,
                HotelBookingId = serviceBooking.HotelBookingId,
                ServiceId = serviceBooking.ServiceId,
                Quantity = serviceBooking.Quantity,
                TotalPrice = serviceBooking.TotalPrice
            };

            return CreatedAtAction(nameof(GetServiceBooking), new { id = serviceBooking.ServiceBookingId }, serviceBookingDto);
        }

        // GET api/servicebooking
        [HttpGet]
        public async Task<IActionResult> GetAllServiceBookings()
        {
            var serviceBookings = await _context.ServiceBookings.ToListAsync();
            var serviceBookingDtos = serviceBookings.Select(sb => new ServiceBookingDto
            {
                ServiceBookingId = sb.ServiceBookingId,
                HotelBookingId = sb.HotelBookingId,
                ServiceId = sb.ServiceId,
                Quantity = sb.Quantity,
                TotalPrice = sb.TotalPrice
            }).ToList();

            return Ok(serviceBookingDtos);
        }

        // GET api/servicebooking/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetServiceBooking(int id)
        {
            var serviceBooking = await _context.ServiceBookings.FindAsync(id);
            if (serviceBooking == null)
            {
                return NotFound();
            }

            var serviceBookingDto = new ServiceBookingDto
            {
                ServiceBookingId = serviceBooking.ServiceBookingId,
                HotelBookingId = serviceBooking.HotelBookingId,
                ServiceId = serviceBooking.ServiceId,
                Quantity = serviceBooking.Quantity,
                TotalPrice = serviceBooking.TotalPrice
            };

            return Ok(serviceBookingDto);
        }

        // PUT api/servicebooking/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateServiceBooking(int id, [FromBody] ServiceBookingRequest.UpdateServiceBookingRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid service booking data.");
            }

            var serviceBooking = await _context.ServiceBookings.FindAsync(id);
            if (serviceBooking == null)
            {
                return NotFound();
            }

            if (request.HotelBookingId.HasValue)
            {
                serviceBooking.HotelBookingId = request.HotelBookingId.Value;
            }
            if (request.ServiceId.HasValue)
            {
                serviceBooking.ServiceId = request.ServiceId.Value;
            }
            if (request.Quantity.HasValue)
            {
                serviceBooking.Quantity = request.Quantity.Value;
            }
            if (request.TotalPrice.HasValue)
            {
                serviceBooking.TotalPrice = request.TotalPrice.Value;
            }

            _context.ServiceBookings.Update(serviceBooking);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/servicebooking/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceBooking(int id)
        {
            var serviceBooking = await _context.ServiceBookings.FindAsync(id);
            if (serviceBooking == null)
            {
                return NotFound();
            }

            _context.ServiceBookings.Remove(serviceBooking);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
