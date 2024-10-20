import HotelPreview from "../../../component/hotel/hotelPreview";
import Input from "../../../component/inputSearch";
import Title from "../../../component/text/titleCategory";
import Demo from "../../../assets/img/banner.png";

function Favourite() {
  const demoData = [
    {
      hotelName: "Hotel Name ",
      hotelThumbnail: Demo,
      localtion: "Tân Phú",
      category: "1 sao",
    },
    {
      hotelName: "Hotel Name ",
      hotelThumbnail: Demo,
      localtion: "Tân Bình",
      category: "2 sao",
    },
    {
      hotelName: "Hotel Name ",
      hotelThumbnail: Demo,
      localtion: "Bình Thạnh",
      category: "3 sao",
    },
    {
      hotelName: "Hotel Name ",
      hotelThumbnail: Demo,
      localtion: "Gò Vấp",
      category: "4 sao",
    },
    {
      hotelName: "Hotel Name ",
      hotelThumbnail: Demo,
      localtion: "Quận 1",
      category: "5 sao",
    },
    {
      hotelName: "Hotel Name ",
      hotelThumbnail: Demo,
      localtion: "Quận 3",
      category: "5 sao",
    },
  ];

  return (
    <div className="flex flex-col gap-6 ">
      <div className="flex justify-between items-center">
        <Title className={"text-[28px] font-medium"}>Khách Sạn Yêu Thích</Title>
        <Input
          placeholder="Tìm kiếm khách sạn yêu thích ...."
          className={"w-[281px] h-[42px]"}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        {demoData &&
          demoData.map((item, index) => {
           return <HotelPreview
              key={index}
              title={item.hotelName}
              thumbnail={item.hotelThumbnail}
              localtion={item.localtion}
              category = {item.category}
            />;
          })}
      </div>
    </div>
  );
}

export default Favourite;
