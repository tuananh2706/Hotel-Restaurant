import LocationIcon from "../../assets/icons/locationIcon";
import ServiceIcon from "../../assets/icons/service";
import Hotel5Star from "../../assets/icons/hotel/hotel5Star";
import Hotel4Star from "../../assets/icons/hotel/hotel4Star";
import Hotel3Star from "../../assets/icons/hotel/hotel3Star";
import Hotel2Star from "../../assets/icons/hotel/hotel2Star";
import Hotel1Star from "../../assets/icons/hotel/hotel1Star";
import Modal from "../myModal";
import { useState } from "react";
import { useGlobalContext } from "../../context";
import UnFavoriteIcons from "../../assets/icons/unFavoriteIcons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function HotelPreview({
  title,
  hotelId,
  localtion,
  thumbnail,
  category,
  service = [],
}) {
  const [selectedHotels, setSelectedHotels] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { toggleFavoriteUser } = useAuth();

  const { formatCurrency } = useGlobalContext();

  const handleOpenModal = (selected) => {
    setSelectedHotels(selected);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedHotels([]);
    setOpenModal(false);
  };

  const handleUnFavorite = async () => {
    await toggleFavoriteUser(hotelId);
  };
  let icons;
  switch (category) {
    case "1":
      icons = <Hotel1Star size="16" />;
      break;
    case "2":
      icons = <Hotel2Star size="16" />;
      break;
    case "3":
      icons = <Hotel3Star size="16" />;
      break;
    case "4":
      icons = <Hotel4Star size="16" />;
      break;
    case "5":
      icons = <Hotel5Star size="16" />;
      break;
  }

  return (
    <div className="w-full lg:w-[528px] max-h-[112px] p-4 bg-white rounded-xl shadow-sm flex gap-6">
      <img
        src={thumbnail}
        className="w-[80px] h-[80] rounded-xl object-cover"
      />
      <div className="w-full flex gap-6 flex-col">
        <div className="flex justify-between">
          <h5
            onClick={() => navigate(`/hotels/${hotelId}`)}
            className="text-[22px] text-primary font-medium cursor-pointer hover:text-danger transition-all duration-200 active:scale-95"
          >
            {title}
          </h5>
          <button
            onClick={() => handleUnFavorite()}
            className="text-danger font-medium text-sm hover:opacity-80
           active:translate-y-[2px] transition-all duration-100 p-1 hover:bg-seconGray hover:bg-opacity-20 rounded-full active:scale-95"
          >
            <UnFavoriteIcons size="20" />
          </button>
        </div>
        <div className="flex text-xs justify-between lg:text-base lg:gap-8 text-primary">
          <div className="flex gap-2 items-center">
            <LocationIcon size="16" color="#004225" />
            <span>{localtion}</span>
          </div>
          <a
            onClick={() => handleOpenModal(service)}
            className="flex gap-2 items-center cursor-pointer hover:opacity-80 
          active:translate-y-[2px] transition-all duration-100 "
          >
            <ServiceIcon size="16" />
            <span>Xem dịch vụ</span>
          </a>
          <div className="flex gap-2 items-center">
            {icons}
            <span>{category}</span>
          </div>
        </div>
      </div>
      <Modal
        isOpen={openModal}
        onClose={handleCloseModal}
        closeBtn={true}
        title="Thông tin dịch vụ khách sạn"
        className={"w-1/3 max-h-[700px] overflow-y-auto"}
      >
        <div className="flex flex-col gap-5 bg-seconGray bg-opacity-20 p-5 rounded-md">
          {selectedHotels &&
            selectedHotels.map((item) => (
              <div
                key={item.serviceId}
                className="w-full flex flex-col gap-2 border p-5 rounded-md shadow bg-white"
              >
                <div>
                  <p className="text-xl text-secondary font-medium">
                    {item.serviceName ? item.serviceName : "-"}
                  </p>
                  <p className="text-sm text-danger">
                    (
                    {item.servicePrice
                      ? `+${formatCurrency(+item.servicePrice)}`
                      : "Miễn phí"}
                    )
                  </p>
                </div>
                <p>
                  Loại dịch vụ:{" "}
                  <span className="text-secondary">
                    {item.serviceType ? item.serviceType : "-"}
                  </span>
                </p>
                <p>
                  Mô tả:{" "}
                  <span className="text-secondary">
                    {item.description ? item.description : "-"}
                  </span>
                </p>
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
}

export default HotelPreview;
