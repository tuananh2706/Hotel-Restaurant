CREATE DATABASE hotel_main;
GO

USE hotel_main;
GO

CREATE TABLE Accounts (
    account_name NVARCHAR(255) NOT NULL PRIMARY KEY,
    first_name NVARCHAR(255) NOT NULL,
    last_name NVARCHAR(255) NOT NULL,
    email NVARCHAR(255) NOT NULL UNIQUE,
    password_hash NVARCHAR(255) NOT NULL,
    phone NVARCHAR(20),
    BirthDate DATE,
    Nationality NVARCHAR(100),
    role NVARCHAR(50),
    Avatar_URL NVARCHAR(255),
    created_at DATETIME DEFAULT GETDATE(),
    update_at DATETIME DEFAULT GETDATE()
);

CREATE TABLE Hotels (
    hotel_id INT PRIMARY KEY IDENTITY(1,1),
    hotel_name NVARCHAR(255) NOT NULL,
    address NVARCHAR(255) NOT NULL,
    city NVARCHAR(100) NOT NULL,
    district NVARCHAR(100),
    state NVARCHAR(100),
    description NVARCHAR(MAX)
);

CREATE TABLE Room_Types (
    room_type_id INT PRIMARY KEY IDENTITY(1,1),
    hotel_id INT NOT NULL,
    type_name NVARCHAR(255) NOT NULL,
    FOREIGN KEY (hotel_id) REFERENCES Hotels(hotel_id)
);

CREATE TABLE Rooms (
    room_id INT PRIMARY KEY IDENTITY(1,1),
    room_type_id INT NOT NULL,
    price_per_night DECIMAL(18, 2) NOT NULL,
    status NVARCHAR(50) NOT NULL,  -- Ví dụ: "available", "booked"
    description NVARCHAR(MAX),
    max_occupancy INT NOT NULL,
    room_count INT NOT NULL,
    FOREIGN KEY (room_type_id) REFERENCES Room_Types(room_type_id)
);


CREATE TABLE Services (
    service_id INT PRIMARY KEY IDENTITY(1,1),
    service_name NVARCHAR(255) NOT NULL,
    service_price DECIMAL(18, 2) NOT NULL,
    description NVARCHAR(MAX),
    service_type NVARCHAR(100) NOT NULL,
    hotel_id INT NOT NULL,
    FOREIGN KEY (hotel_id) REFERENCES Hotels(hotel_id)
);

CREATE TABLE Bank_Card (
    bank_card_id INT PRIMARY KEY IDENTITY(1,1),
    account_name NVARCHAR(255) NOT NULL,
    card_number NVARCHAR(20) NOT NULL UNIQUE,
    expiration_date DATE NOT NULL,
    card_type NVARCHAR(50) NOT NULL,
    FOREIGN KEY (account_name) REFERENCES Accounts(account_name)
);

CREATE TABLE Hotel_Bookings (
    hotel_booking_id INT PRIMARY KEY IDENTITY(1,1),
    account_name NVARCHAR(255) NOT NULL,
    room_id INT NOT NULL,
    hotel_id INT NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    total_price DECIMAL(18, 2) NOT NULL,
    status NVARCHAR(50) NOT NULL,
    create_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (account_name) REFERENCES Accounts(account_name),
    FOREIGN KEY (room_id) REFERENCES Rooms(room_id),
    FOREIGN KEY (hotel_id) REFERENCES Hotels(hotel_id)
);

CREATE TABLE Hotel_Reviews (
    hotel_review_id INT PRIMARY KEY IDENTITY(1,1),
    account_name NVARCHAR(255) NOT NULL,
    hotel_id INT NOT NULL,
    rating INT NOT NULL,
    review_text NVARCHAR(MAX),
    review_date DATE DEFAULT GETDATE(),
    FOREIGN KEY (account_name) REFERENCES Accounts(account_name),
    FOREIGN KEY (hotel_id) REFERENCES Hotels(hotel_id)
);

