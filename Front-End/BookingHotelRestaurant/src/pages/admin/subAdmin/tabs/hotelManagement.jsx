import { Outlet, useNavigate } from "react-router-dom";
import AddBtnIcon from "../../../../assets/icons/addIcon";
import OwnerHotelItem from "../../../../component/hotel/ownerHotelItem";
import Title from "../../../../component/text/titleCategory";
import { useAuth } from "../../../../context/authContext";

function OwnerHotelManagement() {
  const { ownedHotelsUser } = useAuth();
  const navigate = useNavigate();
  return (
    <>
      {/* Title */}
      <div className="max-w-[250px] border-b border-b-seconGray border-opacity-20 pb-5">
        <Title className={"text-3xl"}>Quản lý khách sạn</Title>
      </div>
      {/* Item */}
      <div className="mt-5 grid grid-cols-4">
        {/* Tạo mới khách sạn */}
        <div
          onClick={() => navigate("/ownerManagement/hotels/create-hotel")}
          className="w-[250px] h-[300px] rounded-xl border-dashed border-2 border-seconGray
        opacity-50 cursor-pointer transition-all duration-200 hover:opacity-100 active:scale-95 flex items-center justify-center"
        >
          <AddBtnIcon color="#c5c5c5" size="80" />
        </div>
        {/* Các item khách sạn */}
        {(ownedHotelsUser &&
          ownedHotelsUser.map((item) => (
            <OwnerHotelItem key={item.hotelId} obj={item} />
          ))) ||
          "Bạn chưa có khách sạn. Hãy tạo mới khách sạn của mình"}
      </div>
      <Outlet />
    </>
  );
}

export default OwnerHotelManagement;
