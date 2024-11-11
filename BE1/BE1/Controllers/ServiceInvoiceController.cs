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
    public class ServiceInvoiceController : ControllerBase
    {
        private readonly HotelContext _context;

        public ServiceInvoiceController(HotelContext context)
        {
            _context = context;
        }

        // POST api/serviceinvoice
        [HttpPost]
        public async Task<IActionResult> CreateServiceInvoice([FromBody] ServiceInvoiceRequest.CreateServiceInvoiceRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid service invoice data.");
            }

            var serviceInvoice = new ServiceInvoice
            {
                ServiceBookingId = request.ServiceBookingId,
                InvoiceDate = request.InvoiceDate,
                TotalAmount = request.TotalAmount,
                Status = request.Status
            };

            _context.ServiceInvoices.Add(serviceInvoice);
            await _context.SaveChangesAsync();

            var serviceInvoiceDto = new ServiceInvoiceDto
            {
                ServiceInvoiceId = serviceInvoice.ServiceInvoiceId,
                ServiceBookingId = serviceInvoice.ServiceBookingId,
                InvoiceDate = serviceInvoice.InvoiceDate,
                TotalAmount = serviceInvoice.TotalAmount,
                Status = serviceInvoice.Status
            };

            return CreatedAtAction(nameof(GetServiceInvoice), new { id = serviceInvoice.ServiceInvoiceId }, serviceInvoiceDto);
        }

        // GET api/serviceinvoice
        [HttpGet]
        public async Task<IActionResult> GetAllServiceInvoices()
        {
            var serviceInvoices = await _context.ServiceInvoices.ToListAsync();
            var serviceInvoiceDtos = serviceInvoices.Select(si => new ServiceInvoiceDto
            {
                ServiceInvoiceId = si.ServiceInvoiceId,
                ServiceBookingId = si.ServiceBookingId,
                InvoiceDate = si.InvoiceDate,
                TotalAmount = si.TotalAmount,
                Status = si.Status
            }).ToList();

            return Ok(serviceInvoiceDtos);
        }

        // GET api/serviceinvoice/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetServiceInvoice(int id)
        {
            var serviceInvoice = await _context.ServiceInvoices.FindAsync(id);
            if (serviceInvoice == null)
            {
                return NotFound();
            }

            var serviceInvoiceDto = new ServiceInvoiceDto
            {
                ServiceInvoiceId = serviceInvoice.ServiceInvoiceId,
                ServiceBookingId = serviceInvoice.ServiceBookingId,
                InvoiceDate = serviceInvoice.InvoiceDate,
                TotalAmount = serviceInvoice.TotalAmount,
                Status = serviceInvoice.Status
            };

            return Ok(serviceInvoiceDto);
        }

        // PUT api/serviceinvoice/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateServiceInvoice(int id, [FromBody] ServiceInvoiceRequest.UpdateServiceInvoiceRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid service invoice data.");
            }

            var serviceInvoice = await _context.ServiceInvoices.FindAsync(id);
            if (serviceInvoice == null)
            {
                return NotFound();
            }

            if (request.ServiceBookingId.HasValue)
            {
                serviceInvoice.ServiceBookingId = request.ServiceBookingId.Value;
            }
            if (request.InvoiceDate.HasValue)
            {
                serviceInvoice.InvoiceDate = request.InvoiceDate.Value;
            }
            if (request.TotalAmount.HasValue)
            {
                serviceInvoice.TotalAmount = request.TotalAmount.Value;
            }
            if (!string.IsNullOrEmpty(request.Status))
            {
                serviceInvoice.Status = request.Status;
            }

            _context.ServiceInvoices.Update(serviceInvoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/serviceinvoice/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceInvoice(int id)
        {
            var serviceInvoice = await _context.ServiceInvoices.FindAsync(id);
            if (serviceInvoice == null)
            {
                return NotFound();
            }

            _context.ServiceInvoices.Remove(serviceInvoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
