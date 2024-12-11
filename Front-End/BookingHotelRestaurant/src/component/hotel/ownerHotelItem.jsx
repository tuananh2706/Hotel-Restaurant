import { useNavigate } from "react-router-dom";
import demo from "../../assets/img/banner.png";

function OwnerHotelItem({ obj }) {
  const { hotelId, hotelName, imageUrl, roomAmount, serviceAmount, isActive } =
    obj;

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ownerManagement/hotels/${hotelId}`);
  };
  return (
    <div
      onClick={handleClick}
      className="w-[250px] h-[300px] cursor-pointer rounded-xl bg-white shadow p-2 relative group overflow-hidden"
    >
      <div className="w-full h-full">
        <img
          src={(imageUrl && imageUrl) || demo}
          className="w-full h-full object-cover rounded-xl group-hover:opacity-70 transition-all duration-200 ease-in-out"
        />
      </div>
      <div
        className="absolute w-full h-[50%] bg-black bottom-[-30px] opacity-0 right-0 rounded-b-xl 
        bg-opacity-30 group-hover:opacity-100 group-hover:bottom-0 transition-all duration-200 ease-in-out p-3"
      >
        <div className="w-full h-full bg-secondary bg-opacity-70 rounded-xl text-sm text-center text-white p-2">
          <p className="uppercase text-base font-medium">
            {(hotelName && hotelName) || "Null"}
          </p>
          <p>
            Số lượng phòng:{" "}
            <span className="font-medium">{roomAmount} phòng</span>
          </p>
          <p>
            Số lượng dịch vụ:{" "}
            <span className="font-medium">{serviceAmount} loại dịch vụ</span>
          </p>
          <p>
            Trạng thái:{" "}
            <span
              className={`${
                (isActive && "text-white") || "text-danger"
              } font-medium`}
            >
              {(isActive && "Đang hoạt động") || "Tạm dừng / chờ xét duyệt"}
            </span>{" "}
          </p>
        </div>
      </div>
      {!isActive && (
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      )}
    </div>
  );
}

export default OwnerHotelItem;
