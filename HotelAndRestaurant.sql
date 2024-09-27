create database HotelAndRestaurant
go

create table Accounts (
	account_name varchar(64) primary key NOT NULL,
	first_name nvarchar(128) NOT NULL,
	last_name nvarchar(64) NOT NULL,
	email varchar(256) NOT NULL,
	password_hash varchar(MAX) NOT NULL,
	phone varchar(16),
	role nvarchar(128) NOT NULL,
	Avatar_URl varchar(MAX),
	created_at datetime default GETDATE(),
	Update_At datetime,
);

create table Hotels (
	hotel_id int primary key  identity(1,1) NOT NULL,
	hotel_name nvarchar(256) NOT NULL,
	address nvarchar(256) NOT NULL,
	city nvarchar(256) NOT NULL,
	district nvarchar(256)not null,
	state nvarchar(256) NOT NULL,
	description text,
);

create table Hotel_Images(
	Hotel_Images_id int identity(1,1) primary key not null,
	hotel_id int,
	image_url varchar(max) NOT NULL,
	foreign key (hotel_id) references Hotels(hotel_id) 
);

--link social
create table Social(
	ID int primary key identity(1,1),
	Link_URL varchar(MAX),
	hotel_id int not null,
	foreign key (hotel_id) references Hotels(hotel_id) on delete cascade,
);

create table Room_Types(
	room_type_id int primary key identity(1,1) not null,
	hotel_id int not null,
	type_name nvarchar(128) not null,
	foreign key (hotel_id) references Hotels(hotel_id) on delete cascade,
);

create table Rooms (
	room_id int primary key NOT NULL,
	hotel_id int NOT NULL,
	room_type_id int NOT NULL,
	price_per_night decimal(10,2) NOT NULL,
	status bit not null default 0,
	description text,
	max_occupancy int NOT NULL,
	foreign key (hotel_id) references Hotels(hotel_id),
	foreign key (room_type_id) references Room_Types(room_type_id),
);

create table Hotel_Bookings(
	hotel_booking_id int identity(1,1) primary key not null,
	account_name varchar(64) not null,
	room_id int not null,
	hotel_id int not null,
	check_in_date date not null,
	check_out_date date not null,
	total_price decimal(10,2),
	status nvarchar(128) NOT NULL,
	create_at datetime default GETDATE(),
	foreign key (account_name) references Accounts(account_name),
	foreign key (room_id) references Rooms(room_id),
	foreign key (hotel_id) references Hotels(hotel_id)
);

create table Room_Images(
	image_id int primary key NOT NULL,
	room_id int,
	image_url varchar(max) NOT NULL,
	foreign key (room_id) references Rooms(room_id) 
);


create table Room_Reviews(
	room_review_id int identity(1,1) primary key not null,
	account_name varchar(64) not null,
	room_id int not null,
	rating int check(rating >=1 and rating <=5),
	review_text text,
	review_date date not null,
	foreign key (account_name) references Accounts(account_name),
	foreign key (room_id) references Rooms(room_id),
);

create table Room_Review_Images (
	room_review_image_id int identity(1,1)primary key not null,
	room_review_id int not null,
	image_url varchar(max),
	foreign key (room_review_id) references Room_Reviews(room_review_id)
);

create table Services(
	service_id int identity(1,1) primary key not null,
	service_name nvarchar(128) not null,
	service_price decimal(10,2) not null,
	description text,
);

create table Service_Bookings(
	service_booking_id int identity(1,1) primary key not null,
	hotel_booking_id int not null,
	service_id int not null,
	quantity int not null,
	total_price decimal(10,2),
	foreign key (hotel_booking_id) references Hotel_Bookings(hotel_booking_id),
	foreign key (service_id) references Services(service_id)
);

create table Service_Images(
	image_id int primary key NOT NULL,
	service_id int,
	image_url varchar(max) NOT NULL,
	foreign key (service_id) references Services(service_id) 
);


create table Service_Reviews(
	service_review_id int identity(1,1) primary key not null,
	account_name varchar(64) not null,
	service_id int not null,
	rating int check(rating >=1 and rating <=5),
	review_text text,
	review_date date not null,
	foreign key (account_name) references Accounts(account_name),
	foreign key (service_id) references Services(service_id)
);

