import Email from "../../assets/icons/email";
import Lock from "../../assets/icons/lock";
import Calendar from "../../assets/icons/time";
import Timer from "../../assets/icons/timer";
import UserEdit from "../../assets/icons/user-edit";
import useScreenWithResize from "../../hook/useScreenWithResize";

function NotificationItem({ type = "bookingSuccess" }) {
  const screenWidth = useScreenWithResize();
  const isMobile = screenWidth < 769;
  let realType = {
    title: "",
    des: "",
    icon: "",
    bgColor: "",
    textColor: "",
  };
  switch (type) {
    case "emailCheck":
      realType = {
        title: "Email",
        des: "Vui lòng kiểm tra email của bạn.",
        icon: <Email color="#FFFFFF" size="18" />,
        bgColor: "bg-senconBlue",
        textColor: "text-senconBlue",
      };
      break;
    case "timer":
      realType = {
        title: "30 phút nữa tới giờ hẹn",
        des: "Khách sạn Mường Thanh đang đợi bạn. ",
        icon: <Timer color="#FFFFFF" size="18" />,
        bgColor: "bg-success",
        textColor: "text-success",
      };
      break;
    case "profileChange":
      realType = {
        title: "Thay đổi thông tin cá nhân",
        des: "Bạn đã thay đổi thông tin thành công",
        icon: <UserEdit color="#FFFFFF" size="18" />,
        bgColor: "bg-warning",
        textColor: "text-warning",
      };
      break;
    case "passwordChange":
      realType = {
        title: "Thay đổi mật khẩu",
        des: "Bạn đã thay đổi mật khẩu thành công !!!",
        icon: <Lock color="#FFFFFF" size="18" />,
        bgColor: "bg-danger",
        textColor: "text-danger",
      };
      break;
    case "bookingSuccess":
      realType = {
        title: "Đặt phòng thành công",
        des: "Mường Thanh Hotel vào ngày 17-1-2024",
        icon: <Calendar color="#FFFFFF" size="18" />,
        bgColor: "bg-secondary",
        textColor: "text-secondary",
      };
      break;
  }

  return (
    <div className="p-4 w-full border-b border-seconGray">
      <div className="flex h-[46px] gap-[14px]">
        {!isMobile && (
          <div
            className={`${realType.bgColor} flex items-center justify-center rounded-full w-[46px] h-full`}
          >
            {realType.icon}
          </div>
        )}

        <div
          className={`flex flex-col  ${realType.textColor} justify-between overflow-hidden`}
        >
          <p className={`text-base font-medium truncate max-w-[220px]`}>
            {realType.title}
          </p>
          <span className="text-xs truncate max-w-[220px]">{realType.des}</span>
        </div>
      </div>
    </div>
  );
}

export default NotificationItem;