CREATE TABLE Room_Reviews (
    room_review_id INT PRIMARY KEY IDENTITY(1,1),
    account_name NVARCHAR(255) NOT NULL,
    room_id INT NOT NULL,
    rating INT NOT NULL,
    review_text NVARCHAR(MAX),
    review_date DATE DEFAULT GETDATE(),
    FOREIGN KEY (account_name) REFERENCES Accounts(account_name),
    FOREIGN KEY (room_id) REFERENCES Rooms(room_id)
);

CREATE TABLE Hotel_Images (
    Hotel_Images_id INT PRIMARY KEY IDENTITY(1,1),
    hotel_id INT NOT NULL,
    image_url NVARCHAR(255) NOT NULL,
    FOREIGN KEY (hotel_id) REFERENCES Hotels(hotel_id)
);

INSERT INTO Hotel_Images (hotel_id, image_url) 
VALUES (1, 'https://example.com/hotel1_1.jpg'), 
       (1, 'https://example.com/hotel1_2.jpg'), 
       (2, 'https://example.com/hotel2_1.jpg'), 
       (3, 'https://example.com/hotel3_1.jpg'),
       (4, 'https://example.com/hotel4_1.jpg');

CREATE TABLE Room_Images (
    image_id INT PRIMARY KEY IDENTITY(1,1),
    room_id INT NOT NULL,
    image_url NVARCHAR(255) NOT NULL,
    FOREIGN KEY (room_id) REFERENCES Rooms(room_id)
);

CREATE TABLE Hotel_Invoices (
    hotel_invoice_id INT PRIMARY KEY IDENTITY(1,1),
    hotel_booking_id INT NOT NULL,
    invoice_date DATE NOT NULL,
    total_amount DECIMAL(18, 2) NOT NULL,
    status NVARCHAR(50) NOT NULL,
    FOREIGN KEY (hotel_booking_id) REFERENCES Hotel_Bookings(hotel_booking_id)
);

CREATE TABLE Invoice_Details (
    invoice_detail_id INT PRIMARY KEY IDENTITY(1,1),
    invoice_id INT NOT NULL,
    invoice_type NVARCHAR(50) NOT NULL,
    room_id INT,
    service_id INT,
    quantity INT NOT NULL,
    price DECIMAL(18, 2) NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES Hotel_Invoices(hotel_invoice_id),
    FOREIGN KEY (room_id) REFERENCES Rooms(room_id),
    FOREIGN KEY (service_id) REFERENCES Services(service_id)
);

CREATE TABLE Payments (
    payment_id INT PRIMARY KEY IDENTITY(1,1),
    hotel_booking_id INT,
    service_booking_id INT,
    restaurant_booking_id INT,
    amount DECIMAL(18, 2) NOT NULL,
    payment_date DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (hotel_booking_id) REFERENCES Hotel_Bookings(hotel_booking_id)
);

CREATE TABLE Service_Bookings (
    service_booking_id INT PRIMARY KEY IDENTITY(1,1),
    hotel_booking_id INT NOT NULL,
    service_id INT NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(18, 2) NOT NULL,
    FOREIGN KEY (hotel_booking_id) REFERENCES Hotel_Bookings(hotel_booking_id),
    FOREIGN KEY (service_id) REFERENCES Services(service_id)
);

CREATE TABLE Service_Reviews (
    service_review_id INT PRIMARY KEY IDENTITY(1,1),
    account_name NVARCHAR(255) NOT NULL,
    service_id INT NOT NULL,
    rating INT NOT NULL,
    review_text NVARCHAR(MAX),
    review_date DATE DEFAULT GETDATE(),
    FOREIGN KEY (account_name) REFERENCES Accounts(account_name),
    FOREIGN KEY (service_id) REFERENCES Services(service_id)
);

