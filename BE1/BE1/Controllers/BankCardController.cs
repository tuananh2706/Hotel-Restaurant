using Microsoft.AspNetCore.Mvc;
using Hotel.Request;
using Hotel.DTOs;
using System.Collections.Generic;
using System.Linq;
using BE1.Models;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankCardController : ControllerBase
    {
        private readonly HotelContext _context;

        public BankCardController(HotelContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateBankCard([FromBody] BankCardRequest.CreateBankCardRequest bankCardRequest)
        {
            if (bankCardRequest == null)
            {
                return BadRequest("Invalid bank card data.");
            }

            var bankCard = new BankCard
            {
                AccountName = bankCardRequest.AccountName,
                CardNumber = bankCardRequest.CardNumber,
                ExpirationDate = bankCardRequest.ExpirationDate,
                CardType = bankCardRequest.CardType
            };

            _context.BankCards.Add(bankCard);
            await _context.SaveChangesAsync();

            var bankCardDto = new BankCardDto
            {
                BankCardId = bankCard.BankCardId,
                AccountName = bankCard.AccountName,
                CardNumber = bankCard.CardNumber,
                ExpirationDate = bankCard.ExpirationDate,
                CardType = bankCard.CardType
            };

            return CreatedAtAction(nameof(GetBankCard), new { id = bankCard.BankCardId }, bankCardDto);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllBankCards()
        {
            var bankCards = await _context.BankCards.ToListAsync();
            var bankCardDtos = bankCards.Select(b => new BankCardDto
            {
                BankCardId = b.BankCardId,
                AccountName = b.AccountName,
                CardNumber = b.CardNumber,
                ExpirationDate = b.ExpirationDate,
                CardType = b.CardType
            }).ToList();

            return Ok(bankCardDtos);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetBankCard(int id)
        {
            var bankCard = await _context.BankCards.FindAsync(id);
            if (bankCard == null)
            {
                return NotFound();
            }

            var bankCardDto = new BankCardDto
            {
                BankCardId = bankCard.BankCardId,
                AccountName = bankCard.AccountName,
                CardNumber = bankCard.CardNumber,
                ExpirationDate = bankCard.ExpirationDate,
                CardType = bankCard.CardType
            };

            return Ok(bankCardDto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBankCard(int id, [FromBody] BankCardRequest.UpdateBankCardRequest bankCardRequest)
        {
            if (bankCardRequest == null)
            {
                return BadRequest("Invalid bank card data.");
            }

            var bankCard = await _context.BankCards.FindAsync(id);
            if (bankCard == null)
            {
                return NotFound();
            }

            if (bankCardRequest.AccountName != null)
            {
                bankCard.AccountName = bankCardRequest.AccountName;
            }
            if (bankCardRequest.CardNumber != null)
            {
                bankCard.CardNumber = bankCardRequest.CardNumber;
            }
            if (bankCardRequest.ExpirationDate.HasValue)
            {
                bankCard.ExpirationDate = bankCardRequest.ExpirationDate.Value;
            }
            if (bankCardRequest.CardType != null)
            {
                bankCard.CardType = bankCardRequest.CardType;
            }

            _context.BankCards.Update(bankCard);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBankCard(int id)
        {
            var bankCard = await _context.BankCards.FindAsync(id);
            if (bankCard == null)
            {
                return NotFound();
            }

            _context.BankCards.Remove(bankCard);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
