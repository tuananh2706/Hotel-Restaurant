using BE1.DTOs;
using BE1.Models;
using Hotel.Request;
using Hotel.DTOs;
using BE1.Request;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BE1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteHotelsController : ControllerBase
    {
        private readonly HotelContext _context;

        public FavoriteHotelsController(HotelContext context)
        {
            _context = context;
        }

        // POST: api/FavoriteHotels
        [HttpPost]
        public async Task<ActionResult<FavoriteHotelDto>> AddFavoriteHotel(FavoriteHotelRequest request)
        {
            var favoriteHotel = new FavoriteHotel
            {
                AccountName = request.AccountName,
                HotelId = request.HotelId,
                CreatedAt = DateTime.UtcNow
            };

            _context.FavoriteHotels.Add(favoriteHotel);
            await _context.SaveChangesAsync();

            var favoriteHotelDto = new FavoriteHotelDto
            {
                FavoriteHotelId = favoriteHotel.FavoriteHotelId,
                AccountName = favoriteHotel.AccountName,
                HotelId = favoriteHotel.HotelId,
                CreatedAt = favoriteHotel.CreatedAt
            };

            return CreatedAtAction(nameof(GetFavoriteHotel), new { id = favoriteHotel.FavoriteHotelId }, favoriteHotelDto);
        }

        // GET: api/FavoriteHotels/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<FavoriteHotelDto>> GetFavoriteHotel(int id)
        {
            var favoriteHotel = await _context.FavoriteHotels
                .Include(f => f.AccountNameNavigation)
                .Include(f => f.Hotel)
                .FirstOrDefaultAsync(f => f.FavoriteHotelId == id);

            if (favoriteHotel == null)
            {
                return NotFound();
            }

            var favoriteHotelDto = new FavoriteHotelDto
            {
                FavoriteHotelId = favoriteHotel.FavoriteHotelId,
                AccountName = favoriteHotel.AccountName,
                HotelId = favoriteHotel.HotelId,
                CreatedAt = favoriteHotel.CreatedAt
            };

            return Ok(favoriteHotelDto);
        }

        // PUT: api/FavoriteHotels/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFavoriteHotel(int id, FavoriteHotelRequest request)
        {
            var favoriteHotel = await _context.FavoriteHotels.FindAsync(id);

            if (favoriteHotel == null)
            {
                return NotFound();
            }

            // Cập nhật các trường cần thiết
            favoriteHotel.AccountName = request.AccountName;
            favoriteHotel.HotelId = request.HotelId;
            favoriteHotel.CreatedAt = DateTime.UtcNow; // Optionally update CreatedAt if needed

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.FavoriteHotels.Any(f => f.FavoriteHotelId == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // Return status 204 for successful update
        }

        // DELETE: api/FavoriteHotels/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFavoriteHotel(int id)
        {
            var favoriteHotel = await _context.FavoriteHotels.FindAsync(id);

            if (favoriteHotel == null)
            {
                return NotFound();
            }

            _context.FavoriteHotels.Remove(favoriteHotel);
            await _context.SaveChangesAsync();

            return NoContent(); // Return status 204 for successful deletion
        }
    }
}
