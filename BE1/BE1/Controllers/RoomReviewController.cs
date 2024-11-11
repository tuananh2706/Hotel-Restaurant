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
    public class RoomReviewController : ControllerBase
    {
        private readonly HotelContext _context;

        public RoomReviewController(HotelContext context)
        {
            _context = context;
        }

        // POST api/roomreview
        [HttpPost]
        public async Task<IActionResult> CreateRoomReview([FromBody] RoomReviewRequest.CreateRoomReviewRequest roomReviewRequest)
        {
            if (roomReviewRequest == null)
            {
                return BadRequest("Invalid room review data.");
            }

            var roomReview = new RoomReview
            {
                AccountName = roomReviewRequest.AccountName,
                RoomId = roomReviewRequest.RoomId,
                Rating = roomReviewRequest.Rating,
                ReviewText = roomReviewRequest.ReviewText,
                ReviewDate = DateOnly.FromDateTime(DateTime.UtcNow) // Or DateOnly.FromDateTime(DateTime.Now) if you want local time
            };

            _context.RoomReviews.Add(roomReview);
            await _context.SaveChangesAsync();

            var roomReviewDto = new RoomReviewDto
            {
                RoomReviewId = roomReview.RoomReviewId,
                AccountName = roomReview.AccountName,
                RoomId = roomReview.RoomId,
                Rating = roomReview.Rating,
                ReviewText = roomReview.ReviewText,
                ReviewDate = roomReview.ReviewDate
            };

            return CreatedAtAction(nameof(GetRoomReview), new { id = roomReview.RoomReviewId }, roomReviewDto);
        }

        // GET api/roomreview
        [HttpGet]
        public async Task<IActionResult> GetAllRoomReviews()
        {
            var roomReviews = await _context.RoomReviews.ToListAsync();
            var roomReviewDtos = roomReviews.Select(rr => new RoomReviewDto
            {
                RoomReviewId = rr.RoomReviewId,
                AccountName = rr.AccountName,
                RoomId = rr.RoomId,
                Rating = rr.Rating,
                ReviewText = rr.ReviewText,
                ReviewDate = rr.ReviewDate
            }).ToList();

            return Ok(roomReviewDtos);
        }

        // GET api/roomreview/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetRoomReview(int id)
        {
            var roomReview = await _context.RoomReviews.FindAsync(id);
            if (roomReview == null)
            {
                return NotFound();
            }

            var roomReviewDto = new RoomReviewDto
            {
                RoomReviewId = roomReview.RoomReviewId,
                AccountName = roomReview.AccountName,
                RoomId = roomReview.RoomId,
                Rating = roomReview.Rating,
                ReviewText = roomReview.ReviewText,
                ReviewDate = roomReview.ReviewDate
            };

            return Ok(roomReviewDto);
        }

        // PUT api/roomreview/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRoomReview(int id, [FromBody] RoomReviewRequest.UpdateRoomReviewRequest roomReviewRequest)
        {
            if (roomReviewRequest == null)
            {
                return BadRequest("Invalid room review data.");
            }

            var roomReview = await _context.RoomReviews.FindAsync(id);
            if (roomReview == null)
            {
                return NotFound();
            }

            // Update fields
            roomReview.Rating = roomReviewRequest.Rating ?? roomReview.Rating; // Keep the old value if Rating is not provided
            roomReview.ReviewText = roomReviewRequest.ReviewText; // Update ReviewText
            roomReview.ReviewDate = DateOnly.FromDateTime(DateTime.UtcNow); // Always set ReviewDate to the current date

            _context.RoomReviews.Update(roomReview);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/roomreview/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRoomReview(int id)
        {
            var roomReview = await _context.RoomReviews.FindAsync(id);
            if (roomReview == null)
            {
                return NotFound();
            }

            _context.RoomReviews.Remove(roomReview);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
