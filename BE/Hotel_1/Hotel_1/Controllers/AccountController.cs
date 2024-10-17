using Hotel_1.Models;
using Hotel_1.DTOs;
using Hotel_1.Requests;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Hotel_1.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AccountController : ControllerBase
	{
		private readonly HotelContext _context;

		public AccountController(HotelContext context)
		{
			_context = context;
		}

		// Đăng ký tài khoản mới (POST)
		[HttpPost("register")]
		public IActionResult Register([FromBody] RegisterRequest request)
		{
			if (_context.Accounts.Any(a => a.Email == request.Email))
			{
				return BadRequest("Email đã được sử dụng.");
			}

			var account = new Account
			{
				AccountName = request.AccountName,
				Email = request.Email,
				PasswordHash = HashPassword(request.Password),
				CreatedAt = DateTime.Now,
				Role = "User" // Gán giá trị mặc định cho Role
			};

			_context.Accounts.Add(account);
			_context.SaveChanges();

			return Ok(new AccountDTO
			{
				AccountName = account.AccountName,
				Email = account.Email,
				CreatedAt = account.CreatedAt,
				Role = account.Role // Thêm Role vào DTO (nếu cần)
			});
		}


		// Đăng nhập tài khoản (POST)
		[HttpPost("login")]
		public IActionResult Login([FromBody] LoginRequest request)
		{
			var account = _context.Accounts.SingleOrDefault(a => a.Email == request.Email);

			if (account == null || !VerifyPassword(request.Password, account.PasswordHash))
			{
				return Unauthorized("Email hoặc mật khẩu không đúng.");
			}

			return Ok(new AccountDTO
			{
				AccountName = account.AccountName,
				FirstName = account.FirstName,
				LastName = account.LastName,
				Email = account.Email,
				Phone = account.Phone,
				Role = account.Role,
				AvatarUrl = account.AvatarUrl,
				CreatedAt = account.CreatedAt
			});
		}

		// Lấy danh sách tất cả tài khoản (GET)
		[HttpGet]
		public IActionResult GetAllAccounts()
		{
			var accounts = _context.Accounts.Select(a => new AccountDTO
			{
				AccountName = a.AccountName,
				FirstName = a.FirstName,
				LastName = a.LastName,
				Email = a.Email,
				Phone = a.Phone,
				Role = a.Role,
				AvatarUrl = a.AvatarUrl,
				CreatedAt = a.CreatedAt
			}).ToList();

			return Ok(accounts);
		}

		// Lấy chi tiết tài khoản theo id (GET)
		[HttpGet("{accountName}")]
		public IActionResult GetAccountByAccountName(string accountName)
		{
			var account = _context.Accounts.FirstOrDefault(a => a.AccountName == accountName);

			if (account == null)
			{
				return NotFound("Tài khoản không tồn tại.");
			}

			return Ok(new AccountDTO
			{
				AccountName = account.AccountName,
				FirstName = account.FirstName,
				LastName = account.LastName,
				Email = account.Email,
				Phone = account.Phone,
				Role = account.Role,
				AvatarUrl = account.AvatarUrl,
				CreatedAt = account.CreatedAt
			});
		}


		// Cập nhật thông tin tài khoản (PUT)
		[HttpPut("{accountName}")]
		public IActionResult UpdateAccount(string accountName, [FromBody] UpdateRequest request)
		{
			var account = _context.Accounts.FirstOrDefault(a => a.AccountName == accountName);

			if (account == null)
			{
				return NotFound("Tài khoản không tồn tại.");
			}

			// Cập nhật thông tin tài khoản
			account.FirstName = request.FirstName;
			account.LastName = request.LastName;
			account.Email = request.Email;
			account.Phone = request.Phone;
			account.Role = request.Role;
			account.AvatarUrl = request.AvatarUrl;
			account.UpdateAt = DateTime.Now;

			_context.Accounts.Update(account);
			_context.SaveChanges();

			return Ok(new AccountDTO
			{
				AccountName = account.AccountName,
				FirstName = account.FirstName,
				LastName = account.LastName,
				Email = account.Email,
				Phone = account.Phone,
				Role = account.Role,
				AvatarUrl = account.AvatarUrl,
				CreatedAt = account.CreatedAt
			});
		}


		// Xóa tài khoản (DELETE)
		[HttpDelete("{accountName}")]
		public IActionResult DeleteAccount(string accountName)
		{
			var account = _context.Accounts.Find(accountName);

			if (account == null)
			{
				return NotFound("Tài khoản không tồn tại.");
			}

			_context.Accounts.Remove(account);
			_context.SaveChanges();

			return Ok("Xóa tài khoản thành công.");
		}

		// Hàm mã hóa mật khẩu
		private string HashPassword(string password)
		{
			using (var sha256 = SHA256.Create())
			{
				var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
				return BitConverter.ToString(hashedBytes).Replace("-", "").ToLower();
			}
		}

		// Hàm kiểm tra mật khẩu
		private bool VerifyPassword(string password, string storedHash)
		{
			var hashOfInput = HashPassword(password);
			return hashOfInput == storedHash;
		}
	}
}
