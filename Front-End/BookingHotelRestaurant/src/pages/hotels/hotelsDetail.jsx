import { useEffect, useState } from "react";
import demo from "../../assets/img/bannerLogin.jpg";
import DisscountItem from "../../component/hotel/disscountItem";
import RoomItem from "../../component/hotel/roomItem";
import ServiceItem from "../../component/hotel/serviceItem";
import Text from "../../component/text/text";
import ArrowUpIcon from "../../assets/icons/arrowUpIcon";
import ArrDownIcon from "../../assets/icons/arrowDownIcon";
import RaitingProfile from "../../component/cards/cardRaitingInProfile";
import ArrowleftIcon from "../../assets/icons/arrowLeftIcon";
import ArrowrightIcon from "../../assets/icons/arrowRightIcon";
import { useGlobalContext, useHotels } from "../../context";
import { useNavigate, useParams } from "react-router-dom";
import StarIcon from "../../assets/icons/starIcon";
import LocationIcon from "../../assets/icons/locationIcon";
import MoneyIcon from "../../assets/icons/moneyIcon";
import BuildingIcon from "../../assets/icons/building";
import ServiceIcon from "../../assets/icons/serviceIcon";
import Modal from "../../component/myModal";
import StarRating from "../../component/starRating";
import { useAuth } from "../../context/authContext";
import { useReview } from "../../context/reviewContext";