create table Services_Review_Images (
	services_review_image_id int identity(1,1) primary key not null,
	service_review_id int not null,
	image_url varchar(max),
	foreign key (service_review_id) references Service_Reviews(service_review_id)
);

create table Restaurants (
	restaurant_id int identity(1,1) primary key NOT NULL,
	restaurant_name nvarchar(256) NOT NULL,
	address nvarchar(256) NOT NULL,
	city nvarchar(256) NOT NULL,
	state nvarchar(256) NOT NULL,
	rating decimal(2,1) default 0.0,
	description text,
	image_url varchar(256),
	hotel_id int not null,
	foreign key (hotel_id) references Hotels(hotel_id)
);

create table Menu_Categories (
	categories_id int identity(1,1)primary key not null,
	categories_name nvarchar(256) not null,
	restaurant_id int not null,
	foreign key (restaurant_id) references Restaurants(restaurant_id)
);

create table Restaurant_Bookings (
	restaurant_booking_id int primary key NOT NULL,
	account_name varchar(64) not null,
	restaurant_id int,
	booking_date date NOT NULL,
	booking_time time NOT NULL,
	number_of_people int NOT NULL,
	status nvarchar(128) NOT NULL,
	foreign key (account_name) references Accounts(account_name),
	foreign key (restaurant_id) references Restaurants(restaurant_id)
);

create table Restaurant_Images(
	image_id int primary key NOT NULL,
	restaurant_id int,
	image_url varchar(max) NOT NULL,
	foreign key (restaurant_id) references Restaurants(restaurant_id) 
);


create table Restaurant_Reviews(
	restaurant_review_id int primary key identity(1,1) not null,
	account_name varchar(64) not null,
	restaurant_id int not null,
	rating int check(rating >=1 and rating <=5),
	review_text text,
	review_date date not null,
	foreign key (account_name) references Accounts(account_name),
	foreign key (restaurant_id) references Restaurants(restaurant_id),
);

create table Restaurant_Review_Images(
	image_id int primary key NOT NULL,
	restaurant_review_id int,
	image_url varchar(max) NOT NULL,
	foreign key (restaurant_review_id) references Restaurant_Reviews(restaurant_review_id) 
);


create table Menu_Items (
	item_id int identity(1,1)primary key not null,
	item_name nvarchar(256) not null,
	item_price varchar(128) not null,
	categories_id int not null,
	description text,
	foreign key(categories_id) references Menu_Categories(categories_id)
); 

create table Order_Menu_Items (
	order_menu_item_id int identity(1,1) primary key not null,
	account_name varchar(64) not null,
	order_date datetime default getdate(),
	total_amount decimal(10,2) not null,
	status varchar(32),
	foreign key (account_name) references Accounts(account_name)
);

create table Order_Items (
	order_item_id int identity(1,1) primary key not null,
	order_menu_item_id int not null,
	quantity int not null,
	price decimal(10,2),
	foreign key (order_menu_item_id) references Order_Menu_Items(order_menu_item_id)
);

create table Payments (
	payment_id int primary key NOT NULL,
	hotel_booking_id int,
	service_booking_id int,
	restaurant_booking_id int,
	payment_method nvarchar(256) NOT NULL,
	payment_amount decimal(10,2),
	payment_date datetime default getdate(),
	foreign key (hotel_booking_id) references Hotel_Bookings(hotel_booking_id),
	foreign key (restaurant_booking_id) references Restaurant_Bookings(restaurant_booking_id),
	foreign key (service_booking_id) references Service_Bookings(service_booking_id)
);

create table Bank_Card (
	card_id int identity not null,
	card_name varchar(128) not null,
	card_number varchar(64) not null,
	card_cvv varchar(8) not null,
	expiration_date date not null,
	create_at datetime default getdate()
);

create table Discount (
	discount_id int identity primary key not null,
	discount_code varchar(64) not null,
	description nvarchar(256) not null,
	discount_percentage decimal(5,2),
	start_date date,
	end_date date,
	create_at datetime default getdate(),
	update_at datetime,
);
