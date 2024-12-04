import LocationIcon from "../../assets/icons/locationIcon";
import Text from "../text/text";
import demoImg from "../../assets/img/banner.png";
import { useGlobalContext } from "../../context";
import { useEffect } from "react";

function HotelItem({ obj }) {
  const {
    hotelName,
    address,
    imageUrls,
    description,
    review,
    view,
    roomTypes,
  } = obj || {};

  const { formatCurrency } = useGlobalContext();

  return (
    <div
      className="p-4 w-full h-auto border bg-white rounded-[10px] 
    shadow-sm flex flex-col sm:flex-row items-center gap-2 md:gap-6
    transition-all duration-200 hover:shadow-lg cursor-pointer active:shadow-none"
    >
      <img
        src={demoImg}
        className="w-full h-auto md:w-[250px] md:h-[189px] rounded-xl object-cover"
        alt="Hotel"
      />
      <div className="flex flex-col w-full gap-3 md:justify-between h-full py-2">
        {/* Div Của tên và review KS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-1 md:gap-0">
          <Text className={"text-[22px]"}>{hotelName}</Text>
          <div className="flex gap-1 text-sm">
            <div className="flex items-center gap-2 text-sm md:text-base text-primary">
              I <p>5 Starts || </p>
            </div>
            <p className="text-secondary text-sm md:text-base">50 Reviews </p>
          </div>
        </div>
        {/* div của địa chỉ và xem dịch vụ  */}
        <div className="flex flex-col text-sm md:text-base md:flex-row gap-2 md:gap-5 ">
          <div className="flex items-center w-[300px] overflow-hidden whitespace-nowrap overflow-ellipsis gap-1 text-secondary">
            <LocationIcon size="16" />
            <span>{address}</span>
          </div>
          <div className="flex items-center gap-1 text-secondary">
            <LocationIcon size="16" />
            <span>Xem phòng</span>
          </div>
          <div className="flex items-center gap-1 text-secondary">
            <LocationIcon size="16" />
            <span>Xem Dịch vụ</span>
          </div>
        </div>
        {/* Div của des */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <div className="text-sm md:text-base font-normal line-clamp-3 md:line-clamp-2 overflow-hidden text-left text-gray-500">
              {description}
            </div>
          </div>
        </div>
        {/* Div của price */}
        <div className="flex flex-col md:flex-row gap-1 md:gap-5 text-sm md:text-base">
          {roomTypes &&
            roomTypes.map((roomType) => (
              <p key={roomType.roomTypeId} className="text-primary">
                {roomType.typeName}:{" "}
                <span className="text-danger">
                  {formatCurrency(roomType?.rooms[0]?.pricePerNight)}/1đêm
                </span>
              </p>
            ))}

          {/* <p className="text-primary">
            Giá phòng đơn: <span className="text-danger">500$/1đêm</span>
          </p>
          <p className="text-primary">
            Giá phòng đơn: <span className="text-danger">500$/1đêm</span>
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default HotelItem;
