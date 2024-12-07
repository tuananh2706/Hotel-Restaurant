import { useNavigate, useParams } from "react-router-dom";
import Modal from "../../../../component/myModal";
import demo from "../../../../assets/img/bannerLogin.jpg";
import { useGlobalContext, useHotels } from "../../../../context";
import { useEffect, useState } from "react";
import LocationIcon from "../../../../assets/icons/locationIcon";
import RoomIcon from "../../../../assets/icons/roomsIcon";
import ServiceIcon from "../../../../assets/icons/serviceIcon";
import RaitingProfile from "../../../../component/cards/cardRaitingInProfile";
import {
  disableHotel,
  editInfoHotels,
} from "../../../../service/hotelsService";
import EditableField from "../../../../component/editableField";
import Title from "../../../../component/text/titleCategory";
import TrashIcon from "../../../../assets/icons/trashIcon";
import AddBtnIcon from "../../../../assets/icons/addIcon";

const categories = [
  { id: 1, name: "Khách sạn 1 sao" },
  { id: 2, name: "Khách sạn 2 sao" },
  { id: 3, name: "Khách sạn 3 sao" },
  { id: 4, name: "Khách sạn 4 sao" },
  { id: 5, name: "Khách sạn 5 sao" },
];

const localtions = [
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 3, label: "3" },
  { id: 4, label: "4" },
  { id: 5, label: "5" },
  { id: 6, label: "6" },
  { id: 7, label: "7" },
  { id: 8, label: "8" },
  { id: 9, label: "9" },
  { id: 10, label: "10" },
  { id: 11, label: "11" },
  { id: 12, label: "12" },
  { id: 13, label: "Gò Vấp" },
  { id: 14, label: "Bình Thạnh" },
  { id: 15, label: "Tân Phú" },
  { id: 16, label: "Tân Bình" },
];

function HotelsManagementDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchHotelById, hotelDetail, fetchHotels } = useHotels();
  const handleClose = () => {
    navigate(-1);
  };

  const [flag, setFlage] = useState(false);
  const { formatCurrency } = useGlobalContext();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openEditRoomModal, setOpenEditRoomModal] = useState(false);

  const [openDisable, setOpenDisable] = useState(false);

  const [editHotelInfo, setEditHotelInfo] = useState({});
  const [editRoomType, setEditRoomType] = useState([]);

  const [selectedRoomType, setSelectedRoomType] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const [openDeleteRoom, setOpenDeleteRoom] = useState(false);
  const [openDeleteRoomType, setOpenDeleteRoomType] = useState(false);

  const handleChangeValueHotelInfo = (fieldName, newValue) => {
    setEditHotelInfo((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  };
  const handleRoomTypeFieldSave = (roomTypeIndex, fieldName, value) => {
    const updatedRoomTypes = [...editRoomType];
    updatedRoomTypes[roomTypeIndex][fieldName] = value;
    setEditRoomType(updatedRoomTypes);
  };

  const handleRoomFieldSave = (roomTypeIndex, roomIndex, fieldName, value) => {
    const updatedRoomTypes = [...editRoomType];
    updatedRoomTypes[roomTypeIndex].rooms[roomIndex][fieldName] = value;
    setEditRoomType(updatedRoomTypes);
  };

  const deleteRoom = (roomTypeIndex, roomIndex) => {
    const updatedRoomTypes = [...editRoomType];
    updatedRoomTypes[roomTypeIndex].rooms.splice(roomIndex, 1);
    setEditRoomType(updatedRoomTypes);
    closeModalDeleteRoom();
  };

  const deleteRoomType = (roomTypeIndex) => {
    const updatedRoomTypes = [...editRoomType];
    updatedRoomTypes.splice(roomTypeIndex, 1);
    setEditRoomType(updatedRoomTypes);
    closeModalDeleteRoomType();
  };

  const openModalDeleteRoom = (roomTypeIndex, roomIndex) => {
    setOpenDeleteRoom(true);
    setSelectedRoom({
      roomTypeIndex: roomTypeIndex,
      roomIndex: roomIndex,
    });
  };
  const openModalDeleteRoomType = (roomTypeIndex) => {
    setOpenDeleteRoomType(true);
    setSelectedRoomType(roomTypeIndex);
  };
  const closeModalDeleteRoom = () => {
    setOpenDeleteRoom(false);
    setSelectedRoom(null);
  };
  const closeModalDeleteRoomType = () => {
    setOpenDeleteRoomType(false);
    setSelectedRoomType(null);
  };

  const addNewRoomType = () => {
    setEditRoomType([
      ...editRoomType,
      {
        roomTypeId: null,
        hotelId: hotelDetail?.roomTypes[0]?.hotelId || 0,
        typeName: "",
        rooms: [],
      },
    ]);
  };

  const addNewRoom = (roomTypeIndex) => {
    const updatedRoomTypes = [...editRoomType];
    updatedRoomTypes[roomTypeIndex].rooms.push({
      roomId: null,
      pricePerNight: "0",
      description: "",
      status: "available",
      maxOccupancy: "1",
      roomCount: "1",
      imageUrls: [],
    });
    setEditRoomType(updatedRoomTypes);
  };

  const handleSubmit = () => {
    // Format data according to API requirements
    const payload = editRoomType?.map((roomType) => ({
      ...roomType,
      rooms: editRoomType.rooms?.map((room) => ({
        ...room,
        pricePerNight: Number(room.pricePerNight),
        maxOccupancy: Number(room.maxOccupancy),
        roomCount: Number(room.roomCount),
      })),
    }));

    console.log("editRoomType", editRoomType);

    console.log("Payload for API:", payload);
    // Here you would make your API call
  };

  const handleSaveHotelInfo = async (e) => {
    e.preventDefault();
    console.log("Thông tin chỉnh sửa: ", editHotelInfo);
    console.log("Thông tin ban đầu: ", hotelDetail);
    try {
      await editInfoHotels(id, editHotelInfo);
      setOpenEditModal(false);
      setFlage(!flag);
      alert("Thành công!");
    } catch (error) {}
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
  }, [id, flag]);

  useEffect(() => {
    if (hotelDetail) {
      setEditHotelInfo({
        hotelName: hotelDetail.hotelName,
        address: hotelDetail.address,
        description: hotelDetail.description,
        categoryId: hotelDetail.categoryId,
        locationId: hotelDetail.locationId,
        isActive: hotelDetail.isActive,
      });
      if (hotelDetail?.roomTypes) {
        setEditRoomType(hotelDetail.roomTypes);
      } else {
        setEditRoomType([]);
      }
      console.log("editRoomType", editRoomType);
    }
  }, [hotelDetail]);

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
              {/* Chỉnh sửa thông tin */}
              <div className="w-full flex mt-5 pb-5 justify-end pr-10 border-b border-b-seconGray ">
                <button
                  onClick={() => setOpenEditModal(true)}
                  className="p-3 text-senconBlue opacity-80 transition-all duration-200 hover:opacity-100 hover:underline text-base scale-95"
                >
                  Chỉnh sửa thông tin khách sạn
                </button>
              </div>
              {/* roomType */}
              <div className="border border-seconGray min-h-[150px] flex flex-col gap-5 p-5 rounded-lg shadow">
                <h5 className="text-2xl text-secondary font-medium">
                  Các loại phòng khách sạn:{" "}
                </h5>
                <div className="grid grid-cols-2 gap-5 text-danger">
                  {hotelDetail.roomTypes?.map((roomType, index) => (
                    <p
                      key={index}
                    >{`${roomType.typeName} (${roomType?.rooms.length})`}</p>
                  ))}
                </div>
              </div>
              <div className="w-full flex pb-5 justify-end pr-10 border-b border-b-seconGray ">
                <button
                  onClick={() => setOpenEditRoomModal(true)}
                  className="p-3 text-senconBlue opacity-80 transition-all duration-200 hover:opacity-100 hover:underline text-base scale-95"
                >
                  Chỉnh sửa thông tin phòng và loại phòng
                </button>
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
                    hotelDetail.reviews?.map((review, index) => (
                      <RaitingProfile
                        key={index}
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
          </div>

          {/* Modal Edit Infomations Hotels */}
          <Modal
            isOpen={openEditModal}
            onClose={() => setOpenEditModal(false)}
            closeBtn={true}
            className={"w-auto max-h-[700px] overflow-y-auto"}
            title="Thay đổi thông tin khách sạn"
          >
            {editHotelInfo && (
              <div className="flex flex-col gap-5 w-[500px]">
                <EditableField
                  fieldName={"hotelName"}
                  fieldValue={editHotelInfo.hotelName}
                  label={"Tên khách sạn"}
                  onSave={handleChangeValueHotelInfo}
                />
                <EditableField
                  fieldName={"address"}
                  fieldValue={editHotelInfo.address}
                  label={"Địa chỉ"}
                  onSave={handleChangeValueHotelInfo}
                />
                <EditableField
                  fieldName={"description"}
                  fieldValue={editHotelInfo.description}
                  label={"Mô tả"}
                  onSave={handleChangeValueHotelInfo}
                />
                <div className="w-full flex justify-between px-10">
                  <select
                    className="focus:outline-none p-3 border border-seconGray text-secondary focus:border-secondary rounded-lg"
                    name="categoryId"
                    id="categoryId"
                    value={editHotelInfo.categoryId}
                    onChange={(e) =>
                      setEditHotelInfo((prev) => ({
                        ...prev,
                        [e.target.name]: +e.target.value,
                      }))
                    }
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <select
                    className="focus:outline-none p-3 border border-seconGray text-secondary focus:border-secondary rounded-lg"
                    name="locationId"
                    id="locationId"
                    value={editHotelInfo.locationId}
                    onChange={(e) =>
                      setEditHotelInfo((prev) => ({
                        ...prev,
                        [e.target.name]: +e.target.value,
                      }))
                    }
                  >
                    {localtions.map((localtion) => (
                      <option
                        key={localtion.id}
                        value={localtion.id}
                      >{`Quận ${localtion.label}`}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
            <div className="w-full flex justify-end mt-5 gap-5 pr-5">
              <button
                className="p-3 bg-secondary text-white font-medium rounded-md opacity-80 hover:opacity-100 transition-all duration-200 active:scale-95"
                onClick={handleSaveHotelInfo}
              >
                Lưu thông tin
              </button>
            </div>
          </Modal>

          {/* Modal Edit roomType and room */}
          <Modal
            isOpen={openEditRoomModal}
            onClose={() => setOpenEditRoomModal(false)}
            className={"w-auto max-h-[700px] relative overflow-y-auto "}
            closeBtn={true}
            title="Chỉnh sửa phòng và loại phòng"
          >
            {editRoomType && (
              <div className="w-[600px] flex flex-col gap-5 bg-seconGray bg-opacity-20 rounded-lg p-5">
                {/* Loại phòng và phòng */}
                {editRoomType.map((roomType, index) => (
                  <>
                    <div
                      key={index}
                      className="mb-3 border-b border-b-seconGray pb-3 flex flex-col gap-5
                        shadow hover:shadow-lg transition-all duration-200
                        border border-seconGray p-5 rounded-lg bg-white"
                    >
                      <div className="flex justify-between items-center">
                        <div className="max-w-[250px]">
                          <Title className="text-3xl">
                            {roomType.typeName}
                          </Title>
                        </div>
                        <button
                          className="p-1 bg-none hover:bg-seconGray hover:bg-opacity-50 rounded-full transition-all duration-200 active:scale-95"
                          onClick={() => openModalDeleteRoomType(index)}
                        >
                          <TrashIcon color="#c5270e" />
                        </button>
                      </div>
                      <div>
                        <div>
                          <EditableField
                            fieldName={"typeName"}
                            fieldValue={roomType.typeName}
                            label={"Tên loại phòng"}
                            onSave={(fieldName, value) =>
                              handleRoomTypeFieldSave(index, fieldName, value)
                            }
                          />
                        </div>
                      </div>
                      {/* Phòng */}

                      <h5 className="text-xl text-success font-medium">
                        Chỉnh sửa thông tin phòng
                      </h5>
                      <div>
                        <div className="flex flex-col gap-5">
                          {roomType?.rooms?.map((room, roomIndex) => (
                            <div
                              key={roomIndex}
                              className="border border-seconGray grid grid-cols-1 gap-5 relative p-5 shadow rounded-md"
                            >
                              <h5 className="text-seconGray text-2xl">
                                #{roomIndex + 1}
                              </h5>
                              <button
                                className="absolute top-4 right-3 transition-all duration-200 hover:bg-seconGray hover:bg-opacity-50 hover:shadow-sm p-1 rounded-full"
                                onClick={() =>
                                  openModalDeleteRoom(index, roomIndex)
                                }
                              >
                                <TrashIcon color="#c5270e" size="20" />
                              </button>
                              <EditableField
                                fieldName={"pricePerNight"}
                                fieldValue={room.pricePerNight}
                                label={"Giá qua đêm"}
                                onSave={(fieldName, value) =>
                                  handleRoomFieldSave(
                                    index,
                                    roomIndex,
                                    fieldName,
                                    value
                                  )
                                }
                              />
                              <EditableField
                                fieldName={"maxOccupancy"}
                                fieldValue={room.maxOccupancy}
                                label={"Số người: "}
                                onSave={(fieldName, value) =>
                                  handleRoomFieldSave(
                                    index,
                                    roomIndex,
                                    fieldName,
                                    value
                                  )
                                }
                              />
                              <EditableField
                                fieldName={"roomCount"}
                                fieldValue={room.roomCount}
                                label={"Số lượng phòng"}
                                onSave={(fieldName, value) =>
                                  handleRoomFieldSave(
                                    index,
                                    roomIndex,
                                    fieldName,
                                    value
                                  )
                                }
                              />
                              <EditableField
                                fieldName={"status"}
                                fieldValue={room.status}
                                label={"Trạng thái"}
                                onSave={(fieldName, value) =>
                                  handleRoomFieldSave(
                                    index,
                                    roomIndex,
                                    fieldName,
                                    value
                                  )
                                }
                              />
                              <EditableField
                                fieldName={"description"}
                                fieldValue={room.description}
                                label={"Mô tả"}
                                onSave={(fieldName, value) =>
                                  handleRoomFieldSave(
                                    index,
                                    roomIndex,
                                    fieldName,
                                    value
                                  )
                                }
                              />
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center mt-5 justify-center">
                          <button
                            className="opacity-70 hover:opacity-100 active:scale-95"
                            onClick={() => addNewRoom(index)}
                          >
                            <AddBtnIcon color="#007e47" size="32" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
                <div className="w-full flex bg-none rounded-lg">
                  <button
                    onClick={addNewRoomType}
                    className="text-senconBlue font-medium p-2 transition-all duration-200 active:scale-95 rounded-lg hover:bg-senconBlue hover:text-white"
                  >
                    Thêm loại phòng mới
                  </button>
                </div>
              </div>
            )}
            <div className="flex justify-end mt-5 gap-5">
              <button
                onClick={() => setOpenEditRoomModal(false)}
                className="px-5 py-3 bg-seconGray text-white font-medium rounded-lg opacity-70 hover:opacity-100 transition-all duration-200 active:scale-95"
              >
                Hủy
              </button>
              <button
                className="p-3 bg-secondary text-white font-medium rounded-lg opacity-70 hover:opacity-100 transition-all duration-200 active:scale-95"
                onClick={handleSubmit}
              >
                Lưu thay đổi
              </button>
            </div>
          </Modal>

          {/* Modal disable */}
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

          {/* Xác nhận xóa roomType */}
          <Modal
            className={"h-[180px] shadow flex flex-col justify-evenly"}
            isOpen={openDeleteRoomType}
            onClose={closeModalDeleteRoomType}
          >
            <h5 className="text-xl font-medium text-danger">
              Xác nhận xóa loại phòng này ?
            </h5>
            <div className="flex justify-end gap-5 mt-5">
              <button
                onClick={closeModalDeleteRoomType}
                className="p-3 bg-seconGray rounded-md opacity-80 text-white font-medium transition-all duration-200 hover:opacity-100 active:scale-95"
              >
                Hủy
              </button>
              <button
                onClick={() => deleteRoomType(selectedRoomType)}
                className="p-3 bg-danger rounded-md opacity-80 text-white font-medium transition-all duration-200 hover:opacity-100 active:scale-95"
              >
                Xác nhận
              </button>
            </div>
          </Modal>
          {/* Xác nhận xóa Room */}
          <Modal
            className={"h-[180px] shadow flex flex-col justify-evenly"}
            isOpen={openDeleteRoom}
            onClose={closeModalDeleteRoom}
          >
            <h5 className="text-xl font-medium text-danger">
              Xác nhận xóa phòng này ?
            </h5>
            <div className="flex justify-end gap-5 mt-5">
              <button
                onClick={closeModalDeleteRoom}
                className="p-3 bg-seconGray rounded-md opacity-80 text-white font-medium transition-all duration-200 hover:opacity-100 active:scale-95"
              >
                Hủy
              </button>
              <button
                onClick={() =>
                  deleteRoom(selectedRoom.roomTypeIndex, selectedRoom.roomIndex)
                }
                className="p-3 bg-danger rounded-md opacity-80 text-white font-medium transition-all duration-200 hover:opacity-100 active:scale-95"
              >
                Xác nhận
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
