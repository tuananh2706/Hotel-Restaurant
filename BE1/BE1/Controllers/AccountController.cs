using Hotel.DTOs;
using BE1.newModels;
using Microsoft.AspNetCore.Mvc;
using static Hotel.Request.AccountRequest;
using BCrypt.Net;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;


namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly HotelContext _context;
        private readonly JwtSettings _jwtSetings;

        public AccountController(HotelContext context, IOptions<JwtSettings> jwtSettings)
        {
            _context = context;
            _jwtSetings = jwtSettings.Value;
        }

        // Đăng ký tài khoản mới (POST)
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            try
            {
                if (await _context.Accounts.AnyAsync(a => a.Email == request.Email))
                {
                    return BadRequest("Email đã được sử dụng");
                }
                else if (await _context.Accounts.AnyAsync(a => a.AccountName == request.AccountName))
                {
                    return BadRequest("UserName đã được sử dụng");
                }

                var account = new Account
                {
                    AccountName = request.AccountName,
                    Email = request.Email,
                    PasswordHash = HashPassword(request.Password),
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    CreatedAt = DateTime.Now,
                    Role = "User",
                };

                _context.Accounts.Add(account);
                await _context.SaveChangesAsync();
                return Ok("Đăng ký tài khoản thành công");

            }
            catch (Exception ex)
            {
                {
                    return StatusCode(500, $"Đã xảy ra lỗi trong quá trình đăng ký: {ex.Message}");
                }
            }
        }

        // Đăng nhập tài khoản (POST)
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                var account = await _context.Accounts.SingleOrDefaultAsync(a => a.Email == request.EmailOrUserName || a.AccountName == request.EmailOrUserName);
                if(account == null || !VerifyPassword(request.Password, account.PasswordHash))
                {
                    return Unauthorized("Email, Username hoặc mật khẩu không đúng");
                }

                // Tạo Token
                var token = GenerateJwtToken(account);

                //Tạo refreshToken
                var refreshToken = await _context.RefreshTokens.FirstOrDefaultAsync(rt => rt.AccountName == account.AccountName && rt.Revoked == false);

                // Trường hợp có RefeshToken
                if(refreshToken != null)
                {
                    // RefeshToken còn hạn
                    if(refreshToken.ExpiryDate > DateTime.UtcNow)
                    {
                        //Return thằng không cần tạo lại.
                        return Ok(new
                        {
                            accessToken = token,
                            refreshToken = refreshToken.Token,
                            ExpiryDate = refreshToken.ExpiryDate,
                            Account = new AccountRequest
                            {
                                AccountName = account.AccountName,
                                FirstName = account.FirstName,
                                LastName = account.LastName,
                                Email = account.Email,
                                Phone = account.Phone,
                                Role = account.Role,
                                AvatarUrl = account.AvatarUrl,
                                CreatedAt = account.CreatedAt,
                                BirthDate = account.BirthDate,
                                Nationality = account.Nationality
                            }
                        });
                    }
                    // RefreshToken hết hạn
                    refreshToken.Token = GenerateRefreshToken(account.AccountName).Token;
                    refreshToken.ExpiryDate = DateTime.UtcNow.AddDays(7);

                    _context.RefreshTokens.Update(refreshToken);
                    await _context.SaveChangesAsync();
                }
                //Trường hợp chưa có RefreshToken
                else
                {
                    refreshToken = GenerateRefreshToken(account.AccountName);
                    await SaveRefreshToken(account.AccountName, refreshToken);
                };
                return Ok(new
                {
                    accsessToken = token,
                    refreshToken = refreshToken.Token,
                    ExpiryDate = refreshToken.ExpiryDate,
                    Account = new AccountRequest
                    {
                        AccountName = account.AccountName,
                        FirstName = account.FirstName,
                        LastName = account.LastName,
                        Email = account.Email,
                        Phone = account.Phone,
                        Role = account.Role,
                        AvatarUrl = account.AvatarUrl,
                        CreatedAt = account.CreatedAt,
                        BirthDate = account.BirthDate,
                        Nationality = account.Nationality
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Đã xảy ra lỗi trong quá trình đăng nhập: {ex.Message}");
            }
        }
        
        // Get all account:
        [HttpGet("AllAccount")]
        [Authorize(Roles ="Admin")] // Chỉ cho phép admin sử dụng hàm này
        public async Task<IActionResult> getAllAccounts()
        {
            try
            {
                var accounts = await _context.Accounts.Select(a => new AccountRequest
                {
                    AccountName = a.AccountName,
                    FirstName = a.FirstName,
                    LastName = a.LastName,
                    Email = a.Email,
                    Phone = a.Phone,
                    Role = a.Role,
                    AvatarUrl = a.AvatarUrl,
                    CreatedAt = a.CreatedAt,
                    BirthDate = a.BirthDate,
                    Nationality = a.Nationality
                }).ToListAsync();
                return Ok(accounts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Đã xảy ra lỗi trong quá trình đăng nhập: {ex.Message}");
            }
        }

        // Lấy thông tin người dùng thông qua token
        [Authorize]  // Chỉ cho phép truy cập nếu có token hợp lệ
        [HttpGet("user")]
        public async Task<IActionResult> GetUserInfo()
        {
            try
            {
                // Lấy thông tin từ Claims
                var userName = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
                var email = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

                if (string.IsNullOrEmpty(userName) && string.IsNullOrEmpty(email))
                {
                    return Unauthorized("Thông tin người dùng không hợp lệ.");
                }

                // Tìm người dùng từ cơ sở dữ liệu (bất đồng bộ)
                var user = await _context.Accounts
                    .FirstOrDefaultAsync(a => a.AccountName == userName || a.Email == email);

                if (user == null)
                {
                    return Unauthorized("Thông tin người dùng không hợp lệ.");
                }

                var token = GenerateJwtToken(user);

                // Trả về thông tin người dùng nếu tìm thấy
                return Ok(new
                {
                    token = token,
                    user = new AccountRequest{
                        AccountName = user.AccountName,
                        FirstName = user.FirstName,
                        LastName = user.LastName,
                        Email = user.Email,
                        Phone = user.Phone,
                        Role = user.Role,
                        AvatarUrl = user.AvatarUrl,
                        CreatedAt = user.CreatedAt,
                        BirthDate = user.BirthDate,
                        Nationality = user.Nationality
                    }
                });
            }
            catch (Exception ex)
            {
                // Trả về lỗi nếu có ngoại lệ
                return StatusCode(500, $"Đã xảy ra lỗi: {ex.Message}");
            }
        }


        //Tạo tài khoản admin
        [HttpPost("registerAdmin")]
        //[Authorize(Roles ="admin")]
        public async Task<IActionResult> registerAdmin([FromBody] RegisterRequest request)
        {
            try
            {
                if (await _context.Accounts.AnyAsync(a => a.Email == request.Email))
                {
                    return BadRequest("Email đã được sử dụng");
                }
                else if (await _context.Accounts.AnyAsync(a => a.AccountName == request.AccountName))
                {
                    return BadRequest("UserName đã được sử dụng");
                }

                var account = new Account
                {
                    AccountName = request.AccountName,
                    Email = request.Email,
                    PasswordHash = HashPassword(request.Password),
                    FirstName = request.FirstName,
                    LastName = request.LastName,
                    CreatedAt = DateTime.Now,
                    Role = "Admin",
                };

                _context.Accounts.Add(account);
                await _context.SaveChangesAsync();
                return Ok("Đăng ký tài khoản thành công");

            }
            catch (Exception ex)
            {
                {
                    return StatusCode(500, $"Đã xảy ra lỗi trong quá trình đăng ký: {ex.Message}");
                }
            }
        }


        // Cập nhật thông tin tài khoản (PUT)
        [Authorize]
        [HttpPut("{accountName}")]
        public IActionResult UpdateAccount(string accountName, [FromBody] UpdateAccountRequest request)
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
            account.AvatarUrl = request.AvatarUrl;
            account.BirthDate = request.BirthDate;
            account.Nationality = request.Nationality;
            account.UpdateAt = DateTime.Now;

            _context.Accounts.Update(account);
            _context.SaveChanges();

            return Ok("Your change Information completed");
        }

        // Thay đổi mật khẩu (PUT)
        [Authorize]
        [HttpPut("{accountName}/changepassword")]
        public IActionResult ChangePassword(string accountName, [FromBody] ChangePasswordRequest request)
        {
            var account = _context.Accounts.FirstOrDefault(a => a.AccountName == accountName);

            if (account == null)
            {
                return NotFound("Tài khoản không tồn tại.");
            }

            // Kiểm tra mật khẩu cũ
            if (!VerifyPassword(request.OldPassword, account.PasswordHash))
            {
                return BadRequest("Mật khẩu cũ không đúng.");
            }

            // Cập nhật mật khẩu mới
            account.PasswordHash = HashPassword(request.NewPassword);
            account.UpdateAt = DateTime.Now;

            _context.Accounts.Update(account);
            _context.SaveChanges();

            return Ok("Đổi mật khẩu thành công.");
        }

        // Xóa tài khoản (DELETE)
        [Authorize(Roles ="admin")]
        [HttpDelete("{accountName}")]
        public IActionResult DeleteAccount(string accountName)
        {
            var account = _context.Accounts.FirstOrDefault(a => a.AccountName == accountName);

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
            try
            {
                return BCrypt.Net.BCrypt.HashPassword(password);
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi mã hóa mật khẩu", ex);
            }
        }

        // Hàm kiểm tra mật khẩu
        private bool VerifyPassword(string password, string storedHash)
        {
            try
            {
                return BCrypt.Net.BCrypt.Verify(password, storedHash);
            }
            catch (Exception ex)
            {
                throw new Exception("Lỗi khi xác thực mật khẩu.", ex);
            }
        }

        private string GenerateJwtToken(Account account)
        {
            try
            {
                if (_jwtSetings == null)
                {
                    throw new Exception("JWT settings không được cấu hình đúng.");
                }

                var tokenHanler = new JwtSecurityTokenHandler();
                var key = Encoding.UTF8.GetBytes(_jwtSetings.SecretKey);

                if (key.Length == 0)
                {
                    throw new Exception("SecretKey không hợp lệ.");
                }

                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                new Claim(ClaimTypes.Name, account.AccountName),
                new Claim(ClaimTypes.Email, account.Email),
                new Claim(ClaimTypes.Role, account.Role)
                    }),
                    Expires = DateTime.UtcNow.AddMinutes(_jwtSetings.ExpiresInMinutes),
                    Issuer = _jwtSetings.Issuer,
                    Audience = _jwtSetings.Audience,
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };

                var token = tokenHanler.CreateToken(tokenDescriptor);
                return tokenHanler.WriteToken(token);
            }
            catch (Exception ex)
            {
                // In thêm thông tin chi tiết về lỗi
                throw new Exception($"Lỗi khi tạo token: {ex.Message}", ex);
            }
        }

        private RefreshToken GenerateRefreshToken(string accountName)
        {
            var expiryDate = DateTime.UtcNow.AddDays(7);

            // Kiểm tra xem ngày có nằm trong phạm vi hợp lệ không
            if (expiryDate < (DateTime)System.Data.SqlTypes.SqlDateTime.MinValue)
            {
                expiryDate = (DateTime)System.Data.SqlTypes.SqlDateTime.MinValue;
            }
            var refreshToken = new RefreshToken
            {
                Token = Guid.NewGuid().ToString(),
                AccountName = accountName,
                ExpiryDate = expiryDate,
                Revoked = false,
            };
            return refreshToken;
        }

        private async Task SaveRefreshToken (string accountName, RefreshToken refreshToken)
        {
            try
            {
                _context.RefreshTokens.Add(refreshToken);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"Lỗi khi lưu RefreshToken cho tài khoản {accountName}: {ex.Message}", ex);
            }
        }
    }
}