CREATE TABLE Service_Invoices (
    service_invoice_id INT PRIMARY KEY IDENTITY(1,1),
    service_booking_id INT NOT NULL,
    invoice_date DATETIME DEFAULT GETDATE(),
    total_amount DECIMAL(18, 2) NOT NULL,
    status NVARCHAR(50) NOT NULL,
    FOREIGN KEY (service_booking_id) REFERENCES Service_Bookings(service_booking_id)
);

CREATE TABLE Service_Images (
    image_id INT PRIMARY KEY IDENTITY(1,1),
    service_id INT NOT NULL,
    image_url NVARCHAR(255) NOT NULL,
    FOREIGN KEY (service_id) REFERENCES Services(service_id)
);

CREATE TABLE Social (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Link_URL NVARCHAR(255) NOT NULL,
    hotel_id INT NOT NULL,
    FOREIGN KEY (hotel_id) REFERENCES Hotels(hotel_id)
);

CREATE TABLE Favorite_Hotels (
    favorite_hotel_id INT PRIMARY KEY IDENTITY(1,1),
    account_name NVARCHAR(255),
    hotel_id INT NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (account_name) REFERENCES Accounts(account_name),
    FOREIGN KEY (hotel_id) REFERENCES Hotels(hotel_id)
);

CREATE TABLE RefreshTokens (
    Id INT PRIMARY KEY IDENTITY,
    account_name NVARCHAR(255),
    Token NVARCHAR(500),
    ExpiryDate DATETIME2,
    Revoked bit DEFAULT 0,
    CreatedAt DATETIME DEFAULT GETDATE(),
    FOREIGN KEY (account_name) REFERENCES Accounts(account_name)
);

-- Tạo bảng Hotel_Categories
CREATE TABLE Hotel_Categories (
    category_id INT PRIMARY KEY IDENTITY(1,1), -- Mã danh mục
    category_name NVARCHAR(255) NOT NULL,     -- Tên danh mục
    description NVARCHAR(MAX),                -- Mô tả danh mục
    created_at DATETIME DEFAULT GETDATE(),    -- Thời gian tạo
    updated_at DATETIME DEFAULT GETDATE()     -- Thời gian cập nhật
);

-- Thêm cột category_id vào bảng Hotels để liên kết với bảng Hotel_Categories
ALTER TABLE Hotels
ADD category_id INT;

-- Thêm ràng buộc khóa ngoại (foreign key) để liên kết Hotels với Hotel_Categories
ALTER TABLE Hotels
ADD CONSTRAINT FK_Hotels_Hotel_Categories FOREIGN KEY (category_id)
REFERENCES Hotel_Categories(category_id);	

CREATE TABLE Locations (
    location_id INT PRIMARY KEY IDENTITY(1,1), -- Mã địa điểm
    district NVARCHAR(100) NOT NULL,          -- Quận
    created_at DATETIME DEFAULT GETDATE(),    -- Thời gian tạo
    updated_at DATETIME DEFAULT GETDATE()     -- Thời gian cập nhật
);

-- Thêm cột location_id vào bảng Hotels
ALTER TABLE Hotels
ADD location_id INT;

-- Tạo ràng buộc khóa ngoại cho location_id
ALTER TABLE Hotels
ADD CONSTRAINT FK_Hotels_Locations FOREIGN KEY (location_id)
REFERENCES Locations(location_id);

-- Xóa các cột district trong bảng Hotels
ALTER TABLE Hotels
DROP COLUMN district;

-- Xóa cột city (nếu cần)
ALTER TABLE Hotels
DROP COLUMN city;

-- Xóa cột state (nếu cần)
ALTER TABLE Hotels
DROP COLUMN state;


-- thêm trường mới cho Hotels cho chức năng xóa mềm. 
ALTER TABLE Hotels
ADD isActive bit NOT NULL DEFAULT 1;


select * from Hotel_Categories

INSERT INTO Locations (district)
VALUES 
('1'),
('2'),
('3'),
('4'),
('5'),
('6'),
('7'),
('8'),
('9'),
('10'),
('11'),
('12'),
('Gò Vấp'),
('Bình Thạnh'),
('Tân Phú'),
('Tân Bình');

