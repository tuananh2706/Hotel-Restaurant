using Microsoft.AspNetCore.Mvc;
using BE1.Models;
using Hotel.Request;
using Hotel.DTOs;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelReviewController : ControllerBase
    {
        private readonly HotelContext _context;

        public HotelReviewController(HotelContext context)
        {
            _context = context;
        }

        // POST api/hotelreview
        [HttpPost]
        public async Task<IActionResult> CreateHotelReview([FromBody] HotelReviewRequest.CreateHotelReviewRequest reviewRequest)
        {
            if (reviewRequest == null)
            {
                return BadRequest("Invalid review data.");
            }

            var hotelReview = new HotelReview
            {
                AccountName = reviewRequest.AccountName,
                HotelId = reviewRequest.HotelId,
                Rating = reviewRequest.Rating,
                ReviewText = reviewRequest.ReviewText,
                // Thiết lập ReviewDate bằng DateOnly với ngày hiện tại
                ReviewDate = DateOnly.FromDateTime(DateTime.UtcNow)
            };

            await _context.HotelReviews.AddAsync(hotelReview);
            await _context.SaveChangesAsync();

            var reviewDto = new HotelReviewDto
            {
                HotelReviewId = hotelReview.HotelReviewId,
                AccountName = hotelReview.AccountName,
                HotelId = hotelReview.HotelId,
                Rating = hotelReview.Rating,
                ReviewText = hotelReview.ReviewText,
                ReviewDate = hotelReview.ReviewDate // Sử dụng ReviewDate vừa tạo
            };

            return CreatedAtAction(nameof(GetHotelReview), new { id = hotelReview.HotelReviewId }, reviewDto);
        }

        // GET api/hotelreview
        [HttpGet]
        public async Task<IActionResult> GetAllHotelReviews()
        {
            var reviews = await _context.HotelReviews.ToListAsync();
            var reviewDtos = reviews.Select(r => new HotelReviewDto
            {
                HotelReviewId = r.HotelReviewId,
                AccountName = r.AccountName,
                HotelId = r.HotelId,
                Rating = r.Rating,
                ReviewText = r.ReviewText,
                ReviewDate = r.ReviewDate
            }).ToList();

            return Ok(reviewDtos);
        }

        // GET api/hotelreview/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHotelReview(int id)
        {
            var review = await _context.HotelReviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            var reviewDto = new HotelReviewDto
            {
                HotelReviewId = review.HotelReviewId,
                AccountName = review.AccountName,
                HotelId = review.HotelId,
                Rating = review.Rating,
                ReviewText = review.ReviewText,
                ReviewDate = review.ReviewDate
            };

            return Ok(reviewDto);
        }

        // PUT api/hotelreview/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateHotelReview(int id, [FromBody] HotelReviewRequest.UpdateHotelReviewRequest reviewRequest)
        {
            if (reviewRequest == null)
            {
                return BadRequest("Invalid review data.");
            }

            var review = await _context.HotelReviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            // Cập nhật thông tin chỉ khi thuộc tính không null
            if (reviewRequest.AccountName != null)
            {
                review.AccountName = reviewRequest.AccountName;
            }
            if (reviewRequest.HotelId.HasValue)
            {
                review.HotelId = reviewRequest.HotelId.Value;
            }
            if (reviewRequest.Rating.HasValue)
            {
                review.Rating = reviewRequest.Rating.Value;
            }
            if (reviewRequest.ReviewText != null)
            {
                review.ReviewText = reviewRequest.ReviewText;
            }

            // Luôn thiết lập ReviewDate với ngày hiện tại
            review.ReviewDate = DateOnly.FromDateTime(DateTime.UtcNow);

            _context.HotelReviews.Update(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/hotelreview/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHotelReview(int id)
        {
            var review = await _context.HotelReviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            _context.HotelReviews.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
