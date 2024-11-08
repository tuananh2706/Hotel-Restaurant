import BuildingIcon from "../../assets/icons/building";
import LocationIcon from "../../assets/icons/locationIcon";
import Calendar from "../../assets/icons/time";
import Text from "../text/text";
import TextHiglight from "../text/textHiglight";

function BookingHotel({ obj }) {
  const {
    id,
    hotelName,
    address,
    checkin,
    checkout,
    typeRoom,
    status,
    hotelImg,
  } = obj || {};

  let readStatus;
  switch (status) {
    case 0:
      readStatus = (
        <Text className="uppercase text-base font-medium">Xác nhận</Text>
      );
      break;
    case 1:
      readStatus = (
        <p className="uppercase text-base font-medium text-danger">Kết thúc</p>
      );
      break;
    case 2:
      readStatus = (
        <p className="uppercase text-base font-medium text-seconGray">Đã hủy</p>
      );
      break;
    default:
      readStatus = (
        <p className="uppercase text-base font-medium text-warning">
          Không xác định
        </p>
      );
  }

  return (
    <div className="p-4 w-full h-auto bg-white rounded-[10px] shadow-sm flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
      <img
        src={hotelImg}
        className="w-full sm:w-[92px] h-[92px] rounded-xl object-cover"
        alt="Hotel"
      />
      <div className="w-full flex flex-col gap-3">
        <div className="flex flex-col gap-2 md:gap-0 md:flex-row  md:justify-between md:items-center flex-wrap">
          <div className="flex items-center gap-2">
            <BuildingIcon size="20" />
            <Text className="text-base font-medium">{hotelName}</Text>
          </div>
          <div className="flex items-center gap-2">
            {readStatus}
            <p className="text-xs sm:text-sm font-medium text-gray-500">ID {id}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LocationIcon size="20" />
          <Text className="text-sm sm:text-base font-medium">{address}</Text>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
          <div className="flex items-center gap-2">
            <Calendar size="20" />
            <Text className="text-sm sm:text-base font-medium">
              <TextHiglight>Checkin:</TextHiglight> {checkin}{" "}
              <TextHiglight>Checkout:</TextHiglight> {checkout} / {typeRoom}
            </Text>
          </div>
          <button className="text-senconBlue text-sm sm:text-base cursor-pointer hover:opacity-80 transition-all duration-100 active:translate-y-[2px]">
            Kiểm tra chi tiết
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingHotel;
