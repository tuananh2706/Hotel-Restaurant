using Microsoft.AspNetCore.Mvc;
using BE1.Models;
using Hotel.Request;
using Hotel.DTOs;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using static Hotel.Request.HotelRequest;

namespace Hotel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HotelController : ControllerBase
    {
        private readonly HotelContext _context;

        public HotelController(HotelContext context)
        {
            _context = context;
        }



        // Get khách sạn có filter, phân trang dành cho customer.
        [HttpGet("GetHotels")]
        public async Task<IActionResult> GetHotels(
            [FromQuery] string hotelName = null,
            [FromQuery] int? categoryId = null,
            [FromQuery] int? locationId = null,
            [FromQuery] string sortByCategory = null,
            [FromQuery] string sortByPrice = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            try
            {
                var query = _context.Hotels
                    .Where(h => h.IsActive)
                    .Include(h => h.HotelImages)  // Bao gồm hình ảnh của khách sạn
                    .Include(h => h.RoomTypes)    // Bao gồm loại phòng
                    .ThenInclude(rt => rt.Rooms)  // Bao gồm các phòng thuộc loại phòng
                    .Include(h => h.Services)     // Bao gồm dịch vụ của khách sạn
                    .Include(h => h.Category)     // Bao gồm danh mục khách sạn
                    .Include(h => h.Location)     // Bao gồm thông tin vị trí
                    .AsQueryable();

                // Lọc theo tên khách sạn
                if (!string.IsNullOrEmpty(hotelName))
                {
                    query = query.Where(h => h.HotelName.Contains(hotelName));
                }

                // Lọc theo danh mục khách sạn
                if (categoryId.HasValue)
                {
                    query = query.Where(h => h.CategoryId == categoryId);
                }

                // Lọc theo vị trí (Location)
                if (locationId.HasValue)
                {
                    query = query.Where(h => h.LocationId == locationId);
                }

                // Sắp xếp theo danh mục (sortByCategory)
                if (!string.IsNullOrEmpty(sortByCategory))
                {
                    query = sortByCategory.ToLower() switch
                    {
                        "asc" => query.OrderBy(h => h.Category.CategoryName),
                        "desc" => query.OrderByDescending(h => h.Category.CategoryName),
                        _ => query.OrderBy(h => h.HotelName)
                    };
                }

                // Sắp xếp theo giá (sortByPrice)
                if (!string.IsNullOrEmpty(sortByPrice))
                {
                    query = sortByPrice.ToLower() switch
                    {
                        "asc" => query.OrderBy(h => h.RoomTypes
                            .SelectMany(rt => rt.Rooms)
                            .Min(r => r.PricePerNight)),
                        "desc" => query.OrderByDescending(h => h.RoomTypes
                            .SelectMany(rt => rt.Rooms)
                            .Min(r => r.PricePerNight)),
                        _ => query.OrderBy(h => h.HotelName)
                    };
                }

                // Phân trang
                var totalCount = await query.CountAsync();
                var hotels = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return Ok(new
                {
                    TotalCount = totalCount,
                    Page = page,
                    PageSize = pageSize,
                    Data = hotels.Select(h => new
                    {
                        h.HotelId,
                        h.HotelName,
                        h.Address,
                        h.Description,
                        h.IsActive,
                        CategoryName = h.Category.CategoryName,
                        LocationName = h.Location.District,
                        ImageUrls = h.HotelImages.Select(i => i.ImageUrl).ToList(),
                        RoomTypes = h.RoomTypes.Select(rt => new
                        {
                            rt.RoomTypeId,
                            rt.TypeName,
                            Rooms = rt.Rooms.Select(r => new
                            {
                                r.RoomId,
                                r.PricePerNight,
                                r.Description,
                                ImageUrls = r.RoomImages.Select(ri => ri.ImageUrl).ToList()
                            }).ToList()
                        }).ToList(),
                        Services = h.Services.Select(s => new
                        {
                            s.ServiceId,
                            s.ServiceName,
                            ImageUrls = s.ServiceImages.Select(si => si.ImageUrl).ToList()
                        }).ToList()
                    }).ToList()
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }


        // Chức năng này dành cho admin, lấy tất cả khách sạn kể cả đã deactivate
        [HttpGet("GetAllHotels")]
        public async Task<IActionResult> GetAllHotels(
        [FromQuery] int page = 1,
        [FromQuery] int pageSize = 10)
        {
            try
            {
                var query = _context.Hotels
                    .Include(h => h.HotelImages)
                    .Include(h => h.Category)
                    .Include(h => h.Location);

                var totalCount = await query.CountAsync();
                var hotels = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .ToListAsync();

                return Ok(new
                {
                    TotalCount = totalCount,
                    Page = page,
                    PageSize = pageSize,
                    Data = hotels.Select(h => new
                    {
                        h.HotelId,
                        h.HotelName,
                        h.Address,
                        h.Description,
                        h.IsActive,
                        CategoryName = h.Category.CategoryName,
                        LocationName = h.Location.District,
                        ImageUrls = h.HotelImages.Select(i => i.ImageUrl).ToList()
                    }).ToList()
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = ex.Message });
            }
        }

        //GET api/hotel/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetHotelById(int id)
        {
            try
            {
                var hotel = await _context.Hotels
                    .Include(h => h.HotelImages)  // Bao gồm hình ảnh của khách sạn
                    .Include(h => h.RoomTypes)    // Bao gồm loại phòng
                    .ThenInclude(rt => rt.Rooms)  // Bao gồm các phòng thuộc loại phòng
                    .Include(h => h.Services)     // Bao gồm dịch vụ của khách sạn
                    .ThenInclude(s => s.ServiceImages)  // Bao gồm hình ảnh của dịch vụ
                    .Include(h => h.Category)     // Bao gồm thể loại khách sạn
                    .Include(h => h.Location)     // Bao gồm vị trí của khách sạn
                    .Include(h => h.Socials)       // Bao gồm thông tin mạng xã hội
                    .Include(h => h.HotelReviews)   // Bao gồm cả reviews của khách sạn
                        .ThenInclude(hr => hr.AccountNameNavigation)
                    .FirstOrDefaultAsync(h => h.HotelId == id && h.IsActive == true);

                if (hotel == null)
                {
                    return NotFound(new { message = "Khách sạn không tồn tại hoặc đã bị vô hiệu hóa" });
                }

                var hotelDto = new
                {
                    hotel.HotelId,
                    hotel.HotelName,
                    hotel.Address,
                    hotel.Description,
                    CategoryName = hotel.Category.CategoryName,
                    LocationName = hotel.Location.District,
                    ImageUrls = hotel.HotelImages.Select(h => h.ImageUrl).ToList(),
                    RoomTypes = hotel.RoomTypes.Select(rt => new
                    {
                        rt.RoomTypeId,
                        rt.TypeName,
                        Rooms = rt.Rooms.Select(r => new
                        {
                            r.RoomId,
                            r.PricePerNight,
                            r.Description,
                            ImageUrls = r.RoomImages.Select(ri => ri.ImageUrl).ToList()
                        }).ToList()
                    }).ToList(),
                    Services = hotel.Services.Select(s => new
                    {
                        s.ServiceId,
                        s.ServiceName,
                        ImageUrls = s.ServiceImages.Select(si => si.ImageUrl).ToList()
                    }).ToList(),
                    Social = hotel.Socials.Any() ? hotel.Socials.Select(s => s.LinkUrl).ToList() : null,
                    Reviews = hotel.HotelReviews.Select(r => new
                    {
                        r.HotelReviewId,
                        r.Rating,
                        r.ReviewText,
                        r.ReviewDate,
                        Reviewer = new
                        {
                            r.AccountNameNavigation.AccountName,
                            r.AccountNameNavigation.FirstName,
                            r.AccountNameNavigation.LastName,
                            r.AccountNameNavigation.AvatarUrl
                        }
                    }).OrderByDescending(r => r.ReviewDate).ToList()
                };

                return Ok(new
                {
                    Message = "Lấy dữ liệu khách sạn thành công",
                    Data = hotelDto
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Đã có lỗi xảy ra", details = ex.Message });
            }
        }


        [HttpPost("createHotel")]
        public async Task<IActionResult> CreateHotel(CreateHotelRequest createHotelRequest)
        {
            try
            {
                // Tạo đối tượng Hotel mới từ request
                var hotel = new BE1.Models.Hotel
                {
                    HotelName = createHotelRequest.HotelName,
                    Address = createHotelRequest.Address,
                    Description = createHotelRequest.Description,
                    CategoryId = createHotelRequest.CategoryId,
                    LocationId = createHotelRequest.LocationId,
                    IsActive = true,
                };

                // Thêm khách sạn vào cơ sở dữ liệu
                _context.Hotels.Add(hotel);
                await _context.SaveChangesAsync();  // Lưu để lấy HotelId

                // Xử lý các loại phòng được gửi từ request
                foreach (var roomTypeRequest in createHotelRequest.RoomTypes)
                {
                    // Kiểm tra nếu loại phòng đã có trong cơ sở dữ liệu
                    var existingRoomType = await _context.RoomTypes
                        .FirstOrDefaultAsync(r => r.TypeName == roomTypeRequest.TypeName && r.HotelId == hotel.HotelId);

                    if (existingRoomType == null)
                    {
                        // Nếu không có, tạo mới loại phòng
                        var newRoomType = new BE1.Models.RoomType
                        {
                            TypeName = roomTypeRequest.TypeName,
                            HotelId = hotel.HotelId  // Liên kết loại phòng với khách sạn
                        };

                        _context.RoomTypes.Add(newRoomType);
                        await _context.SaveChangesAsync();  // Lưu lại để lấy RoomTypeId

                        existingRoomType = newRoomType;
                    }

                    // Thêm các phòng vào loại phòng
                    foreach (var roomRequest in roomTypeRequest.Rooms)
                    {
                        var newRoom = new BE1.Models.Room
                        {
                            RoomTypeId = existingRoomType.RoomTypeId,
                            PricePerNight = roomRequest.PricePerNight,
                            Status = roomRequest.Status,
                            Description = roomRequest.Description,
                            MaxOccupancy = roomRequest.MaxOccupancy,
                            RoomCount = roomRequest.RoomCount
                        };
                        _context.Rooms.Add(newRoom); 
                        await _context.SaveChangesAsync();

                        // Xử lý hình ảnh phòng
                        if (roomRequest.RoomImages != null && roomRequest.RoomImages.Any())
                        {
                            foreach (var imageUrl in roomRequest.RoomImages)
                            {
                                var roomImage = new BE1.Models.RoomImage
                                {   
                                    ImageUrl = imageUrl,
                                    RoomId = newRoom.RoomId // Sử dụng RoomId của phòng mới tạo
                                };
                                _context.RoomImages.Add(roomImage);
                            }
                        }
                    }

                    // Đừng quên lưu thay đổi
                    await _context.SaveChangesAsync();
                }

                // Xử lý các dịch vụ được gửi từ request
                foreach (var serviceRequest in createHotelRequest.Services)
                {
                    // Kiểm tra nếu dịch vụ đã có trong cơ sở dữ liệu
                    var existingService = await _context.Services
                        .FirstOrDefaultAsync(s => s.ServiceName == serviceRequest.ServiceName);

                    if (existingService == null)
                    {
                        var newService = new BE1.Models.Service
                        {
                            ServiceName = serviceRequest.ServiceName,
                            ServicePrice = serviceRequest.ServicePrice,
                            ServiceType = serviceRequest.ServiceType,
                            HotelId = hotel.HotelId
                        };

                        _context.Services.Add(newService);
                        await _context.SaveChangesAsync();

                        existingService = newService;
                    }
                    else
                    {
                        hotel.Services.Add(existingService);
                    }

                    // Xử lý hình ảnh của dịch vụ
                    if (serviceRequest.ServiceImages != null && serviceRequest.ServiceImages.Any())
                    {
                        foreach (var imageUrl in serviceRequest.ServiceImages)
                        {
                            var serviceImage = new BE1.Models.ServiceImage
                            {
                                ImageUrl = imageUrl,
                                ServiceId = existingService.ServiceId
                            };
                            _context.ServiceImages.Add(serviceImage);
                        }
                    }
                }

                // Xử lý hình ảnh của khách sạn
                    if (createHotelRequest.HotelImages != null && createHotelRequest.HotelImages.Any())
                    {
                        foreach (var imageUrl in createHotelRequest.HotelImages)
                        {
                            var hotelImage = new BE1.Models.HotelImage
                            {
                                ImageUrl = imageUrl,
                                HotelId = hotel.HotelId
                            };
                            _context.HotelImages.Add(hotelImage);
                        }
                    }

                // Xử lý các mạng xã hội
                if (createHotelRequest.Social != null && createHotelRequest.Social.Any())
                {
                    foreach (var socialRequest in createHotelRequest.Social)
                    {
                        var newSocial = new BE1.Models.Social
                        {
                            LinkUrl = socialRequest.LinkUrl,
                            HotelId = hotel.HotelId
                        };
                        _context.Socials.Add(newSocial);
                    }
                }

                // Lưu các thay đổi
                await _context.SaveChangesAsync();

                return Ok(new
                {
                    Message = "Khách sạn đã được tạo thành công",
                    Data = hotel,
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return StatusCode(500, new { message = ex.Message });
            }
        }

        [HttpPut("{hotelId}")]
        public async Task<IActionResult> UpdateHotel(int hotelId, UpdateHotelRequest hotelDto)
        {
            // Kiểm tra xem khách sạn có tồn tại không
            var hotel = await _context.Hotels.FirstOrDefaultAsync(h => h.HotelId == hotelId);
            if (hotel == null)
            {
                return NotFound(new { message = "Khách sạn không tồn tại hoặc đã bị vô hiệu hóa!" });
            }

            // Cập nhật các thông tin cần thiết của khách sạn
            hotel.HotelName = hotelDto.HotelName;
            hotel.Address = hotelDto.Address;
            hotel.Description = hotelDto.Description;
            hotel.CategoryId = hotelDto.CategoryId;
            hotel.LocationId = hotelDto.LocationId;
            

            // Lưu lại thay đổi vào cơ sở dữ liệu
            await _context.SaveChangesAsync();

            return Ok(new { message = "Cập nhật khách sạn thành công" });
        }
        // Vô hiệu hóa trạng thái của khách sạn
        [HttpPut("{hotelId}/deactivate")]
        public async Task<IActionResult> DeactivateHotel(int hotelId)
        {
            var hotel = await _context.Hotels.FirstOrDefaultAsync(h => h.HotelId == hotelId && h.IsActive);
            if (hotel == null)
            {
                return NotFound(new { message = "Khách sạn không tồn tại hoặc đã bị vô hiệu hóa" });
            }

            hotel.IsActive = false;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Khách sạn đã được vô hiệu hóa thành công" });
        }

        // Khôi phục lại trạng thái khách sạn
        [HttpPut("{hotelId}/activate")]
        public async Task<IActionResult> ActivateHotel(int hotelId)
        {
            var hotel = await _context.Hotels.FirstOrDefaultAsync(h => h.HotelId == hotelId && !h.IsActive);
            if (hotel == null)
            {
                return NotFound(new { message = "Khách sạn không tồn tại hoặc đã được kích hoạt" });
            }

            hotel.IsActive = true;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Khách sạn đã được kích hoạt thành công" });
        }
    }
}
