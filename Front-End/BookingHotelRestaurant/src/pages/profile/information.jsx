import Demo from "../../assets/img/banner.png";
import Text from "../../component/text/text";
import Email from "../../assets/icons/email";
import LocationIcon from "../../assets/icons/locationIcon";
import Call from "../../assets/icons/call";
import Calendar from "../../assets/icons/time";
import KeyIcon from "../../assets/icons/key";
import EditIcon from "../../assets/icons/edit";
import Birthday from "../../assets/icons/birthday";
import QuocTich from "../../assets/icons/quocTich";
import useScreenWithResize from "../../hook/useScreenWithResize";

function Information() {
  const screenWidth = useScreenWithResize();
  const isMobile = screenWidth <= 768;
  const user = {
    name: "Nguyễn Trí Trung",
    doB: "16/10/1999",
    country: "Việt Nam",
    email: "trung.nguyen99310@gmail.com",
    localtion: "Quận Tân Bình",
    phone: "0896101610",
    bookedHotel: 5,
    avt: Demo,
  };

  const information = [
    {
      content: "16/10/1999",
      icon: <Birthday />,
      subContent: "Việt Nam",
      subIcon: <QuocTich />,
    },
    {
      content: "trungnguyen@gmail.com",
      icon: <Email />,
      subContent: "Quận Tân Bình",
      subIcon: <LocationIcon />,
    },
    {
      content: "089.610.1610",
      icon: <Call />,
      subContent: "Bạn đã đặt 5 khách sạn",
      subIcon: <Calendar />,
    },
  ];

  return (
    <div className="bg-white rounded-2xl w-full flex flex-col justify-center items-center p-4 md:p-8">
      <div className="w-full max-w-[1280px] flex flex-col md:flex-row gap-6 md:gap-12 items-center">
        {/* Image Section */}
        <img
          src={user.avt}
          alt="User"
          className="w-[160px] h-[160px] md:w-40 md:h-40 object-cover rounded-xl"
        />

        {/* Information Section */}
        <div className="flex flex-col gap-4 md:gap-8 items-center md:items-start text-center md:text-left">
          <h6 className="font-medium text-black text-[24px] md:text-[32px]">
            {user.name}
          </h6>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-x-20 lg:gap-y-8 ">
            <div className="flex gap-3 text-primary">
              <Birthday />
              <span>{user.doB}</span>
            </div>
            <div className="flex gap-3 lg:w-[220px] text-primary">
              <Email className="flex-shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex gap-3 text-primary">
              <Call />
              <span>{user.phone}</span>
            </div>
            {!isMobile && (
              <a className="flex gap-2 text-secondary cursor-pointer group transition-all duration-150 active:translate-y-[-2px] active:opacity-50">
                <EditIcon />
                <p className="opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform group-hover:translate-x-2">
                  Thay đổi thông tin
                </p>
              </a>
            )}
            <div className="flex gap-3 text-primary">
              <QuocTich />
              <span>{user.country}</span>
            </div>
            <div className="flex gap-3 text-primary">
              <LocationIcon />
              <span>{user.localtion}</span>
            </div>
            <div className="flex gap-3 text-primary">
              <Calendar />
              <span>Bạn đã đặt {user.bookedHotel} khách sạn</span>
            </div>
            {!isMobile && (
              <a className="flex gap-2 text-secondary cursor-pointer group transition-all duration-150 active:translate-y-[-2px] active:opacity-50">
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