function HotelDetail() {
  const [toggleService, setToggleService] = useState(false);
  const [toggleDisscount, setToggleDisscount] = useState(false);
  const [openReviewFrom, setOpenReviewFrom] = useState(false);
  const { isHavedAccount } = useAuth();
  const { id } = useParams();
  const { hotelDetail, fetchHotelById } = useHotels();
  const { formatCurrency } = useGlobalContext();
  const accountName = localStorage.getItem("accountName");
  const { addNewReview } = useReview();
  const [resetRating, setResetRating] = useState(false);
  const [openRoomDetails, setOpenRoomDetails] = useState({});

  const handleScrollOnTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenModal = (roomTypeId) => {
    setOpenRoomDetails((prevState) => ({
      ...prevState,
      [roomTypeId]: true,
    }));
  };

  // Hàm xử lý đóng modal
  const handleCloseModal = (roomTypeId) => {
    setOpenRoomDetails((prevState) => ({
      ...prevState,
      [roomTypeId]: false,
    }));
  };

  const [reviewForm, setReviewFrom] = useState({
    accountName: accountName ? accountName : "",
    hotelId: +id,
    rating: null,
    reviewText: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        await fetchHotelById(id);
        handleScrollOnTop();
      } catch (error) {
        console.error("Đã có lỗi xảy ra: ", error.message);
      }
    };
    fetchDataById();
  }, [id]);

  const infomationsHotel = [
    {
      icon: <LocationIcon size="20" />,
      label: hotelDetail?.address || "N/A", // Sử dụng optional chaining
    },
    {
      icon: <MoneyIcon />,
      label: hotelDetail?.roomTypes?.[0]?.rooms?.[0]?.pricePerNight
        ? formatCurrency(+hotelDetail.roomTypes[0]?.rooms[0]?.pricePerNight)
        : "N/A",
    },
    {
      icon: <BuildingIcon size="20" />,
      label: hotelDetail?.description || "N/A",
    },
    {
      icon: <ServiceIcon />,
      label: `Khách sạn có ${
        hotelDetail?.reviews?.length || 0
      } dịch vụ tiện ích.`,
    },
  ];
  const offer = [
    { icon: "I", label: "Sun, 06:00 PM - 09:30 PM", amount: 100, status: true },
    {
      icon: "I",
      label: "Sun, 06:00 PM - 09:30 PM",
      amount: 100,
      status: false,
    },
    { icon: "I", label: "Sun, 06:00 PM - 09:30 PM", amount: 100, status: true },
  ];

  const handleResetFormReview = () => {
    setReviewFrom({
      accountName: accountName ? accountName : "",
      hotelId: +id,
      rating: null,
      reviewText: "",
    });
    setResetRating(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await addNewReview(reviewForm, id);
    if (response) {
      handleResetFormReview();
      setOpenReviewFrom(false);
    }
  };
  return (
    <div className="w-[1400px] p-5 pb-10 h-auto flex gap-4">
      {/* left pane */}
      <div className="w-full md:w-[70%] flex flex-col gap-5">
        {/* Img khách sạn */}
        <div className="w-full h-[420px] relative group overflow-hidden rounded-[20px]">
          <img
            src={demo}
            alt=""
            className="w-full h-full object-cover rounded-[20px] group-hover:opacity-90 transition-opacity duration-200"
          />
          {/* Left */}
          <div
            className="h-full absolute cursor-pointer bg-black left-[-10%] rounded-l-[20px] w-[10%] flex items-center justify-center
           top-0 opacity-10 hover:opacity-100 hover:bg-opacity-30  group-hover:left-0 transition-all duration-300 ease-in-out"
          >
            <ArrowleftIcon size="50" color="#FFFFFF" />
          </div>
          {/* Right */}
          <div
            className="h-full absolute cursor-pointer bg-black right-[-10%] rounded-r-[20px] w-[10%] flex items-center justify-center
           top-0 opacity-10 hover:opacity-100 hover:bg-opacity-30  group-hover:right-0 transition-all duration-300 ease-in-out"
          >
            <ArrowrightIcon size="50" color="#FFFFFF" />
          </div>
          {/* List Img */}
          <div
            className="h-1/6 w-1/2 absolute bottom-[-17%]
           left-[25%] group-hover:bottom-[10px] transition-all duration-300 ease-in-out flex gap-2"
          >
            <div className="bg-white rounded-xl w-[70px] h-[70px] flex items-center justify-center">
              <img src={demo} className="w-full h-full rounded-xl" />
            </div>
            <div className="bg-white rounded-xl w-[70px] h-[70px] flex items-center justify-center">
              <img src={demo} className="w-full h-full rounded-xl" />
            </div>
          </div>
        </div>
        {/* Infomation Hotels */}
        <div className="w-full bg-white py-8 px-6 rounded-xl flex flex-col gap-5">
          <div className="flex justify-between items-center border-b-seconGray border-b-[1px] border-opacity-50 pb-4">
            <Text className={"text-[28px] font-medium"}>
              {hotelDetail ? hotelDetail.hotelName : "N/A"}
            </Text>
            <div className="flex gap-1">
              <div className="flex text-primary gap-2">
                <StarIcon color="#007e47" size="20" />
                <p>4.5 Starts |</p>
              </div>
              <p className="text-secondary">
                {`${
                  hotelDetail?.reviews?.length > 0
                    ? hotelDetail.reviews.length
                    : 0
                }`}{" "}
                Reviews
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-5">
            {infomationsHotel.map((item, index) => (
              <div key={index} className="flex gap-3">
                {item.icon}
                <p>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Ưu đãi có hoặc không đều được :v  */}
        <div
          className={`w-full bg-white rounded-xl p-5 flex flex-col gap-5 transition-all duration-500 ease-in-out ${
            toggleDisscount ? "max-h-[450px]" : "max-h-[68px]"
          } overflow-hidden`}
        >
          <div
            className="flex justify-between items-center cursor-pointer group"
            onClick={() => setToggleDisscount(!toggleDisscount)}
          >
            <Text
              className={`${
                toggleDisscount ? "text-secondary" : "text-primary"
              } text-[22px] group-hover:text-secondary`}
            >
              Ưu đãi có sẵn
            </Text>
            {toggleDisscount ? (
              <ArrowUpIcon size="20" />
            ) : (
              <ArrDownIcon size="20" />
            )}
          </div>
          <div className="flex flex-col gap-3">
            {offer.map((item, index) => (
              <DisscountItem key={index} obj={item} />
            ))}
          </div>
          <a
            className="w-full text-center underline text-[#3595FF] cursor-pointer text-sm
           hover:text-senconBlue transition-colors duration-100"
          >
            See all offer(+10 more)
          </a>
        </div>
        {/* Rooms Details */}
        <div className="p-5 w-full flex flex-col rounded-xl gap-5 bg-white">
          <Text
            className={
              "text-[22px] border-b-[1px] border-b-seconGray pb-4 bg-opacity-20"
            }
          >
            Các loại phòng
          </Text>
          <div className="grid grid-cols-6 gap-y-3">
            {hotelDetail &&
              hotelDetail.roomTypes?.map((roomType) => {
                return (
                  <div key={roomType.roomTypeId}>
                    <RoomItem
                      onClick={() => handleOpenModal(roomType.roomTypeId)}
                      obj={roomType}
                    />
                    <Modal
                      isOpen={openRoomDetails[roomType.roomTypeId] || false}
                      onClose={() => handleCloseModal(roomType.roomTypeId)}
                      closeBtn={true}
                      className={"w-3/5 h-[620px] overflow-y-auto"}
                      title={`${roomType.typeName}`}
                    >
                      <div className="flex flex-col px-20 gap-5">
                        {roomType?.rooms &&
                          roomType?.rooms?.map((room) => (
                            <div
                              key={room.roomId}
                              className="w-full shadow rounded-xl border border-seconGray p-5
                              hover:shadow-[#00747e] hover:shadow-md transition-all duration-300 ease-in-out"
                            >
                              <div className="flex mb-5">
                                <div className="text-primary w-[150px]">
                                  <p>Mô tả: </p>
                                  <p>Giá phòng : </p>
                                </div>
                                <div className="text-secondary">
                                  <p>{room.description}</p>
                                  <p>{`${formatCurrency(
                                    +room.pricePerNight
                                  )} / đêm`}</p>
                                </div>
                              </div>
                              <div className="w-full h-[250px] rounded-lg">
                                <img
                                  src={demo}
                                  className="w-full h-full rounded-lg object-cover"
                                />
                              </div>
                            </div>
                          ))}
                      </div>
                    </Modal>
                  </div>
                );
              })}
          </div>
        </div>
        {/* service */}
        <div
          className={`w-full bg-white rounded-xl flex flex-col p-5 gap-5 transition-all duration-500 ease-in-out ${
            toggleService ? "max-h-[480px]" : "max-h-[68px]"
          } overflow-hidden`}
          onClick={() => setToggleService(!toggleService)}
        >
          <div className=" border-b-[1px] border-b-seconGray pb-4 bg-opacity-20 flex justify-between cursor-pointer group">
            <Text
              className={`text-[22px] ${
                toggleService ? "text-secondary" : "text-primary"
              } group-hover:text-secondary`}
            >
              Dịch vụ khách sạn
            </Text>
            {toggleService ? (
              <ArrowUpIcon size="20" />
            ) : (
              <ArrDownIcon size="20" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-4">
            {hotelDetail &&
              hotelDetail.services?.map((service) => (
                <ServiceItem key={service.serviceId} obj={service} />
              ))}
          </div>
        </div>
        {/* Reviews */}
        <div className="flex flex-col gap-5">
          <div className="w-full bg-white px-8 py-9 rounded-xl">
            <Text
              className={
                "text-[22px] pb-4 border-b-[1px] border-seconGray border-opacity-30"
              }
            >
              Đánh giá
            </Text>
            <div className="w-full flex flex-col items-center pt-9">
              <p className="text-sm text-[#5F5F5F] font-medium">
                Đánh giá & Đánh giá tổng thể
              </p>
              <h3 className="text-[57px] text-secondary">5</h3>
              <div className="text-secondary flex mb-5">
                <StarIcon color="#007e47" />
                <StarIcon color="#007e47" />
                <StarIcon color="#007e47" />
                <StarIcon color="#007e47" />
                <StarIcon color="#007e47" />
              </div>
              <p className="text-[#5F5F5F] font-medium">
                Dựa trên 200 reviews.{" "}
                {isHavedAccount ? (
                  <a
                    onClick={() => setOpenReviewFrom(true)}
                    className="text-secondary underline cursor-pointer font-normal"
                  >
                    Đánh giá ngay
                  </a>
                ) : (
                  <a
                    onClick={() => navigate("/login")}
                    className="text-secondary underline cursor-pointer font-normal"
                  >
                    Đăng nhập để đánh giá.
                  </a>
                )}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-5">
            {hotelDetail &&
              hotelDetail.reviews?.map((review) => (
                <RaitingProfile
                  key={review.hotelReviewId}
                  profile={false}
                  obj={review}
                />
              ))}
          </div>
        </div>
      </div>
      {/* right pane */}
      <div className="bg-slate-950 w-[30%] h-screen"></div>
      {/* Form review */}
      <Modal
        isOpen={openReviewFrom}
        onClose={() => {
          setOpenReviewFrom(false);
          handleResetFormReview();
        }}
        title="Đánh giá và FeedBack"
        closeBtn={true}
        className={"h-[500px] overflow-y-auto"}
      >
        <div className="w-full flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <Text>Trải nghiệm thật tuyệt vời khi ở đây ?</Text>
            <StarRating
              reset={resetRating}
              toggle={setResetRating}
              onChange={(newRaiting) =>
                setReviewFrom((prev) => ({
                  ...prev,
                  rating: newRaiting,
                }))
              }
            />
          </div>
          <div className="flex flex-col gap-5">
            <Text>Điều gì khiến bạn ấn tượng ?</Text>
            <textarea
              value={reviewForm.reviewText}
              onChange={(e) =>
                setReviewFrom((prev) => ({
                  ...prev,
                  reviewText: e.target.value,
                }))
              }
              className="w-full border rounded-lg border-secondary h-[150px] p-4 text-primary"
            />
            <div className="flex justify-end">
              <div className="flex gap-5">
                <button
                  onClick={() => {
                    setOpenReviewFrom(false);
                    handleResetFormReview();
                  }}
                  className="px-8 py-2 bg-white border rounded-xl
                 font-medium border-seconGray text-seconGray
                 hover:bg-seconGray hover:text-white transition-colors duration-200 ease-in-out"
                >
                  Hủy
                </button>
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="px-8 py-2 bg-white border rounded-xl
                 font-medium border-secondary text-secondary
                 hover:bg-secondary hover:text-white transition-colors duration-200 ease-in-out"
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      {/* Room Detail */}
    </div>
  );
}

export default HotelDetail;
