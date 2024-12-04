import { useState } from "react";
import demo from "../../assets/img/bannerLogin.jpg";
import DisscountItem from "../../component/hotel/disscountItem";
import RoomItem from "../../component/hotel/roomItem";
import ServiceItem from "../../component/hotel/serviceItem";
import Text from "../../component/text/text";
import ArrowUpIcon from "../../assets/icons/arrowUpIcon";
import ArrDownIcon from "../../assets/icons/arrowDownIcon";
import RaitingProfile from "../../component/cards/cardRaitingInProfile";
import ArrowleftIcon from "../../assets/icons/arrowLeftIcon";
import ArrowrightIcon from "../../assets/icons/arrowRightIcon";

function HotelDetail() {
  const [toggleService, setToggleService] = useState(false);
  const [toggleDisscount, setToggleDisscount] = useState(false);

  const infomationsHotel = [
    { icon: "I", label: "Demo information || demo information" },
    { icon: "I", label: "Demo information || demo information" },
    { icon: "I", label: "Demo information || demo information" },
    { icon: "I", label: "Demo information || demo information" },
  ];
  const offer = [
    { icon: "I", label: "Sun, 06:00 PM - 09:30 PM", amount: 100, status: true },
    {
      icon: "I",
      label: "Sun, 06:00 PM - 09:30 PM",
      amount: 100,
      status: false,
    },
    { icon: "I", label: "Sun, 06:00 PM - 09:30 PM", amount: 100, status: true },
  ];
  const roomType = [
    { img: demo, roomType: "Phòng đơn", amount: 2 },
    { img: demo, roomType: "Phòng đôi", amount: 2 },
    { img: demo, roomType: "Phòng master", amount: 2 },
    { img: demo, roomType: "Phòng đơn", amount: 2 },
  ];
  const service = [
    {
      img: demo,
      name: "wifi",
      price: 0,
      description:
        "abcncmvmfrkmrsdfgsdkgjsdoigjesroigjseorigjseogihselgrhserdddddddđk",
    },
    { img: demo, name: "wifi", price: 500, description: "abcncmvmfrkmrk" },
    { img: demo, name: "wifi", price: 500, description: "abcncmvmfrkmrk" },
    { img: demo, name: "wifi", price: 500, description: "abcncmvmfrkmrk" },
    { img: demo, name: "wifi", price: 500, description: "abcncmvmfrkmrk" },
  ];
  return (
    <div className="w-[1400px] p-5 pb-10 h-auto flex gap-4">
      {/* left pane */}
      <div className="w-full md:w-[70%] flex flex-col gap-5">
        {/* Img khách sạn */}
        <div className="w-full h-[420px] relative group overflow-hidden rounded-[20px]">
          <img
            src={demo}
            alt=""
            className="w-full h-full object-cover rounded-[20px] group-hover:opacity-90 transition-opacity duration-200"
          />
          {/* Left */}
          <div
            className="h-full absolute cursor-pointer bg-black left-[-10%] rounded-l-[20px] w-[10%] flex items-center justify-center
           top-0 opacity-10 hover:opacity-100 hover:bg-opacity-30  group-hover:left-0 transition-all duration-300 ease-in-out"
          >
            <ArrowleftIcon size="50" color="#FFFFFF" />
          </div>
          {/* Right */}
          <div
            className="h-full absolute cursor-pointer bg-black right-[-10%] rounded-r-[20px] w-[10%] flex items-center justify-center
           top-0 opacity-10 hover:opacity-100 hover:bg-opacity-30  group-hover:right-0 transition-all duration-300 ease-in-out"
          >
            <ArrowrightIcon size="50" color="#FFFFFF" />
          </div>
          {/* List Img */}
          <div
            className="h-1/6 w-1/2 absolute bottom-[-17%]
           left-[25%] group-hover:bottom-[10px] transition-all duration-300 ease-in-out flex gap-2"
          >
            <div className="bg-white rounded-xl w-[70px] h-[70px] flex items-center justify-center">
              <img src={demo} className="w-full h-full rounded-xl" />
            </div>
            <div className="bg-white rounded-xl w-[70px] h-[70px] flex items-center justify-center">
              <img src={demo} className="w-full h-full rounded-xl" />
            </div>
          </div>
        </div>
        {/* Infomation Hotels */}
        <div className="w-full bg-white py-8 px-6 rounded-xl flex flex-col gap-5">
          <div className="flex justify-between items-center border-b-seconGray border-b-[1px] border-opacity-50 pb-4">
            <Text className={"text-[28px] font-medium"}>Hotels Demos</Text>
            <div className="flex gap-1">
              <div className="flex text-primary gap-2">
                I<p>4.5 Starts |</p>
              </div>
              <p className="text-secondary">450 Reviews</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-5">
            {infomationsHotel.map((item, index) => (
              <div key={index} className="flex gap-3">
                {item.icon}
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Ưu đãi có hoặc không đều được :v  */}
        <div
          className={`w-full bg-white rounded-xl p-5 flex flex-col gap-5 transition-all duration-500 ease-in-out ${
            toggleDisscount ? "max-h-[450px]" : "max-h-[68px]"
          } overflow-hidden`}
        >
          <div
            className="flex justify-between items-center cursor-pointer group"
            onClick={() => setToggleDisscount(!toggleDisscount)}
          >
            <Text
              className={`${
                toggleDisscount ? "text-secondary" : "text-primary"
              } text-[22px] group-hover:text-secondary`}
            >
              Ưu đãi có sẵn
            </Text>
            {toggleDisscount ? (
              <ArrowUpIcon size="20" />
            ) : (
              <ArrDownIcon size="20" />
            )}
          </div>
          <div className="flex flex-col gap-3">
            {offer.map((item, index) => (
              <DisscountItem key={index} obj={item} />
            ))}
          </div>
          <a
            className="w-full text-center underline text-[#3595FF] cursor-pointer text-sm
           hover:text-senconBlue transition-colors duration-100"
          >
            See all offer(+10 more)
          </a>
        </div>
        {/* Rooms Details */}
        <div className="p-5 w-full flex flex-col rounded-xl gap-5 bg-white">
          <Text
            className={
              "text-[22px] border-b-[1px] border-b-seconGray pb-4 bg-opacity-20"
            }
          >
            Các loại phòng
          </Text>
          <div className="grid grid-cols-6 gap-y-3">
            {roomType.map((room, index) => (
              <RoomItem obj={room} key={index} />
            ))}
          </div>
        </div>
        {/* service */}
        <div
          className={`w-full bg-white rounded-xl flex flex-col p-5 gap-5 transition-all duration-500 ease-in-out ${
            toggleService ? "max-h-[480px]" : "max-h-[68px]"
          } overflow-hidden`}
          onClick={() => setToggleService(!toggleService)}
        >
          <div className=" border-b-[1px] border-b-seconGray pb-4 bg-opacity-20 flex justify-between cursor-pointer group">
            <Text
              className={`text-[22px] ${
                toggleService ? "text-secondary" : "text-primary"
              } group-hover:text-secondary`}
            >
              Dịch vụ khách sạn
            </Text>
            {toggleService ? (
              <ArrowUpIcon size="20" />
            ) : (
              <ArrDownIcon size="20" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-4">
            {service.map((ser, index) => (
              <ServiceItem key={index} obj={ser} />
            ))}
          </div>
        </div>
        {/* Reviews */}
        <div className="flex flex-col gap-5">
          <div className="w-full bg-white px-8 py-9 rounded-xl">
            <Text
              className={
                "text-[22px] pb-4 border-b-[1px] border-seconGray border-opacity-30"
              }
            >
              Đánh giá
            </Text>
            <div className="w-full flex flex-col items-center pt-9">
              <p className="text-sm text-[#5F5F5F] font-medium">
                Đánh giá & Đánh giá tổng thể
              </p>
              <h3 className="text-[57px] text-secondary">5</h3>
              <div className="text-secondary">*****</div>
              <p className="text-[#5F5F5F] font-medium">
                Dựa trên 200 reviews.{" "}
                <a className="text-secondary underline cursor-pointer font-normal">
                  Đánh giá ngay
                </a>
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            <RaitingProfile profile={false} />
            <RaitingProfile profile={false} />
            <RaitingProfile profile={false} />
            <RaitingProfile profile={false} />
          </div>
        </div>
      </div>
      {/* right pane */}
      <div className="bg-slate-950 w-[30%] h-screen"></div>
    </div>
  );
}

export default HotelDetail;
