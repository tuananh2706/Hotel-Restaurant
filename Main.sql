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
