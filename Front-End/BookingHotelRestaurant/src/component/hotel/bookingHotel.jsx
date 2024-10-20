import BuildingIcon from "../../assets/icons/building";
import LocationIcon from "../../assets/icons/locationIcon";
import Calendar from "../../assets/icons/time";
import Demo from "../../assets/img/banner.png";
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
        <Text className={"uppercase text-base font-medium"}>Xác nhận</Text>
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
      // Giá trị mặc định nếu status không hợp lệ
      readStatus = (
        <p className="uppercase text-base font-medium text-warning">
          Không xác định
        </p>
      );
  }

  return (
    <div className="p-4 w-full h-[124px] bg-white rounded-[10px] shadow-sm flex items-center gap-6">
      <img
        src={hotelImg}
        className="w-[92px] h-[92px] rounded-xl object-cover"
      />
      <div className="w-full flex flex-col gap-[14px]">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <BuildingIcon size="20" />
            <Text className={"text-base font-medium"}>{hotelName}</Text>
          </div>
          <div className="flex gap-2">
            {/* {status ? <Text className={"uppercase text-base font-medium"}>Xác nhận</Text> : <p>Kết thúc</p>} */}
            {readStatus}
            <p>ID {id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <LocationIcon size="20" />
          <Text className={"text-base font-medium"}>
            {address}
          </Text>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Calendar size="20" />
            <Text className={"text-base font-medium"}>
              <TextHiglight>Checkin:</TextHiglight> {checkin}{" "}
              <TextHiglight>Checkout:</TextHiglight> {checkout} / {typeRoom}
            </Text>
          </div>
          <div>
            <button className="text-senconBlue cursor-pointer hover:opacity-80 transition-all duration-100 active:translate-y-[2px]">
              Kiểm tra chi tiết
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingHotel;
