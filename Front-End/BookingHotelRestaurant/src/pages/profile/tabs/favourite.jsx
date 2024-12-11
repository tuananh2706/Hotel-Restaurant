import { useEffect, useState } from "react";
import HotelPreview from "../../../component/hotel/hotelPreview";
import Input from "../../../component/inputSearch";
import Title from "../../../component/text/titleCategory";
import { useAuth } from "../../../context/authContext";

function Favourite() {
  const { favoriteHotelsUser } = useAuth();

  return (
    <div className="flex flex-col gap-6 p-2 lg:p-0 ">
      <div className="flex flex-col md:flex-row gap-5 md:gap-0 justify-between items-center">
        <Title className={"text-[28px] font-medium"}>Khách Sạn Yêu Thích</Title>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {favoriteHotelsUser &&
          favoriteHotelsUser.map((item) => {
            return (
              <HotelPreview
                key={item.favoriteHotelId}
                hotelId={item.hotel?.hotelId}
                title={item.hotel?.hotelName}
                thumbnail={item.hotel?.imageUrls[0]}
                localtion={`Quận ${item.hotel?.locationName}`}
                category={`${item.hotel?.categoryName}`}
                service={item.hotel?.service}
              />
            );
          })}
      </div>
    </div>
  );
}

export default Favourite;
