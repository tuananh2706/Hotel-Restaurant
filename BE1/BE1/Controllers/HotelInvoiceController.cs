using Microsoft.AspNetCore.Mvc;
using BE1.Models;
using Hotel.Request;
using Hotel.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelInvoiceController : ControllerBase
    {
        private readonly HotelContext _context;

        public HotelInvoiceController(HotelContext context)
        {
            _context = context;
        }

        // POST api/hotelinvoice
        [HttpPost]
        public async Task<IActionResult> CreateHotelInvoice([FromBody] HotelInvoiceRequest.CreateInvoiceRequest invoiceRequest)
        {
            if (invoiceRequest == null)
            {
                return BadRequest("Invalid invoice data.");
            }

            var hotelInvoice = new HotelInvoice
            {
                HotelBookingId = invoiceRequest.HotelBookingId,
                InvoiceDate = (DateOnly)invoiceRequest.InvoiceDate,
                TotalAmount = invoiceRequest.TotalAmount,
                Status = invoiceRequest.Status
            };

            await _context.HotelInvoices.AddAsync(hotelInvoice);
            await _context.SaveChangesAsync();

            var invoiceDto = new HotelInvoiceDto
            {
                HotelInvoiceId = hotelInvoice.HotelInvoiceId,
                HotelBookingId = hotelInvoice.HotelBookingId,
                InvoiceDate = hotelInvoice.InvoiceDate,
                TotalAmount = hotelInvoice.TotalAmount,
                Status = hotelInvoice.Status
            };

            return CreatedAtAction(nameof(GetHotelInvoice), new { id = hotelInvoice.HotelInvoiceId }, invoiceDto);
        }

        // GET api/hotelinvoice
        [HttpGet]
        public async Task<IActionResult> GetAllHotelInvoices()
        {
            var invoices = await _context.HotelInvoices.ToListAsync();
            var invoiceDtos = invoices.Select(i => new HotelInvoiceDto
            {
                HotelInvoiceId = i.HotelInvoiceId,
                HotelBookingId = i.HotelBookingId,
                InvoiceDate = i.InvoiceDate,
                TotalAmount = i.TotalAmount,
                Status = i.Status
            }).ToList();

            return Ok(invoiceDtos);
        }

        // GET api/hotelinvoice/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHotelInvoice(int id)
        {
            var invoice = await _context.HotelInvoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            var invoiceDto = new HotelInvoiceDto
            {
                HotelInvoiceId = invoice.HotelInvoiceId,
                HotelBookingId = invoice.HotelBookingId,
                InvoiceDate = invoice.InvoiceDate,
                TotalAmount = invoice.TotalAmount,
                Status = invoice.Status
            };

            return Ok(invoiceDto);
        }

        // PUT api/hotelinvoice/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHotelInvoice(int id, [FromBody] HotelInvoiceRequest.UpdateInvoiceRequest invoiceRequest)
        {
            if (invoiceRequest == null)
            {
                return BadRequest("Invalid invoice data.");
            }

            var invoice = await _context.HotelInvoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            // Update properties only when they are not null
            if (invoiceRequest.HotelBookingId != null)
            {
                invoice.HotelBookingId = invoiceRequest.HotelBookingId.Value;
            }
            if (invoiceRequest.InvoiceDate != null)
            {
                invoice.InvoiceDate = invoiceRequest.InvoiceDate.Value;
            }
            if (invoiceRequest.TotalAmount != null)
            {
                invoice.TotalAmount = invoiceRequest.TotalAmount.Value;
            }
            if (invoiceRequest.Status != null)
            {
                invoice.Status = invoiceRequest.Status;
            }

            _context.HotelInvoices.Update(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/hotelinvoice/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotelInvoice(int id)
        {
            var invoice = await _context.HotelInvoices.FindAsync(id);
            if (invoice == null)
            {
                return NotFound();
            }

            _context.HotelInvoices.Remove(invoice);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}