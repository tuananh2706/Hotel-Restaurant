using BE1.Models;
using BE1.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace BE1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly HotelContext _context;
        private readonly JwtSettings _jwtSettings;

        public TokenController(HotelContext context, IOptions<JwtSettings> jwtSettings)
        {
            _context = context;
            _jwtSettings = jwtSettings.Value;
        }

        // Hàm xử lý Refresh Token
        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenRequest request)
        {
            // Kiểm tra dữ liệu yêu cầu
            if (request == null || string.IsNullOrEmpty(request.AccountName))
            {
                return BadRequest("Invalid request.");
            }

            // Lấy refreshToken từ cookie
            var refreshToken = request.refreshToken;

            if (string.IsNullOrEmpty(refreshToken))
            {
                return Unauthorized("Refresh token not found.");
            }

            // Lấy người dùng từ cơ sở dữ liệu
            var user = await _context.Accounts.FirstOrDefaultAsync(a => a.AccountName == request.AccountName);

            if (user == null)
            {
                return Unauthorized("User not found.");
            }

            // Kiểm tra token trong cơ sở dữ liệu
            var storedRefreshToken = await _context.RefreshTokens
                .FirstOrDefaultAsync(rt => rt.Token == refreshToken && rt.AccountName == request.AccountName && rt.Revoked == false);

            // Nếu token không tồn tại hoặc đã bị thu hồi
            if (storedRefreshToken == null)
            {
                return Unauthorized("Invalid refresh token.");
            }

            // Nếu refresh token hết hạn, tạo mới refresh token và cập nhật cookie
            if (storedRefreshToken.ExpiryDate <= DateTime.UtcNow)
            {
                var newRefreshToken = new RefreshToken
                {
                    AccountName = user.AccountName,
                    Token = Guid.NewGuid().ToString(),
                    ExpiryDate = DateTime.Now.AddDays(7),
                    Revoked = false
                };

                // Xóa refresh token cũ
                _context.RefreshTokens.Remove(storedRefreshToken);

                // Thêm refresh token mới vào cơ sở dữ liệu
                await _context.RefreshTokens.AddAsync(newRefreshToken);
                await _context.SaveChangesAsync();

                // Tạo lại JWT mới
                var newJwtToken = GenerateJwtToken(user);

                // Trả về JWT mới và refresh token mới
                return Ok(new
                {
                    RefreshToken = newRefreshToken.Token,
                    Token = newJwtToken,
                    ExpiryDate = newRefreshToken.ExpiryDate
                });



            }

            // Nếu refresh token còn hiệu lực
            var existingJwtToken = GenerateJwtToken(user);
            return Ok(new
            {
                Token = existingJwtToken,
                RefreshToken = storedRefreshToken.Token,
                ExpiryDate = storedRefreshToken.ExpiryDate,
            });
        }


        // Hàm tạo JWT Token
        private string GenerateJwtToken(Account account)
        {
            try
            {
                if (_jwtSettings == null || string.IsNullOrEmpty(_jwtSettings.SecretKey))
                {
                    throw new InvalidOperationException("JWT SecretKey is not configured correctly.");
                }

                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_jwtSettings.SecretKey);

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[] {
                        new Claim(ClaimTypes.Name, account.AccountName),
                        new Claim(ClaimTypes.Email, account.Email),
                        new Claim(ClaimTypes.Role, account.Role)
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiresInMinutes),
                    Issuer = _jwtSettings.Issuer,
                    Audience = _jwtSettings.Audience,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHandler.CreateToken(tokenDescriptor);
                return tokenHandler.WriteToken(token);
            }
            catch (Exception ex)
            {
                // Nâng cao thông tin lỗi để dễ dàng debug
                throw new InvalidOperationException($"Error creating JWT token: {ex.Message}", ex);
            }
        }
    }
}
