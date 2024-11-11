using Microsoft.AspNetCore.Mvc;
using BE1.Models;
using Hotel.Request;
using Hotel.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly HotelContext _context;

        public PaymentController(HotelContext context)
        {
            _context = context;
        }

        // POST api/payment
        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] PaymentRequest.CreatePaymentRequest paymentRequest)
        {
            if (paymentRequest == null)
            {
                return BadRequest("Invalid payment data.");
            }

            var payment = new Payment
            {
                HotelBookingId = paymentRequest.HotelBookingId,
                ServiceBookingId = paymentRequest.ServiceBookingId,
                RestaurantBookingId = paymentRequest.RestaurantBookingId,
                Amount = paymentRequest.Amount,
                PaymentDate = paymentRequest.PaymentDate
            };

            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            var paymentDto = new PaymentDto
            {
                PaymentId = payment.PaymentId,
                HotelBookingId = payment.HotelBookingId,
                ServiceBookingId = payment.ServiceBookingId,
                RestaurantBookingId = payment.RestaurantBookingId,
                Amount = payment.Amount,
                PaymentDate = payment.PaymentDate
            };

            return CreatedAtAction(nameof(GetPayment), new { id = payment.PaymentId }, paymentDto);
        }

        // GET api/payment
        [HttpGet]
        public async Task<IActionResult> GetAllPayments()
        {
            var payments = await _context.Payments.ToListAsync();
            var paymentDtos = payments.Select(p => new PaymentDto
            {
                PaymentId = p.PaymentId,
                HotelBookingId = p.HotelBookingId,
                ServiceBookingId = p.ServiceBookingId,
                RestaurantBookingId = p.RestaurantBookingId,
                Amount = p.Amount,
                PaymentDate = p.PaymentDate
            }).ToList();

            return Ok(paymentDtos);
        }

        // GET api/payment/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            var paymentDto = new PaymentDto
            {
                PaymentId = payment.PaymentId,
                HotelBookingId = payment.HotelBookingId,
                ServiceBookingId = payment.ServiceBookingId,
                RestaurantBookingId = payment.RestaurantBookingId,
                Amount = payment.Amount,
                PaymentDate = payment.PaymentDate
            };

            return Ok(paymentDto);
        }

        // PUT api/payment/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePayment(int id, [FromBody] PaymentRequest.UpdatePaymentRequest paymentRequest)
        {
            if (paymentRequest == null)
            {
                return BadRequest("Invalid payment data.");
            }

            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            // Cập nhật thông tin chỉ khi thuộc tính không null
            if (paymentRequest.HotelBookingId != null)
            {
                payment.HotelBookingId = paymentRequest.HotelBookingId;
            }
            if (paymentRequest.ServiceBookingId != null)
            {
                payment.ServiceBookingId = paymentRequest.ServiceBookingId;
            }
            if (paymentRequest.RestaurantBookingId != null)
            {
                payment.RestaurantBookingId = paymentRequest.RestaurantBookingId;
            }
            if (paymentRequest.Amount != null)
            {
                payment.Amount = paymentRequest.Amount.Value;
            }
            if (paymentRequest.PaymentDate != null)
            {
                payment.PaymentDate = paymentRequest.PaymentDate;
            }

            _context.Payments.Update(payment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/payment/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            _context.Payments.Remove(payment);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
