import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../../../component/myModal";
import demo from "../../../../assets/img/bannerLogin.jpg";
import { useGlobalContext, useHotels } from "../../../../context";
import { useEffect, useState } from "react";
import LocationIcon from "../../../../assets/icons/locationIcon";
import RoomIcon from "../../../../assets/icons/roomsIcon";
import ServiceIcon from "../../../../assets/icons/serviceIcon";
import RaitingProfile from "../../../../component/cards/cardRaitingInProfile";
import { disableHotel } from "../../../../service/hotelsService";

function HotelsManagementDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchHotelById, hotelDetail, fetchHotels } = useHotels();
  const handleClose = () => {
    navigate(-1);
  };

  const { formatCurrency } = useGlobalContext();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDisable, setOpenDisable] = useState(false);

  const [hotelInfo, setHotelInfo] = useState({
    hotelName: hotelDetail?.hotelName,
    address: hotelDetail?.address,
    description: hotelDetail?.description,
  });
  const [roomTypes, setRoomTypes] = useState(hotelDetail?.roomTypes);
  const [services, setServices] = useState(hotelDetail?.services);

  const handleSaveHotelInfo = async () => {
    alert("Hotel info saved!");
    // Call API to save hotel info here
  };

  // Handle adding room type
  const handleAddRoom = (roomTypeId) => {
    const newRoom = {
      roomId: Date.now(),
      pricePerNight: 0,
      description: "",
      imageUrls: [],
    };
    const updatedRoomTypes = roomTypes.map((roomType) =>
      roomType.roomTypeId === roomTypeId
        ? { ...roomType, rooms: [...roomType.rooms, newRoom] }
        : roomType
    );
    setRoomTypes(updatedRoomTypes);
  };

  // Handle saving room data
  const handleSaveRoom = (roomTypeId, roomId, updatedRoom) => {
    const updatedRoomTypes = roomTypes.map((roomType) =>
      roomType.roomTypeId === roomTypeId
        ? {
            ...roomType,
            rooms: roomType.rooms.map((room) =>
              room.roomId === roomId ? updatedRoom : room
            ),
          }
        : roomType
    );
    setRoomTypes(updatedRoomTypes);
  };

  // Handle editing service
  const handleSaveService = (updatedService) => {
    const updatedServices = services.map((service) =>
      service.serviceId === updatedService.serviceId ? updatedService : service
    );
    setServices(updatedServices);
  };

  const handleDeactivateHotel = async () => {
    try {
      const response = await disableHotel(id);
      setOpenDisable(false);
      handleClose();
      await fetchHotels();
    } catch (error) {
      console.error("Đã có lỗi xảy ra: ", error.message);
    }
  };

  const fetchData = async () => {
    await fetchHotelById(id);
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const arrImgs = [demo, demo, demo, demo];
  return (
    <Modal
      isOpen={true}
      onClose={handleClose}
      className={"w-3/4 h-screen relative"}
      closeBtn={true}
    >
      {(hotelDetail && (
        <>
          <div className="flex w-full h-full">
            {/* img */}
            <div className="w-2/3 basis-[75%] flex flex-col items-center justify-center px-3 py-4">
              <div className=" w-full h-full border border-seconGray rounded-lg px-5 flex items-center justify-center mb-4">
                <img
                  src={demo}
                  className="object-cover shadow-md w-full h-[300px]"
                  alt="Main Product"
                />
              </div>

              <div className="w-full basis-[25%] flex items-center">
                <div className="w-full p-2 borde rounded-lg flex gap-3 overflow-x-auto">
                  {arrImgs.map((imgUrl, idx) => (
                    <img
                      key={idx}
                      src={imgUrl}
                      alt={`Product Thumbnail ${idx + 1}`}
                      className="w-[15%] h-full object-cover cursor-pointer border rounded-lg hover:shadow-md hover:-translate-y-0.5 transition-all duration-100"
                      onClick={() => setImgMain(imgUrl)}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* content */}
            <div
              className="w-full px-3 py-4 flex flex-col gap-5 overflow-y-auto "
              style={{ height: "calc(100% - 32px)" }}
            >
              <h5 className="text-5xl text-primary font-medium">
                {hotelDetail.hotelName}
              </h5>
              {/* infomation */}
              <div className="w-full grid grid-cols-2 gap-5">
                <div className="flex items-center gap-2 text-secondary">
                  <LocationIcon size="20" />
                  <p>{hotelDetail.address}</p>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <RoomIcon size="20" />
                  <p>Khách sạn có {hotelDetail.roomTypes?.length} loại phòng</p>
                </div>
                <div className="flex items-center gap-2 text-secondary overflow-hidden whitespace-nowrap text-ellipsis">
                  <p>Mô tả:</p>
                  <p> {hotelDetail.description}</p>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <ServiceIcon color="#007e47" size="20" />
                  {hotelDetail.services?.length ? (
                    <p>Khách sạn có {hotelDetail.services?.length} dịch vụ </p>
                  ) : (
                    <p>Khách sạn không có dịch vụ</p>
                  )}
                </div>
              </div>
              {/* roomType */}
              <div className="border border-seconGray min-h-[150px] flex flex-col gap-5 p-5 rounded-lg shadow">
                <h5 className="text-2xl text-secondary font-medium">
                  Các loại phòng khách sạn:{" "}
                </h5>
                <div className="grid grid-cols-2 gap-5 text-danger">
                  {hotelDetail.roomTypes?.map((roomType) => (
                    <p
                      key={roomType.roomTypeId}
                    >{`${roomType.typeName} (${roomType?.rooms.length})`}</p>
                  ))}
                </div>
              </div>
              {/* Service */}
              <div className="border border-seconGray min-h-[150px] flex flex-col gap-5 p-5 rounded-lg shadow">
                <h5 className="text-2xl text-secondary font-medium">
                  Các loại dịch vụ của khách sạn
                </h5>
                <div className="grid grid-cols-2 gap-5 text-danger">
                  {hotelDetail.services?.length > 0 ? (
                    hotelDetail.services?.map((service) => (
                      <p key={service.serviceId}>{`${
                        service.serviceName
                      } (+${formatCurrency(+service.servicePrice)})`}</p>
                    ))
                  ) : (
                    <p> Khách sạn không có dịch vụ </p>
                  )}
                </div>
              </div>
              {/* Reviews */}
              <div className="flex flex-col gap-5 p-5 rounded-lg shadow">
                <h5 className="text-2xl text-secondary font-medium">
                  Đánh giá của khách sạn.
                </h5>
                <div className="grid grid-cols-2 gap-5 text-danger">
                  {hotelDetail.reviews?.length > 0 ? (
                    hotelDetail.reviews?.map((review) => (
                      <RaitingProfile
                        obj={review}
                        profile
                        className="border border-seconGray"
                        fetchData={fetchData}
                      />
                    ))
                  ) : (
                    <p> Khách sạn chưa có đánh giá.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Action */}
          <div className="absolute bottom-2 right-10 flex gap-5">
            <button
              onClick={() => setOpenDisable(true)}
              className="px-5 py-2 rounded-lg border bg-seconGray opacity-50 text-black
            transition-all duration-200 ease-in-out active:scale-95
             hover:shadow hover:opacity-100 hover:text-secondary font-medium "
            >
              Vô hiệu hóa KS
            </button>
            <button
              onClick={() => setOpenEditModal(true)}
              className="px-5 py-2 rounded-lg border bg-secondary  transition-all duration-200 ease-in-out
             opacity-70 hover:opacity-100 text-white font-medium active:scale-95"
            >
              Sửa thông tin
            </button>
          </div>

          {/* Modal Edit Hotels */}
          <Modal
            isOpen={openEditModal}
            onClose={() => setOpenEditModal(false)}
            closeBtn={true}
            className={"w-3/4 max-h-[700px] overflow-y-auto"}
            title="Thay đổi thông tin khách sạn"
          >
            {/* Hotel Info Section */}
            <div className="mb-6">
              <h3 className="text-xl text-primary font-medium mb-2">
                Hotel Information
              </h3>
              <div className="mb-4">
                <label className="block text-secondary text-sm font-medium mb-1">
                  Hotel Name
                </label>
                <input
                  type="text"
                  value={hotelInfo.hotelName}
                  onChange={(e) =>
                    setHotelInfo({ ...hotelInfo, hotelName: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 text-secondary rounded-md focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
              <div className="mb-4">
                <label className="block text-secondary text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={hotelInfo.address}
                  onChange={(e) =>
                    setHotelInfo({ ...hotelInfo, address: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 text-secondary rounded-md focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
              <div className="mb-4">
                <label className="block text-secondary text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  value={hotelInfo.description}
                  onChange={(e) =>
                    setHotelInfo({ ...hotelInfo, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 text-secondary rounded-md focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
              <button
                onClick={handleSaveHotelInfo}
                className="bg-secondary font-medium opacity-80 hover:opacity-100 transition-all duration-200 text-white px-4 py-2 rounded-md "
              >
                Xác nhận thay đổi thông tin
              </button>
            </div>

            {/* Room Types Section */}
            <div className="mb-6">
              <h3 className="text-xl text-primary font-medium mb-2">
                Room Types
              </h3>
              {roomTypes &&
                roomTypes.map((roomType) => (
                  <div key={roomType.roomTypeId} className="mb-4">
                    <h4 className="text-md font-medium text-secondary">
                      {roomType.typeName}
                    </h4>
                    {roomType.rooms?.map((room) => (
                      <div
                        key={room.roomId}
                        className="border-t border-gray-300 py-2"
                      >
                        <p>Giá phòng: </p>
                        <input
                          type="number"
                          value={room.pricePerNight}
                          onChange={(e) => {
                            const updatedRoom = {
                              ...room,
                              pricePerNight: parseFloat(e.target.value),
                            };
                            handleSaveRoom(
                              roomType.roomTypeId,
                              room.roomId,
                              updatedRoom
                            );
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                        />
                        <p>Mô tả:</p>
                        <textarea
                          value={room.description}
                          onChange={(e) => {
                            const updatedRoom = {
                              ...room,
                              description: e.target.value,
                            };
                            handleSaveRoom(
                              roomType.roomTypeId,
                              room.roomId,
                              updatedRoom
                            );
                          }}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                        />
                        <button
                          onClick={() =>
                            handleSaveRoom(
                              roomType.roomTypeId,
                              room.roomId,
                              room
                            )
                          }
                          className="bg-success font-medium opacity-80 hover:opacity-100 transition-all duration-200 text-white px-4 py-2 rounded-md "
                        >
                          Lưu thông tin
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddRoom(roomType.roomTypeId)}
                      className="bg-warning font-medium text-white px-4 py-2 rounded-md opacity-80 hover:opacity-100 transition-all duration-200 mt-2"
                    >
                      Thêm phòng
                    </button>
                  </div>
                ))}
            </div>

            {/* Services Section */}
            <div>
              <h3 className="text-lg font-medium mb-2">Services</h3>
              {services &&
                services.map((service) => (
                  <div
                    key={service.serviceId}
                    className="border-t border-gray-300 py-2"
                  >
                    <p>Service Name:</p>
                    <input
                      type="text"
                      value={service.serviceName}
                      onChange={(e) =>
                        handleSaveService({
                          ...service,
                          serviceName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                    />
                    <p>Service Price:</p>
                    <input
                      type="number"
                      value={service.servicePrice}
                      onChange={(e) =>
                        handleSaveService({
                          ...service,
                          servicePrice: parseFloat(e.target.value),
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                    />
                    <p>Description:</p>
                    <textarea
                      value={service.description}
                      onChange={(e) =>
                        handleSaveService({
                          ...service,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
                    />
                    <button
                      onClick={() => handleSaveService(service)}
                      className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                    >
                      Save Service
                    </button>
                  </div>
                ))}
              <button
                onClick={() => {
                  const newService = {
                    serviceId: Date.now(),
                    serviceName: "",
                    servicePrice: 0,
                    description: "",
                  };
                  setServices([...services, newService]);
                }}
                className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 mt-2"
              >
                Add Service
              </button>
            </div>
          </Modal>
          <Modal
            isOpen={openDisable}
            className={"min-w-[500px]"}
            onClose={() => setOpenDisable(false)}
          >
            <div className="text-xl text-secondary font-medium my-5">
              Bạn muốn vô hiệu hóa khách sạn này ?
            </div>
            <div className="flex justify-end gap-5">
              <button
                onClick={() => {
                  handleDeactivateHotel();
                }}
                className="px-3 py-2 border rounded-md bg-danger opacity-80 
              transition-all duration-200 active:scale-95 hover:opacity-100 text-white font-medium"
              >
                Xác nhận
              </button>
              <button
                onClick={() => setOpenDisable(false)}
                className="px-3 py-2 border rounded-md bg-seconGray opacity-80 
              transition-all duration-200 active:scale-95 hover:opacity-100 text-black font-medium"
              >
                Hủy
              </button>
            </div>
          </Modal>
        </>
      )) ||
        "Không có dữ liệu"}
    </Modal>
  );
}

export default HotelsManagementDetail;