INSERT INTO Hotel_Categories (category_name, description)
VALUES 
('1', N'Khách sạn 1 sao'),
('2', N'Khách sạn 2 sao'),
('3', N'Khách sạn 3 sao'),
('4', N'Khách sạn 4 sao'),
('5', N'Khách sạn 5 sao');


-- 1. Xóa dữ liệu từ các bảng liên quan đến Payments trước
DELETE FROM Payments;

-- 2. Xóa dữ liệu từ các bảng liên quan đến Invoice
DELETE FROM Invoice_Details;
DELETE FROM Hotel_Invoices;
DELETE FROM Service_Invoices;

-- 3. Xóa dữ liệu từ các bảng Reviews và Images
DELETE FROM Room_Reviews;
DELETE FROM Hotel_Reviews;
DELETE FROM Service_Reviews;
DELETE FROM Room_Images;
DELETE FROM Hotel_Images;
DELETE FROM Service_Images;

-- 4. Xóa dữ liệu từ các bảng Bookings
DELETE FROM Service_Bookings;
DELETE FROM Hotel_Bookings;

-- 5. Xóa dữ liệu từ các bảng phụ khác
DELETE FROM Favorite_Hotels;
DELETE FROM Social;
DELETE FROM Services;

-- 6. Xóa dữ liệu từ các bảng liên quan đến Rooms
DELETE FROM Rooms;
DELETE FROM Room_Types;

-- 7. Cuối cùng mới xóa dữ liệu từ bảng Hotels
DELETE FROM Hotels;

-- Reset lại các giá trị IDENTITY
DBCC CHECKIDENT ('Hotels', RESEED, 0);
DBCC CHECKIDENT ('Room_Types', RESEED, 0);
DBCC CHECKIDENT ('Rooms', RESEED, 0);
DBCC CHECKIDENT ('Hotel_Images', RESEED, 0);
DBCC CHECKIDENT ('Services', RESEED, 0);
DBCC CHECKIDENT ('Social', RESEED, 0);
DBCC CHECKIDENT ('Hotel_Invoices', RESEED, 0);
DBCC CHECKIDENT ('Service_Invoices', RESEED, 0);
DBCC CHECKIDENT ('Invoice_Details', RESEED, 0);
DBCC CHECKIDENT ('Payments', RESEED, 0);
DBCC CHECKIDENT ('Service_Bookings', RESEED, 0);
DBCC CHECKIDENT ('Service_Images', RESEED, 0);
DBCC CHECKIDENT ('Room_Images', RESEED, 0);
EXEC sp_help 'Hotels';

select * from Hotels

-- Tạo dữ liệu mẫu mới cho Hotels
INSERT INTO Hotels (hotel_name, address, category_id, location_id, description, isActive)
VALUES 
(N'The Reverie Saigon', N'22-36 Nguyễn Huệ, Quận 1', 5, 1, N'Khách sạn 5 sao sang trọng với tầm nhìn panorama ra thành phố', 1),
(N'Park Hyatt Saigon', N'2 Công Trường Lam Sơn, Quận 1', 5, 1, N'Khách sạn cao cấp phong cách Pháp colonial', 1),
(N'Rex Hotel', N'141 Nguyễn Huệ, Quận 1', 4, 1, N'Khách sạn lịch sử với kiến trúc độc đáo', 1),
(N'Hotel Des Arts', N'76-78 Nguyễn Thị Minh Khai, Quận 3', 5, 3, N'Khách sạn boutique với thiết kế nghệ thuật độc đáo', 1),
(N'Liberty Central Saigon', N'179 Lê Thánh Tôn, Quận 1', 4, 1, N'Khách sạn hiện đại trong khu trung tâm', 1),
(N'Mường Thanh Luxury', N'261C Nguyễn Văn Trỗi, Phú Nhuận', 4, 14, N'Khách sạn cao cấp với dịch vụ đẳng cấp', 1),
(N'ibis Saigon Airport', N'2 Hồng Hà, Tân Bình', 3, 16, N'Khách sạn tiện nghi gần sân bay', 1),
(N'Holiday Inn', N'491 Hoàng Văn Thụ, Tân Bình', 4, 16, N'Khách sạn quốc tế tiêu chuẩn', 1);

