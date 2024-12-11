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
  deleteImageServiceAsync,
  deleteRoomAsync,
  deleteRoomTypeAsync,
  deleteServiceAsync,
  disableHotel,
  editInfoHotels,
  editInfoServicesAsync,
  editRoomTypes,
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

const arrImgs = [demo, demo, demo, demo];

function HotelsManagementDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchHotelById, hotelDetail, fetchHotels } = useHotels();
  const handleClose = () => {
    navigate(-1);
  };

  const [flag, setFlag] = useState(false);
  const { formatCurrency } = useGlobalContext();
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openEditRoomModal, setOpenEditRoomModal] = useState(false);
  const [openEditService, setOpenEditService] = useState(false);

  const [openDisable, setOpenDisable] = useState(false);

  const [editHotelInfo, setEditHotelInfo] = useState({});
  const [editRoomType, setEditRoomType] = useState([]);
  const [editService, setEditService] = useState([]);

  const [selectedRoomType, setSelectedRoomType] = useState();
  const [selectedRoom, setSelectedRoom] = useState();
  const [openDeleteRoom, setOpenDeleteRoom] = useState(false);
  const [openDeleteRoomType, setOpenDeleteRoomType] = useState(false);

  const [selectedService, setSelectedService] = useState();
  const [selectedImgService, setSelectedImgService] = useState();
  const [openDeleteService, setOpenDeleteService] = useState(false);
  const [openDeleteImgService, setOpenDeleteImgService] = useState(false);

  // Hàm của infoHotel
  const handleChangeValueHotelInfo = (fieldName, newValue) => {
    setEditHotelInfo((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  };

  const handleSaveHotelInfo = async (e) => {
    e.preventDefault();
    console.log("Thông tin chỉnh sửa: ", editHotelInfo);
    console.log("Thông tin ban đầu: ", hotelDetail);
    try {
      await editInfoHotels(id, editHotelInfo);
      setOpenEditModal(false);
      setFlag(!flag);
      alert("Thành công!");
    } catch (error) {}
  };
  // Hàm của RoomType và Room
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

  const handleSaveRoomTypesRoom = async (e) => {
    try {
      e.preventDefault();
      const payload = editRoomType?.map((roomType) => ({
        ...roomType,
        hotelId: +id,
        rooms: roomType.rooms?.map((room) => ({
          ...room,
          pricePerNight: Number(room.pricePerNight),
          maxOccupancy: Number(room.maxOccupancy),
          roomCount: Number(room.roomCount),
        })),
      }));

      const response = await editRoomTypes(payload);
      alert(response);
      setOpenEditRoomModal(false);
      setFlag(!flag);
    } catch (error) {
      console.error("Đã có lỗi xảy ra");
    }
  };

  //Xóa thuộc tính phòng
  const deleteRoom = async (roomTypeIndex, roomIndex, id) => {
    try {
      if (id) {
        const response = await deleteRoomAsync(id);
        alert(response);
        setFlag(!flag);
      }
      const updatedRoomTypes = [...editRoomType];
      updatedRoomTypes[roomTypeIndex].rooms.splice(roomIndex, 1);
      setEditRoomType(updatedRoomTypes);
      closeModalDeleteRoom();
    } catch (error) {
      console.error("Đã có lỗi xảy ra");
    }
  };

  const deleteRoomType = async (roomTypeIndex, id) => {
    try {
      if (id) {
        const response = await deleteRoomTypeAsync(id);
        alert(response);
        setFlag(!flag);
      }
      const updatedRoomTypes = [...editRoomType];
      updatedRoomTypes.splice(roomTypeIndex, 1);
      setEditRoomType(updatedRoomTypes);
      closeModalDeleteRoomType();
    } catch (error) {
      console.error("Đã có lỗi xảy ra");
    }
  };

  //Chỉnh sửa thông tin service
  const handleChangeValueService = (fieldName, fieldValue, index) => {
    const updatedService = [...editService];
    updatedService[index][fieldName] = fieldValue;
    setEditService(updatedService);
  };

  const handleChangeValueImgService = (
    index,
    serviceIndex,
    fieldName,
    fieldValue
  ) => {
    // editService[serviceIndex].imageUrls[index] = fieldValue;
    const updatedService = [...editService];
    updatedService[serviceIndex].imageUrls[index][fieldName] = fieldValue;
    setEditService(updatedService);
  };

  const addNewService = () => {
    setEditService([
      ...editService,
      {
        serviceId: null,
        serviceName: "",
        servicePrice: "0",
        description: "",
        serviceType: "",
      },
    ]);
  };

  const addNewImg = (index) => {
    // Kiểm tra xem editService[index] có hợp lệ không
    const updatedService = [...editService];

    // Nếu imageUrls chưa tồn tại, khởi tạo nó thành một mảng rỗng
    if (!updatedService[index].imageUrls) {
      updatedService[index].imageUrls = [];
    }

    // Thêm phần tử vào imageUrls
    updatedService[index].imageUrls.push({
      imageId: null,
      imageUrl: "",
    });

    // Cập nhật lại state
    setEditRoomType(updatedService);
  };

  const handleDeteleService = async (serviceIndex, id) => {
    try {
      if (id) {
        await deleteServiceAsync(id);
        alert("Thành công");
        setFlag(!flag);
      }
      const updatedService = [...editService];
      updatedService.splice(serviceIndex, 1);
      setEditService(updatedService);
      closeModalDeteleService();
    } catch (error) {
      console.error("Đã có lỗi xảy ra");
    }
  };

  const handleDeleteServiceImg = async (
    serviceIndex,
    imgIndex,
    serviceid,
    id
  ) => {
    try {
      if (id) {
        await deleteImageServiceAsync(serviceid, id);
        alert("Thành công");
        setFlag(!flag);
      }
      const updatedService = [...editService];
      updatedService[serviceIndex].imageUrls.splice(imgIndex, 1);
      setEditRoomType(updatedService);
      closeModalDeleteImgService();
    } catch (error) {
      console.error("Đã có lỗi xảy ra");
    }
  };

  const handleSaveEditSerices = async (e) => {
    try {
      e.preventDefault();
      const payload = {
        services: editService?.map((item) => {
          const { imageUrls, ...rest } = item;
          return {
            ...rest,
            hotelId: +id,
            servicePrice: +item.servicePrice,
            images: imageUrls.map((item) => ({
              ...item,
            })),
          };
        }),
      };

      const response = await editInfoServicesAsync(payload);
      if (response) {
        alert("Thành công");
        setFlag(!flag);
        setOpenEditService(false);
      }
    } catch (error) {
      alert("Thất bạt");
      console.error("Đã có lỗi xảy ra.");
    }
  };

  //Mở modal Edit room
  const openModalDeleteRoom = (roomTypeIndex, roomIndex, id) => {
    setOpenDeleteRoom(true);
    setSelectedRoom({
      roomTypeIndex: roomTypeIndex,
      roomIndex: roomIndex,
      id: id,
    });
  };
  const openModalDeleteRoomType = (roomTypeIndex, id) => {
    setOpenDeleteRoomType(true);
    setSelectedRoomType({
      roomTypeIndex: roomTypeIndex,
      id: id,
    });
  };
  const closeModalDeleteRoom = () => {
    setOpenDeleteRoom(false);
    setSelectedRoom(null);
  };
  const closeModalDeleteRoomType = () => {
    setOpenDeleteRoomType(false);
    setSelectedRoomType(null);
  };

  // Mở modal service
  const openModalDeleteService = (serviceIndex, id) => {
    setSelectedService({
      serviceIndex: serviceIndex,
      id: id,
    });
    setOpenDeleteService(true);
  };
  const openModalDeleteImgService = (
    serviceIndex,
    imgServiceIndex,
    serviceId,
    id
  ) => {
    setSelectedImgService({
      serviceIndex: serviceIndex,
      imgServiceIndex: imgServiceIndex,
      serviceId: serviceId,
      id: id,
    });
    setOpenDeleteImgService(true);
  };
  const closeModalDeteleService = () => {
    setSelectedService({});
    setOpenDeleteService(false);
  };
  const closeModalDeleteImgService = () => {
    setSelectedImgService({});
    setOpenDeleteImgService(false);
  };
  // Vô hiệu hóa khách sạn
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

  // fetch data để lưu dữ liệu xử lý
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
      if (hotelDetail?.services) {
        setEditService(hotelDetail.services);
      } else {
        setEditService([]);
      }
    }
  }, [hotelDetail]);

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
              <div className="w-full flex mt-5 justify-end border-b border-b-seconGray ">
                <button
                  onClick={() => setOpenEditModal(true)}
                  className="p-3 text-senconBlue opacity-80 transition-all duration-200 hover:opacity-100 hover:underline text-base scale-95"
                >
                  Chỉnh sửa thông tin khách sạn
                </button>
              </div>
              {/* roomType */}
              <div className="border border-seconGray flex flex-col gap-5 p-5 rounded-lg shadow">
                <h5 className="text-2xl text-secondary font-medium">
                  Các loại phòng khách sạn:{" "}
                </h5>
                <div className="grid grid-cols-2 gap-5 text-danger min-h-[100px]">
                  {hotelDetail.roomTypes?.map((roomType, index) => (
                    <p
                      key={index}
                    >{`${roomType.typeName} (${roomType?.rooms.length})`}</p>
                  ))}
                </div>
              </div>
              <div className="w-full flex justify-end border-b border-b-seconGray ">
                <button
                  onClick={() => setOpenEditRoomModal(true)}
                  className="p-3 text-senconBlue opacity-80 transition-all duration-200 hover:opacity-100 hover:underline text-base scale-95"
                >
                  Chỉnh sửa thông tin phòng và loại phòng
                </button>
              </div>
              {/* Service */}
              <div className="border border-seconGray flex flex-col gap-5 p-5 rounded-lg shadow">
                <h5 className="text-2xl text-secondary font-medium">
                  Các loại dịch vụ của khách sạn
                </h5>
                <div className="grid grid-cols-2 gap-5 text-danger min-h-[100px]">
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
              <div className="w-full flex justify-end border-b border-b-seconGray ">
                <button
                  onClick={() => setOpenEditService(true)}
                  className="p-3 text-senconBlue opacity-80 transition-all duration-200 hover:opacity-100 hover:underline text-base scale-95"
                >
                  Chỉnh sửa dịch vụ của khách sạn
                </button>
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
            {(hotelDetail.isActive && (
              <button
                onClick={() => setOpenDisable(true)}
                className="px-5 py-2 rounded-lg border bg-seconGray opacity-50 text-black
            transition-all duration-200 ease-in-out active:scale-95
             hover:shadow hover:opacity-100 hover:text-secondary font-medium "
              >
                Tạm ngừng kinh doanh
              </button>
            )) || (
              <button
                onClick={() => setOpenDisable(true)}
                className="px-5 py-2 rounded-lg border bg-secondary opacity-80 text-white
          transition-all duration-200 ease-in-out active:scale-95
           hover:shadow hover:opacity-100 font-medium "
              >
                Kích hoạt KS
              </button>
            )}
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
                  <div
                    key={index}
                    className="mb-3 border-b border-b-seconGray pb-3 flex flex-col gap-5
                        shadow hover:shadow-lg transition-all duration-200
                        border border-seconGray p-5 rounded-lg bg-white"
                  >
                    <div className="flex justify-between items-center">
                      <div className="max-w-[250px]">
                        <Title className="text-3xl">{roomType.typeName}</Title>
                      </div>
                      <button
                        className="p-1 bg-none hover:bg-seconGray hover:bg-opacity-50 rounded-full transition-all duration-200 active:scale-95"
                        onClick={() =>
                          openModalDeleteRoomType(index, roomType.roomTypeId)
                        }
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
                                openModalDeleteRoom(
                                  index,
                                  roomIndex,
                                  room.roomId
                                )
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
                onClick={handleSaveRoomTypesRoom}
              >
                Lưu thay đổi
              </button>
            </div>
          </Modal>

          {/* Modal Edit service */}
          <Modal
            isOpen={openEditService}
            onClose={() => setOpenEditService(false)}
            closeBtn={true}
            className={"w-auto max-h-[700px] overflow-y-auto"}
            title="Chỉnh sửa dịch vụ khách sạn"
          >
            {editService && (
              <div className="flex flex-col gap-5">
                {/* Dịch vụ */}
                {editService.map((item, serviceIndex) => (
                  <div
                    key={serviceIndex}
                    className="border border-seconGray p-5 rounded-lg shadow flex flex-col gap-5"
                  >
                    <div className="flex justify-between">
                      <div className="max-w-[250px] text-xl ">
                        <Title>{item.serviceName}</Title>
                      </div>
                      <button
                        className="p-1 hover:bg-seconGray hover:bg-opacity-50 rounded-full transition-all duration-200 active:scale-95"
                        onClick={() =>
                          openModalDeleteService(serviceIndex, item.serviceId)
                        }
                      >
                        <TrashIcon color="#c5270e" size="20" />
                      </button>
                    </div>
                    <EditableField
                      fieldName={"serviceName"}
                      fieldValue={item.serviceName}
                      label={"Tên dịch vụ"}
                      onSave={(fieldName, fieldValue) =>
                        handleChangeValueService(
                          fieldName,
                          fieldValue,
                          serviceIndex
                        )
                      }
                    />
                    <EditableField
                      fieldName={"serviceType"}
                      fieldValue={item.serviceType}
                      label={"Loại dịch vụ"}
                      onSave={(fieldName, fieldValue) =>
                        handleChangeValueService(
                          fieldName,
                          fieldValue,
                          serviceIndex
                        )
                      }
                    />
                    <EditableField
                      fieldName={"description"}
                      fieldValue={item.description}
                      label={"Mô tả dịch vụ"}
                      onSave={(fieldName, fieldValue) =>
                        handleChangeValueService(
                          fieldName,
                          fieldValue,
                          serviceIndex
                        )
                      }
                    />
                    <EditableField
                      fieldName={"servicePrice"}
                      fieldValue={item.servicePrice}
                      label={"Giá"}
                      onSave={(fieldName, fieldValue) =>
                        handleChangeValueService(
                          fieldName,
                          fieldValue,
                          serviceIndex
                        )
                      }
                    />
                    {/* Hình ảnh */}
                    <div className="p-5 border border-seconGray bg-secondary bg-opacity-5 rounded-lg flex flex-col gap-2">
                      {item.imageUrls?.map((img, index) => (
                        <div
                          key={index}
                          className="flex flex-col gap-3 border-b border-b-seconGray pb-3"
                        >
                          <div className="flex justify-end">
                            <button
                              className=" p-1 hover:bg-seconGray hover:bg-opacity-50 rounded-full transition-all duration-200 active:scale-95"
                              onClick={() =>
                                openModalDeleteImgService(
                                  serviceIndex,
                                  index,
                                  item.serviceId,
                                  img.imageId
                                )
                              }
                            >
                              <TrashIcon color="#c5270e" size="20" />
                            </button>
                          </div>

                          <EditableField
                            fieldName={"imageUrl"}
                            fieldValue={img.imageUrl}
                            label={"Hình ảnh dịch vụ"}
                            onSave={(fieldName, fieldValue) =>
                              handleChangeValueImgService(
                                index,
                                serviceIndex,
                                fieldName,
                                fieldValue
                              )
                            }
                          />
                        </div>
                      ))}
                      <div className="flex items-center justify-center">
                        <button
                          className="p-1 rounded-full hover:bg-opacity-20 hover:bg-seconGray transition-all duration-200 active:scale-95"
                          onClick={() => addNewImg(serviceIndex)}
                        >
                          <AddBtnIcon size="32" color="#007e47" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center">
                  <button
                    className="text-senconBlue text-xl opacity-70 hover:opacity-100 hover:underline transition-all duration-200 active:scale-95"
                    onClick={() => addNewService()}
                  >
                    Thêm dịch vụ
                  </button>
                </div>
              </div>
            )}
            <div className="flex justify-end">
              <div className="flex gap-5">
                <button
                  className="px-5 py-3 bg-seconGray opacity-80 hover:opacity-100 text-white font-medium rounded-lg transition-all duration-200"
                  onClick={() => setOpenEditService(false)}
                >
                  Hủy
                </button>
                <button
                  className="p-3 bg-secondary opacity-80 hover:opacity-100 text-white font-medium rounded-lg transition-all duration-200"
                  onClick={handleSaveEditSerices}
                >
                  Lưu thay đổi
                </button>
              </div>
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
                onClick={() =>
                  deleteRoomType(
                    selectedRoomType.roomTypeIndex,
                    selectedRoomType.id
                  )
                }
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
                  deleteRoom(
                    selectedRoom.roomTypeIndex,
                    selectedRoom.roomIndex,
                    selectedRoom.id
                  )
                }
                className="p-3 bg-danger rounded-md opacity-80 text-white font-medium transition-all duration-200 hover:opacity-100 active:scale-95"
              >
                Xác nhận
              </button>
            </div>
          </Modal>
          {/* Xác nhận xóa service */}
          <Modal isOpen={openDeleteService} onClose={closeModalDeteleService}>
            <h5 className="text-xl font-medium text-danger">
              Xác nhận xóa dịch vụ này ?
            </h5>
            <div className="flex justify-end gap-5 mt-5">
              <button
                onClick={closeModalDeteleService}
                className="p-3 bg-seconGray rounded-md opacity-80 text-white font-medium transition-all duration-200 hover:opacity-100 active:scale-95"
              >
                Hủy
              </button>
              <button
                onClick={() =>
                  handleDeteleService(
                    selectedService.serviceIndex,
                    selectedService.id
                  )
                }
                className="p-3 bg-danger rounded-md opacity-80 text-white font-medium transition-all duration-200 hover:opacity-100 active:scale-95"
              >
                Xác nhận
              </button>
            </div>
          </Modal>
          {/* Xác nhận xóa img service */}
          <Modal
            isOpen={openDeleteImgService}
            onClose={closeModalDeleteImgService}
          >
            <h5 className="text-xl font-medium text-danger">
              Xác nhận xóa hình ảnh này ?
            </h5>
            <div className="flex justify-end gap-5 mt-5">
              <button
                onClick={closeModalDeleteImgService}
                className="p-3 bg-seconGray rounded-md opacity-80 text-white font-medium transition-all duration-200 hover:opacity-100 active:scale-95"
              >
                Hủy
              </button>
              <button
                onClick={() =>
                  handleDeleteServiceImg(
                    selectedImgService.serviceIndex,
                    selectedImgService.imgServiceIndex,
                    selectedImgService.serviceId,
                    selectedImgService.id
                  )
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
