import { useAuth } from "../../../context/authContext";
import NotificationItem from "../../notification";

function Notification() {
  const { notificationUser } = useAuth();
  return (
    <div className="max-h-[340px] overflow-y-auto scrollbar">
      {notificationUser &&
        notificationUser.map((item) => (
          <NotificationItem obj={item} key={item.notificationId} />
        ))}
    </div>
  );
}

export default Notification;
