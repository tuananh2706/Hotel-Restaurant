import NotificationItem from "../../notification";

function Notification() {
  const demo = [
    {
      status: "emailCheck",
    },
    {
      status: "timer",
    },
    {
      status: "profileChange",
    },
    {
      status: "passwordChange",
    },
    {
      status: "bookingSuccess",
    },
    {
      status: "bookingSuccess",
    },
  ];
  return (
    <div className="max-h-[340px] overflow-y-auto scrollbar">
      {demo &&
        demo.map((item, index) => (
          <NotificationItem key={index} type={item.status} />
        ))}
    </div>
  );
}

export default Notification;
