import { useEffect, useState } from "react";
import Email from "../../assets/icons/email";
import Lock from "../../assets/icons/lock";
import Calendar from "../../assets/icons/time";
import Timer from "../../assets/icons/timer";
import UserEdit from "../../assets/icons/user-edit";
import useScreenWithResize from "../../hook/useScreenWithResize";

function NotificationItem({ obj }) {
  const screenWidth = useScreenWithResize();
  const isMobile = screenWidth < 769;
  const { createdAt, isRead, message, notificationType, title } = obj;

  const [realType, setRealType] = useState({
    title: "",
    des: "",
    createdAt: "",
    icon: "",
    bgColor: "",
    textColor: "",
  });

  const [prevNotificationType, setPrevNotificationType] = useState(null);

  useEffect(() => {
    // Chỉ cập nhật realType khi notificationType thay đổi
    if (notificationType !== prevNotificationType) {
      setPrevNotificationType(notificationType); // Cập nhật prevNotificationType

      let newRealType = { ...realType };

      switch (notificationType) {
        case "Welcome":
          newRealType = {
            ...newRealType,
            icon: <Email color="#FFFFFF" size="18" />,
            bgColor: "bg-senconBlue",
            textColor: "text-senconBlue",
          };
          break;
        case "HotelCreated":
          newRealType = {
            ...newRealType,
            icon: <Timer color="#FFFFFF" size="18" />,
            bgColor: "bg-success",
            textColor: "text-success",
          };
          break;
        case "change":
          newRealType = {
            ...newRealType,
            icon: <UserEdit color="#FFFFFF" size="18" />,
            bgColor: "bg-warning",
            textColor: "text-warning",
          };
          break;
        case "changePassword":
          newRealType = {
            ...newRealType,
            icon: <Lock color="#FFFFFF" size="18" />,
            bgColor: "bg-danger",
            textColor: "text-danger",
          };
          break;
        case "HotelPendingApproval":
          newRealType = {
            ...newRealType,
            icon: <Calendar color="#FFFFFF" size="18" />,
            bgColor: "bg-secondary",
            textColor: "text-secondary",
          };
          break;
        default:
          break;
      }

      // Cập nhật state nếu có sự thay đổi trong realType
      if (
        newRealType.icon !== realType.icon ||
        newRealType.bgColor !== realType.bgColor ||
        newRealType.textColor !== realType.textColor
      ) {
        setRealType(newRealType);
      }
    }
  }, [notificationType, prevNotificationType, realType]); // Chỉ chạy khi notificationType thay đổi

  useEffect(() => {
    if (obj) {
      setRealType((prevState) => ({
        ...prevState,
        title: title,
        des: message,
        createdAt: createdAt,
      }));
    }
  }, [obj, title, message, createdAt]);

  return (
    <div
      className={`p-4 w-full border-b border-seconGray ${
        isRead ? "" : "bg-senconBlue bg-opacity-5"
      } rounded-xl`}
    >
      <div className="flex h-[46px] gap-[14px] ">
        {!isMobile && (
          <div
            className={`${realType.bgColor} flex items-center justify-center rounded-full w-[46px] h-full`}
          >
            {realType.icon}
          </div>
        )}

        <div
          className={`flex flex-col ${realType.textColor} justify-between overflow-hidden`}
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
