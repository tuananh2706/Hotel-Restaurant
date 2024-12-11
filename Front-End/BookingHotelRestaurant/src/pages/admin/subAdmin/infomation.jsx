import { useEffect, useState } from "react";
import useScreenWithResize from "../../../hook/useScreenWithResize";
import { useAuth } from "../../../context/authContext";
import { useGlobalContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import Demo from "../../../assets/img/banner.png";
import Email from "../../../assets/icons/email";
import LocationIcon from "../../../assets/icons/locationIcon";
import Call from "../../../assets/icons/call";
import Calendar from "../../../assets/icons/time";
import KeyIcon from "../../../assets/icons/key";
import EditIcon from "../../../assets/icons/edit";
import Birthday from "../../../assets/icons/birthday";
import QuocTich from "../../../assets/icons/quocTich";

function Information() {
  const screenWidth = useScreenWithResize();
  const isMobile = screenWidth <= 768;
  const [account, setAccount] = useState({
    name: "",
    doB: "",
    country: "",
    email: "",
    localtion: "",
    phone: "",
    bookedHotel: 0,
    avt: Demo,
  });
  const { user } = useAuth();
  const { formatDate } = useGlobalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fullName = user.firstName + " " + user.lastName;
      const dob = new Date(user.birthDate);
      setAccount({
        name: fullName ? fullName : "Example",
        doB: formatDate(dob),
        country: user.nationality ? user.nationality : "---",
        email: user.email,
        localtion: "Quận Tân Bình",
        phone: user.phone ? user.phone : "---",
        bookedHotel: 0,
        avt: user.avatarUrl ? user.avatarUrl : Demo,
      });
    }
  }, [user]);

  return (
    <div className="bg-white rounded-2xl w-full flex flex-col justify-center items-center p-4 md:p-8">
      <div className="w-full max-w-[1280px] flex flex-col md:flex-row gap-6 md:gap-12 items-center">
        {/* Image Section */}
        <img
          src={account.avt}
          alt="User"
          className="w-[160px] h-[160px] md:w-40 md:h-40 object-cover rounded-xl"
        />

        {/* Information Section */}
        <div className="flex flex-col gap-4 md:gap-8 items-center md:items-start text-center md:text-left">
          <h6 className="font-medium text-black text-[24px] md:text-[32px]">
            {account.name}
          </h6>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-x-20 lg:gap-y-8 ">
            <div className="flex gap-3 text-primary">
              <Birthday />
              <span>{account.doB}</span>
            </div>
            <div className="flex gap-3 lg:w-[220px] text-primary">
              <Email className="flex-shrink-0" />
              <span className="truncate">{account.email}</span>
            </div>
            <div className="flex gap-3 text-primary">
              <Call />
              <span>{account.phone}</span>
            </div>
            {!isMobile && (
              <a
                onClick={() => navigate("/ownerManagement/infomation")}
                className="flex gap-2 text-secondary cursor-pointer group transition-all 
              duration-150 active:translate-y-[-2px] active:opacity-50"
              >
                <EditIcon />
                <p className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:translate-x-2">
                  Thay đổi thông tin
                </p>
              </a>
            )}
            <div className="flex gap-3 text-primary">
              <QuocTich />
              <span>{account.country}</span>
            </div>
            <div className="flex gap-3 text-primary">
              <LocationIcon />
              <span>{account.localtion}</span>
            </div>
            <div className="flex gap-3 text-primary">
              <Calendar />
              <span>Bạn đã đặt {account.bookedHotel} khách sạn</span>
            </div>
            {!isMobile && (
              <a
                onClick={() => navigate("/ownerManagement/changlePassword")}
                className="flex gap-2 text-secondary cursor-pointer group transition-all 
              duration-150 active:translate-y-[-2px] active:opacity-50"
              >
                <KeyIcon />
                <p className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:translate-x-2">
                  Thay đổi mật khẩu
                </p>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
