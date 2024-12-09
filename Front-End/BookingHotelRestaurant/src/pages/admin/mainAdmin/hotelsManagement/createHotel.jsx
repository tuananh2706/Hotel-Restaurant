import React, { useState } from "react";
import Modal from "../../../../component/myModal";
import { useNavigate } from "react-router-dom";
import InputDynamic from "../../../../component/inputDynamic";
import AddBtnIcon from "../../../../assets/icons/addIcon";
import { createHotel } from "../../../../service/hotelsService";
import { useHotels } from "../../../../context";

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

const CreateHotelForm = () => {
  const navigate = useNavigate();
  const { fetchHotels } = useHotels();
  const defaultHotelInfo = {
    hotelName: "",
    address: "",
    description: "",
    categoryId: 0,
    locationId: 0,
    isActive: true,
    roomTypes: [
      {
        typeName: "",
        rooms: [
          {
            pricePerNight: 0,
            status: "",
            description: "",
            maxOccupancy: 0,
            roomCount: 0,
            roomImages: [""],
          },
        ],
      },
    ],
    services: [
      {
        serviceName: "",
        servicePrice: 0,
        serviceType: "",
        serviceImages: [""],
      },
    ],
    hotelImages: [""],
    social: [{ linkUrl: "" }],
  };
  const [hotelInfo, setHotelInfo] = useState({
    hotelName: "",
    address: "",
    description: "",
    categoryId: 0,
    locationId: 0,
    isActive: true,
    roomTypes: [
      {
        typeName: "",
        rooms: [
          {
            pricePerNight: 0,
            status: "",
            description: "",
            maxOccupancy: 0,
            roomCount: 0,
            roomImages: [""],
          },
        ],
      },
    ],
    services: [
      {
        serviceName: "",
        servicePrice: 0,
        serviceType: "",
        serviceImages: [""],
      },
    ],
    hotelImages: [""],
    social: [{ linkUrl: "" }],
  });

  const refeshForm = () => {
    setHotelInfo(defaultHotelInfo);
  };

  // Cập nhật hình ảnh khách sạn
  const handleHotelImageChange = (e, imageIndex) => {
    const updatedHotelImages = [...hotelInfo.hotelImages];
    updatedHotelImages[imageIndex] = e.target.value;
    setHotelInfo({ ...hotelInfo, hotelImages: updatedHotelImages });
  };

  // Thêm hình ảnh khách sạn mới
  const handleAddHotelImage = () => {
    setHotelInfo((prevState) => ({
      ...prevState,
      hotelImages: [...prevState.hotelImages, ""],
    }));
  };

  // Cập nhật thông tin khách sạn
  const handleHotelInfoChange = (e) => {
    setHotelInfo({
      ...hotelInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceChange = (e, serviceIndex, fieldName) => {
    const updatedServices = [...hotelInfo.services];
    updatedServices[serviceIndex][fieldName] = e.target.value;
    setHotelInfo({ ...hotelInfo, services: updatedServices });
  };

  // Cập nhật thông tin loại phòng
  const handleRoomTypeChange = (e, roomIndex, typeName) => {
    const updatedRoomTypes = [...hotelInfo.roomTypes];
    updatedRoomTypes[roomIndex][typeName] = e.target.value;
    setHotelInfo({ ...hotelInfo, roomTypes: updatedRoomTypes });
  };

  // Thêm loại phòng mới
  const handleAddRoomType = () => {
    setHotelInfo({
      ...hotelInfo,
      roomTypes: [
        ...hotelInfo.roomTypes,
        {
          typeName: "",
          rooms: [
            {
              pricePerNight: 0,
              status: "",
              description: "",
              maxOccupancy: 0,
              roomCount: 0,
              roomImages: [""],
            },
          ],
        },
      ],
    });
  };

  // Cập nhật thông tin phòng
  const handleRoomChange = (e, roomTypeIndex, roomIndex, fieldName) => {
    const updatedRoomTypes = [...hotelInfo.roomTypes];
    updatedRoomTypes[roomTypeIndex].rooms[roomIndex][fieldName] =
      e.target.value;
    setHotelInfo({ ...hotelInfo, roomTypes: updatedRoomTypes });
  };

  const handleServiceImageChange = (e, serviceIndex, imageIndex) => {
    const updatedServices = [...hotelInfo.services];
    updatedServices[serviceIndex].serviceImages[imageIndex] = e.target.value; // Cập nhật link ảnh tại vị trí cụ thể
    setHotelInfo({ ...hotelInfo, services: updatedServices });
  };

  // Thêm hình ảnh mới cho dịch vụ
  const handleAddServiceImage = (serviceIndex) => {
    const updatedServices = [...hotelInfo.services];
    updatedServices[serviceIndex].serviceImages.push(""); // Thêm một link ảnh trống
    setHotelInfo({ ...hotelInfo, services: updatedServices });
  };

  // Thêm dịch vụ mới
  const handleAddService = () => {
    setHotelInfo({
      ...hotelInfo,
      services: [
        ...hotelInfo.services,
        {
          serviceName: "",
          servicePrice: 0,
          serviceType: "",
          serviceImages: [""],
        },
      ],
    });
  };

  // Cập nhật thông tin hình ảnh phòng
  const handleRoomImageChange = (e, roomTypeIndex, roomIndex, imageIndex) => {
    const updatedRoomTypes = [...hotelInfo.roomTypes];
    updatedRoomTypes[roomTypeIndex].rooms[roomIndex].roomImages[imageIndex] =
      e.target.value; // Cập nhật link ảnh tại vị trí cụ thể
    setHotelInfo({ ...hotelInfo, roomTypes: updatedRoomTypes });
  };

  // Thêm hình ảnh mới vào phòng (thêm một link ảnh mới)
  const handleAddRoomImage = (roomTypeIndex, roomIndex) => {
    const updatedRoomTypes = [...hotelInfo.roomTypes];
    updatedRoomTypes[roomTypeIndex].rooms[roomIndex].roomImages.push(""); // Thêm một link ảnh trống
    setHotelInfo({ ...hotelInfo, roomTypes: updatedRoomTypes });
  };

  // Cập nhật thông tin mạng xã hội
  const handleSocialLinkChange = (e, index) => {
    const updatedSocialLinks = [...hotelInfo.social];
    updatedSocialLinks[index].linkUrl = e.target.value;
    setHotelInfo({ ...hotelInfo, social: updatedSocialLinks });
  };

  // Thêm liên kết mạng xã hội
  const handleAddSocialLink = () => {
    setHotelInfo({
      ...hotelInfo,
      social: [...hotelInfo.social, { linkUrl: "" }],
    });
  };

  // Xử lý gửi form
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await createHotel(hotelInfo);
      navigate(-1);
      refeshForm();
      await fetchHotels();
    } catch (error) {
      console.error("Đã có lỗi xảy ra:", error.message);
    }
  };

  return (
    <Modal
      isOpen={true}
      className={"w-2/4 h-5/6 overflow-y-auto"}
      onClose={() => navigate(-1)}
      closeBtn={true}
      title="Thêm khách sạn mới"
    >
      <form onSubmit={handleSubmit} className="p-6">
        {/* Hotel Information */}
        <div className="mb-6 border-b border-b-seconGray">
          <h5 className="text-xl text-secondary font-medium pb-2 mb-3">
            Thông tin khách sạn
          </h5>
          <InputDynamic
            type="text"
            name="hotelName"
            value={hotelInfo.hotelName}
            onChange={handleHotelInfoChange}
            label={"Tên khách sạn*"}
          />
          <InputDynamic
            type="text"
            name="address"
            label={"Địa chỉ*"}
            value={hotelInfo.address}
            onChange={handleHotelInfoChange}
          />

          <div className="flex justify-between my-5">
            <select
              className="p-3 outline-none border border-seconGray focus:border-secondary rounded-lg"
              name="categoryId"
              id="categoryId"
              onChange={handleHotelInfoChange}
            >
              <option value="">--Loại khách sạn--</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              className="p-3 outline-none border border-seconGray focus:border-secondary rounded-lg"
              name="locationId"
              id="locationId"
              onChange={handleHotelInfoChange}
            >
              <option value="">--Quận--</option>
              {localtions.map((location) => (
                <option key={location.id} value={location.id}>
                  Quận {location.label}
                </option>
              ))}
            </select>
          </div>

          <InputDynamic
            type="textarea"
            name="description"
            label={"Mô tả"}
            value={hotelInfo.description}
            onChange={handleHotelInfoChange}
          />
          {hotelInfo.hotelImages.map((image, imageIndex) => (
            <div key={imageIndex} className="mb-2">
              <InputDynamic
                type="text"
                value={image}
                onChange={(e) => handleHotelImageChange(e, imageIndex)}
                label={"Link hình ảnh khách sạn"}
              />
            </div>
          ))}
          <div className="flex items-center justify-center mb-5">
            <button type="button" onClick={handleAddHotelImage}>
              <AddBtnIcon size="28" color="#C5270E" />
            </button>
          </div>
        </div>

        {/* Room Types */}
        <div className="mb-6">
          <h5 className="text-xl text-secondary font-medium pb-2 mb-3">
            Loại Phòng
          </h5>
          {hotelInfo.roomTypes.map((roomType, roomTypeIndex) => (
            <div
              key={roomTypeIndex}
              className="mb-4 border-b border-b-seconGray"
            >
              <InputDynamic
                type="text"
                value={roomType.typeName}
                onChange={(e) =>
                  handleRoomTypeChange(e, roomTypeIndex, "typeName")
                }
                label={"Tên loại phòng*"}
              />
              {roomType.rooms.map((room, roomIndex) => (
                <div key={roomIndex} className="border-t py-2">
                  <InputDynamic
                    type="number"
                    value={room.pricePerNight}
                    onChange={(e) =>
                      handleRoomChange(
                        e,
                        roomTypeIndex,
                        roomIndex,
                        "pricePerNight"
                      )
                    }
                    label={"Giá phòng"}
                  />
                  {/* <InputDynamic
                    type="text"
                    value={room.status}
                    onChange={(e) =>
                      handleRoomChange(e, roomTypeIndex, roomIndex, "status")
                    }
                    placeholder="Room Status"
                    className="w-full mb-2"
                  /> */}
                  <InputDynamic
                    type="number"
                    value={room.maxOccupancy}
                    onChange={(e) =>
                      handleRoomChange(
                        e,
                        roomTypeIndex,
                        roomIndex,
                        "maxOccupancy"
                      )
                    }
                    label={"Sức chứa của phòng"}
                  />
                  <InputDynamic
                    type="number"
                    value={room.roomCount}
                    onChange={(e) =>
                      handleRoomChange(e, roomTypeIndex, roomIndex, "roomCount")
                    }
                    label={"Số lượng phòng"}
                  />
                  {room.roomImages.map((image, imageIndex) => (
                    <InputDynamic
                      key={imageIndex}
                      type="text"
                      value={image}
                      onChange={(e) =>
                        handleRoomImageChange(
                          e,
                          roomTypeIndex,
                          roomIndex,
                          imageIndex
                        )
                      }
                      label={"Hình ảnh phòng"}
                      className="w-full mb-2"
                    />
                  ))}
                  <div className="flex items-center justify-center mb-5">
                    <button
                      type="button"
                      onClick={() =>
                        handleAddRoomImage(roomTypeIndex, roomIndex)
                      }
                    >
                      <AddBtnIcon size="28" color="#C5270E" />
                    </button>
                  </div>

                  <InputDynamic
                    type="textarea"
                    value={room.description}
                    onChange={(e) =>
                      handleRoomChange(
                        e,
                        roomTypeIndex,
                        roomIndex,
                        "description"
                      )
                    }
                    label={"Mô tả"}
                  />
                </div>
              ))}
            </div>
          ))}
          <div className="flex items-center justify-center">
            <button type="button" onClick={handleAddRoomType}>
              <AddBtnIcon size="28" color="#007e47" />
            </button>
          </div>
        </div>

        {/* Services */}
        <div className="mb-6">
          <h5 className="text-xl text-secondary font-medium pb-2 mb-3">
            Dịch vụ
          </h5>
          {hotelInfo.services.map((service, serviceIndex) => (
            <div
              key={serviceIndex}
              className="mb-4 border-b border-b-seconGray"
            >
              <InputDynamic
                type="text"
                value={service.serviceName}
                onChange={(e) =>
                  handleServiceChange(e, serviceIndex, "serviceName")
                }
                label={"Tên dịch vụ"}
              />
              <InputDynamic
                type="number"
                value={service.servicePrice}
                onChange={(e) =>
                  handleServiceChange(e, serviceIndex, "servicePrice")
                }
                label={"Giá dịch vụ"}
              />
              <InputDynamic
                type="text"
                value={service.serviceType}
                onChange={(e) =>
                  handleServiceChange(e, serviceIndex, "serviceType")
                }
                label={"Loại dịch vụ"}
              />
              {service.serviceImages.map((image, imageIndex) => (
                <InputDynamic
                  key={imageIndex}
                  type="text"
                  value={image}
                  onChange={(e) =>
                    handleServiceImageChange(e, serviceIndex, imageIndex)
                  }
                  label={"Hình ảnh dịch vụ"}
                  className="w-full mb-2"
                />
              ))}
              <div className="flex items-center justify-center mb-5">
                <button
                  type="button"
                  onClick={() => handleAddServiceImage(serviceIndex)}
                >
                  <AddBtnIcon size="28" color="#C5270E" />
                </button>
              </div>
            </div>
          ))}
          <div className="flex items-center justify-center">
            <button type="button" onClick={handleAddService}>
              <AddBtnIcon size="28" color="#007e47" />
            </button>
          </div>
        </div>

        {/* Social Links */}
        <div className="mb-6">
          <h5 className="text-xl text-secondary font-medium pb-2 mb-3">
            Mạng xã hội
          </h5>
          {hotelInfo.social.map((link, index) => (
            <div key={index} className="mb-2 border-b border-b-seconGray">
              <InputDynamic
                type="text"
                value={link.linkUrl}
                onChange={(e) => handleSocialLinkChange(e, index)}
                label={"Gắn link mạng xã hội"}
              />
            </div>
          ))}
          <div className="flex items-center justify-center">
            <button type="button" onClick={handleAddSocialLink}>
              <AddBtnIcon size="28" color="#007e47" />
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="p-3 bg-secondary opacity-80 hover:opacity-100  transition-all duration-200 active:scale-95 rounded-lg text-white font-medium"
        >
          Xác nhận
        </button>
      </form>
    </Modal>
  );
};

export default CreateHotelForm;
