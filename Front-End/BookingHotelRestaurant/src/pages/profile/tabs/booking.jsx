import Input from "../../../component/inputSearch";
import Title from "../../../component/text/titleCategory";
import BookingHotel from "../../../component/hotel/bookingHotel";
import Demo1 from "../../../assets/img/disscount/demo1.jpg";
import Demo2 from "../../../assets/img/disscount/demo2.jpg";
import Demo3 from "../../../assets/img/disscount/demo3.jpg";

function Booking() {
  const demoData = [
    {
      id: 12345,
      hotelName: "Hotel Name",
      address: "69 đường 59, phường 14, quận Gò Vấp, Tp.Hồ Chí Minh",
      checkin: "Thứ 7, ngày 19/10/2024",
      checkout: "Thứ 2, ngày 21/10/2024",
      typeRoom: "Phòng đơn",
      status: 0,
      hotelImg: Demo1,
    },
    {
      id: 12655,
      hotelName: "Hotel Name",
      address: "69 đường 59, phường 14, quận Gò Vấp, Tp.Hồ Chí Minh",
      checkin: "Thứ 7, ngày 19/10/2024",
      checkout: "Thứ 2, ngày 21/10/2024",
      typeRoom: "Phòng đơn",
      status: 1,
      hotelImg: Demo2,
    },
    {
      id: 17745,
      hotelName: "Hotel Name",
      address: "25 đường Bùi Quang Là,phường 12, quận Gò Vấp, Tp.Hồ Chí Minh",
      checkin: "Thứ 4, ngày 16/10/2024",
      checkout: "Thứ 7, ngày 19/10/2024",
      typeRoom: "Phòng đôi",
      status: 2,
      hotelImg: Demo3,
    },
  ];

  const doneBooking = demoData.filter((item) => item.status !== 0);
  const booking = demoData.filter((item) => item.status === 0);

  return (
    <div className="p-2 lg:p-0">
      <div className="flex flex-col gap-6">
        <Title className={"text-[28px] font-medium text-center lg:text-left"}>Booking</Title>
        {booking &&
          booking.map((item) => <BookingHotel key={item.id} obj={item} />)}
      </div>
      <div className="mt-5 grid gap-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <Title className={"text-[28px] font-medium"}>Lịch sử booking</Title>
          <Input placeholder="Tìm kiếm khách sạn" className={"w-[281px]"} />
        </div>
        {doneBooking &&
          doneBooking.map((item) => <BookingHotel key={item.id} obj={item} />)}
      </div>
    </div>
  );
}

export default Booking;
