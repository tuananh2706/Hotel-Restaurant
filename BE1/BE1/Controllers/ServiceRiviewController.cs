using Microsoft.AspNetCore.Mvc;
using BE1.Models;
using Hotel.Request;
using Hotel.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ServiceReviewController : ControllerBase
    {
        private readonly HotelContext _context;

        public ServiceReviewController(HotelContext context)
        {
            _context = context;
        }

        // POST api/servicereview
        [HttpPost]
        public async Task<IActionResult> CreateServiceReview([FromBody] ServiceReviewRequest.CreateServiceReviewRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid service review data.");
            }

            var serviceReview = new ServiceReview
            {
                AccountName = request.AccountName,
                ServiceId = request.ServiceId,
                Rating = request.Rating,
                ReviewText = request.ReviewText,
                ReviewDate = DateOnly.FromDateTime(DateTime.UtcNow)
            };

            await _context.ServiceReviews.AddAsync(serviceReview);
            await _context.SaveChangesAsync();

            var serviceReviewDto = new ServiceReviewDto
            {
                ServiceReviewId = serviceReview.ServiceReviewId,
                AccountName = serviceReview.AccountName,
                ServiceId = serviceReview.ServiceId,
                Rating = serviceReview.Rating,
                ReviewText = serviceReview.ReviewText,
                ReviewDate = serviceReview.ReviewDate
            };

            return CreatedAtAction(nameof(GetServiceReview), new { id = serviceReview.ServiceReviewId }, serviceReviewDto);
        }

        // GET api/servicereview
        [HttpGet]
        public async Task<IActionResult> GetAllServiceReviews()
        {
            var serviceReviews = await _context.ServiceReviews.ToListAsync();
            var serviceReviewDtos = serviceReviews.Select(sr => new ServiceReviewDto
            {
                ServiceReviewId = sr.ServiceReviewId,
                AccountName = sr.AccountName,
                ServiceId = sr.ServiceId,
                Rating = sr.Rating,
                ReviewText = sr.ReviewText,
                ReviewDate = sr.ReviewDate
            }).ToList();

            return Ok(serviceReviewDtos);
        }

        // GET api/servicereview/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetServiceReview(int id)
        {
            var serviceReview = await _context.ServiceReviews.FindAsync(id);
            if (serviceReview == null)
            {
                return NotFound();
            }

            var serviceReviewDto = new ServiceReviewDto
            {
                ServiceReviewId = serviceReview.ServiceReviewId,
                AccountName = serviceReview.AccountName,
                ServiceId = serviceReview.ServiceId,
                Rating = serviceReview.Rating,
                ReviewText = serviceReview.ReviewText,
                ReviewDate = serviceReview.ReviewDate
            };

            return Ok(serviceReviewDto);
        }

        // PUT api/servicereview/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateServiceReview(int id, [FromBody] ServiceReviewRequest.UpdateServiceReviewRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid service review data.");
            }

            var serviceReview = await _context.ServiceReviews.FindAsync(id);
            if (serviceReview == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(request.AccountName))
            {
                serviceReview.AccountName = request.AccountName;
            }
            if (request.ServiceId.HasValue)
            {
                serviceReview.ServiceId = request.ServiceId.Value;
            }
            if (request.Rating.HasValue)
            {
                serviceReview.Rating = request.Rating.Value;
            }
            if (!string.IsNullOrEmpty(request.ReviewText))
            {
                serviceReview.ReviewText = request.ReviewText;
            }

            serviceReview.ReviewDate = DateOnly.FromDateTime(DateTime.UtcNow);

            _context.ServiceReviews.Update(serviceReview);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/servicereview/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteServiceReview(int id)
        {
            var serviceReview = await _context.ServiceReviews.FindAsync(id);
            if (serviceReview == null)
            {
                return NotFound();
            }

            _context.ServiceReviews.Remove(serviceReview);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