-- Tạo các loại phòng cho từng khách sạn
INSERT INTO Room_Types (hotel_id, type_name)
VALUES 
(1, N'Deluxe King'),
(1, N'Grand Deluxe'),
(1, N'Junior Suite'),
(2, N'Park Suite'),
(2, N'Deluxe Room'),
(3, N'Premium Deluxe'),
(3, N'Executive Suite'),
(4, N'Deluxe Sky View'),
(4, N'Luxury Suite'),
(5, N'Deluxe City View'),
(5, N'Executive Room'),
(6, N'Superior Room'),
(6, N'Deluxe Room'),
(7, N'Standard Room'),
(7, N'Superior Room'),
(8, N'Deluxe Room'),
(8, N'Suite Room');

-- Tạo phòng cho các loại phòng
INSERT INTO Rooms (room_type_id, price_per_night, status, description, max_occupancy, room_count)
VALUES 
(1, 5500000, 'available', N'Phòng sang trọng với view thành phố', 2, 5),
(1, 6500000, 'available', N'Phòng rộng rãi với tiện nghi cao cấp', 2, 3),
(2, 8500000, 'available', N'Suite với phòng khách riêng biệt', 3, 2),
(3, 12000000, 'available', N'Suite cao cấp với dịch vụ quản gia', 2, 2),
(4, 7500000, 'available', N'Phòng view đẹp với tiện nghi 5 sao', 2, 4),
(5, 4500000, 'available', N'Phòng tiêu chuẩn sang trọng', 2, 6),
(6, 3500000, 'available', N'Phòng premium với view thành phố', 2, 5),
(7, 2800000, 'available', N'Phòng tiêu chuẩn gần sân bay', 2, 8),
(8, 3200000, 'available', N'Phòng superior tiện nghi', 2, 6);

-- Tạo dữ liệu hình ảnh cho khách sạn
INSERT INTO Hotel_Images (hotel_id, image_url)
VALUES 
(1, 'https://example.com/reverie-1.jpg'),
(1, 'https://example.com/reverie-2.jpg'),
(2, 'https://example.com/parkhyatt-1.jpg'),
(2, 'https://example.com/parkhyatt-2.jpg'),
(3, 'https://example.com/rex-1.jpg'),
(3, 'https://example.com/rex-2.jpg'),
(4, 'https://example.com/desarts-1.jpg'),
(4, 'https://example.com/desarts-2.jpg');

-- Tạo dữ liệu dịch vụ cho khách sạn
INSERT INTO Services (service_name, service_price, description, service_type, hotel_id)
VALUES 
(N'Spa Cao Cấp', 1500000, N'Dịch vụ spa cao cấp với các liệu pháp trị liệu', N'Spa', 1),
(N'Nhà Hàng Á Âu', 500000, N'Nhà hàng phục vụ ẩm thực Á - Âu', N'Restaurant', 1),
(N'Phòng Gym', 200000, N'Phòng tập gym với thiết bị hiện đại', N'Fitness', 2),
(N'Hồ Bơi Vô Cực', 300000, N'Hồ bơi vô cực view panorama', N'Pool', 2),
(N'Dịch Vụ Đưa Đón', 800000, N'Dịch vụ đưa đón sân bay', N'Transport', 3);

-- Tạo dữ liệu social media cho khách sạn
INSERT INTO Social (Link_URL, hotel_id)
VALUES 
('https://facebook.com/reveriesaigon', 1),
('https://instagram.com/reveriesaigon', 1),
('https://facebook.com/parkhyattsaigon', 2),
('https://facebook.com/rexhotelsaigon', 3),
('https://instagram.com/hoteldesartssaigon', 4);