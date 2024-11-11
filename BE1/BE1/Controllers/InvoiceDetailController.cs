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
    public class InvoiceDetailController : ControllerBase
    {
        private readonly HotelContext _context;

        public InvoiceDetailController(HotelContext context)
        {
            _context = context;
        }

        // POST api/invoicedetail
        [HttpPost]
        public async Task<IActionResult> CreateInvoiceDetail([FromBody] InvoiceDetailRequest.CreateInvoiceDetaiRequest detailRequest)
        {
            if (detailRequest == null)
            {
                return BadRequest("Invalid invoice detail data.");
            }

            var invoiceDetail = new InvoiceDetail
            {
                InvoiceId = detailRequest.InvoiceId,
                InvoiceType = detailRequest.InvoiceType,
                RoomId = detailRequest.RoomId,
                ServiceId = detailRequest.ServiceId,
                Quantity = detailRequest.Quantity,
                Price = detailRequest.Price
            };

            await _context.InvoiceDetails.AddAsync(invoiceDetail);
            await _context.SaveChangesAsync();

            var detailDto = new InvoiceDetailDto
            {
                InvoiceDetailId = invoiceDetail.InvoiceDetailId,
                InvoiceId = invoiceDetail.InvoiceId,
                InvoiceType = invoiceDetail.InvoiceType,
                RoomId = invoiceDetail.RoomId,
                ServiceId = invoiceDetail.ServiceId,
                Quantity = invoiceDetail.Quantity,
                Price = invoiceDetail.Price
            };

            return CreatedAtAction(nameof(GetInvoiceDetail), new { id = invoiceDetail.InvoiceDetailId }, detailDto);
        }

        // GET api/invoicedetail
        [HttpGet]
        public async Task<IActionResult> GetAllInvoiceDetails()
        {
            var details = await _context.InvoiceDetails.ToListAsync();
            var detailDtos = details.Select(d => new InvoiceDetailDto
            {
                InvoiceDetailId = d.InvoiceDetailId,
                InvoiceId = d.InvoiceId,
                InvoiceType = d.InvoiceType,
                RoomId = d.RoomId,
                ServiceId = d.ServiceId,
                Quantity = d.Quantity,
                Price = d.Price
            }).ToList();

            return Ok(detailDtos);
        }

        // GET api/invoicedetail/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetInvoiceDetail(int id)
        {
            var detail = await _context.InvoiceDetails.FindAsync(id);
            if (detail == null)
            {
                return NotFound();
            }

            var detailDto = new InvoiceDetailDto
            {
                InvoiceDetailId = detail.InvoiceDetailId,
                InvoiceId = detail.InvoiceId,
                InvoiceType = detail.InvoiceType,
                RoomId = detail.RoomId,
                ServiceId = detail.ServiceId,
                Quantity = detail.Quantity,
                Price = detail.Price
            };

            return Ok(detailDto);
        }

        // PUT api/invoicedetail/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateInvoiceDetail(int id, [FromBody] InvoiceDetailRequest.UpdateInvoiceDetaiRequest detailRequest)
        {
            if (detailRequest == null)
            {
                return BadRequest("Invalid invoice detail data.");
            }

            var detail = await _context.InvoiceDetails.FindAsync(id);
            if (detail == null)
            {
                return NotFound();
            }

            // Update information only if the property is not null
            if (detailRequest.InvoiceId != null)
            {
                detail.InvoiceId = detailRequest.InvoiceId.Value;
            }
            if (detailRequest.InvoiceType != null)
            {
                detail.InvoiceType = detailRequest.InvoiceType;
            }
            if (detailRequest.RoomId != null)
            {
                detail.RoomId = detailRequest.RoomId;
            }
            if (detailRequest.ServiceId != null)
            {
                detail.ServiceId = detailRequest.ServiceId;
            }
            if (detailRequest.Quantity != null)
            {
                detail.Quantity = detailRequest.Quantity.Value;
            }
            if (detailRequest.Price != null)
            {
                detail.Price = detailRequest.Price.Value;
            }

            _context.InvoiceDetails.Update(detail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/invoicedetail/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInvoiceDetail(int id)
        {
            var detail = await _context.InvoiceDetails.FindAsync(id);
            if (detail == null)
            {
                return NotFound();
            }

            _context.InvoiceDetails.Remove(detail);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
