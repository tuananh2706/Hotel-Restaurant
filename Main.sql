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

INSERT INTO Hotel_Categories (category_name, description)
VALUES 
('1', N'Khách sạn 1 sao'),
('2', N'Khách sạn 2 sao'),
('3', N'Khách sạn 3 sao'),
('4', N'Khách sạn 4 sao'),
('5', N'Khách sạn 5 sao');

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

INSERT INTO Hotels (hotel_name, address, category_id, location_id, description)
VALUES 
('Khách sạn 1 sao ABC', '123 Đường ABC, Quận 1', 1, 1, 'Khách sạn 1 sao giá rẻ tại trung tâm thành phố'),
('Khách sạn 3 sao XYZ', '456 Đường XYZ, Quận 3', 3, 3, 'Khách sạn 3 sao với tiện nghi đầy đủ và dịch vụ tốt'),
('Khách sạn 5 sao DEF', '789 Đường DEF, Quận 5', 5, 5, 'Khách sạn cao cấp với các dịch vụ đẳng cấp quốc tế');

INSERT INTO Hotels (hotel_name, address, category_id, location_id, description)
VALUES 
(N'Khách sạn 1 sao ABC', N'123 Đường ABC, Quận 1', 1, 1, N'Khách sạn 1 sao giá rẻ tại trung tâm thành phố'),
(N'Khách sạn 3 sao XYZ', N'456 Đường XYZ, Quận 3', 3, 3, N'Khách sạn 3 sao với tiện nghi đầy đủ và dịch vụ tốt'),
(N'Khách sạn 5 sao DEF', N'789 Đường DEF, Quận 5', 5, 5, N'Khách sạn cao cấp với các dịch vụ đẳng cấp quốc tế');

-- Tạo dữ liệu mẫu cho bảng Room_Types
INSERT INTO Room_Types (hotel_id, type_name)
VALUES 
(1, 'Standard'),
(1, 'Deluxe'),
(2, 'Standard'),
(2, 'Executive'),
(3, 'Luxury');

-- Tạo dữ liệu mẫu cho bảng Rooms
INSERT INTO Rooms (room_type_id, price_per_night, status, description, max_occupancy, room_count)
VALUES 
(1, 500000, 'available', 'Phòng tiêu chuẩn với đầy đủ tiện nghi', 2, 10),
(2, 800000, 'available', 'Phòng Deluxe với view đẹp', 2, 5),
(3, 600000, 'booked', 'Phòng tiêu chuẩn tiện nghi', 2, 8),
(4, 1200000, 'available', 'Phòng Executive với các tiện nghi cao cấp', 3, 4),
(5, 2000000, 'available', 'Phòng Luxury sang trọng và đẳng cấp', 3, 2);

-- Tạo dữ liệu mẫu cho bảng Hotel_Images
INSERT INTO Hotel_Images (hotel_id, image_url)
VALUES 
(1, 'https://example.com/hotel1_1.jpg'),
(1, 'https://example.com/hotel1_2.jpg'),
(2, 'https://example.com/hotel2_1.jpg'),
(2, 'https://example.com/hotel2_2.jpg'),
(3, 'https://example.com/hotel3_1.jpg');

-- Tạo dữ liệu mẫu cho bảng Hotel_Bookings
INSERT INTO Hotel_Bookings (account_name, room_id, hotel_id, check_in_date, check_out_date, total_price, status)
VALUES 
('test5', 1, 1, '2024-12-01', '2024-12-05', 2000000, 'booked'),
('trung', 3, 2, '2024-12-10', '2024-12-12', 1800000, 'booked');

INSERT INTO Payments (hotel_booking_id, amount)
VALUES 
(1, 2000000),
(2, 1800000);

INSERT INTO Hotel_Reviews (account_name, hotel_id, rating, review_text)
VALUES 
('test5', 1, 4, 'Khách sạn đẹp, dịch vụ ổn'),
('trung', 2, 5, 'Khách sạn tuyệt vời, nhân viên thân thiện');

-- Tạo dữ liệu mẫu cho bảng Room_Reviews
INSERT INTO Room_Reviews (account_name, room_id, rating, review_text)
VALUES 
('test5', 1, 4, 'Phòng sạch sẽ, thoải mái'),
('trung', 3, 5, 'Phòng rất đẹp và tiện nghi');

INSERT INTO Social (Link_URL, hotel_id)
VALUES 
('https://facebook.com/hotel1', 1),
('https://instagram.com/hotel2', 2),
('https://twitter.com/hotel3', 3);

-- Tạo dữ liệu mẫu cho bảng Favorite_Hotels
INSERT INTO Favorite_Hotels (account_name, hotel_id)
VALUES 
('test5', 2),
('trung', 3);

