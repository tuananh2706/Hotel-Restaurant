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
    public class SocialController : ControllerBase
    {
        private readonly HotelContext _context;

        public SocialController(HotelContext context)
        {
            _context = context;
        }

        // POST api/social
        [HttpPost]
        public async Task<IActionResult> CreateSocial([FromBody] SocialRequest.CreateSocialRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid social data.");
            }

            var social = new Social
            {
                LinkUrl = request.LinkUrl,
                HotelId = request.HotelId
            };

            await _context.Socials.AddAsync(social);
            await _context.SaveChangesAsync();

            var socialDto = new SocialDto
            {
                Id = social.Id,
                LinkUrl = social.LinkUrl,
                HotelId = social.HotelId
            };

            return CreatedAtAction(nameof(GetSocial), new { id = social.Id }, socialDto);
        }

        // GET api/social
        [HttpGet]
        public async Task<IActionResult> GetAllSocials()
        {
            var socials = await _context.Socials.ToListAsync();
            var socialDtos = socials.Select(s => new SocialDto
            {
                Id = s.Id,
                LinkUrl = s.LinkUrl,
                HotelId = s.HotelId
            }).ToList();

            return Ok(socialDtos);
        }

        // GET api/social/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetSocial(int id)
        {
            var social = await _context.Socials.FindAsync(id);
            if (social == null)
            {
                return NotFound();
            }

            var socialDto = new SocialDto
            {
                Id = social.Id,
                LinkUrl = social.LinkUrl,
                HotelId = social.HotelId
            };

            return Ok(socialDto);
        }

        // PUT api/social/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSocial(int id, [FromBody] SocialRequest.UpdateSocialRequest request)
        {
            if (request == null)
            {
                return BadRequest("Invalid social data.");
            }

            var social = await _context.Socials.FindAsync(id);
            if (social == null)
            {
                return NotFound();
            }

            if (!string.IsNullOrEmpty(request.LinkUrl))
            {
                social.LinkUrl = request.LinkUrl;
            }

            _context.Socials.Update(social);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE api/social/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSocial(int id)
        {
            var social = await _context.Socials.FindAsync(id);
            if (social == null)
            {
                return NotFound();
            }

            _context.Socials.Remove(social);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
