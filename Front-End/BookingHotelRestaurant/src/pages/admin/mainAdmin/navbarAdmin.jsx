import BookingsIcon from "../../../assets/icons/bookingsIcons";
import BuildingIcon from "../../../assets/icons/building";
import DashboardIcon from "../../../assets/icons/dashboradIcon";
import Hotel5Star from "../../../assets/icons/hotel/hotel5Star";
import ReviewIcon from "../../../assets/icons/reviewIcon";
import UserIcon from "../../../assets/icons/userIcon";
import logo from "../../../assets/img/banner.png";
import { useLocation, useNavigate } from "react-router-dom";

function NavbarAdmin() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) =>
    path === "/management"
      ? location.pathname === path
      : location.pathname.startsWith(path);

  const tabs = [
    {
      id: "dashboard",
      label: "Dashboard",
      path: "/management",
      icon: <DashboardIcon />,
    },
    {
      id: "accounts",
      label: "Tài khoản",
      path: "/management/accounts",
      icon: <UserIcon />,
    },
    {
      id: "hotels",
      label: "Khách sạn và phòng",
      path: "/management/hotels",
      icon: <Hotel5Star size="24" />,
    },
    {
      id: "bookings",
      label: "Bookings",
      path: "/management/bookings",
      icon: <BookingsIcon />,
    },
    {
      id: "reviews",
      label: "Reviews",
      path: "/management/reviews",
      icon: <ReviewIcon />,
    },
  ];
  return (
    <div className="w-[350px] h-[600px] bg-white ">
      <div className="flex flex-col pl-5 pt-14 items-start border-b">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={`px-4 py-4 flex gap-4 text-left w-full text-lg font-medium cursor-pointer h-[56px] ${
              isActive(tab.path)
                ? "border-b-2 text-primary bg-secondary bg-opacity-20 rounded-l-full shadow opacity-100"
                : "text-gray-500 hover:text-secondary hover:bg-secondGray hover:bg-opacity-50 opacity-75"
            } transition-all duration-300 ease-in-out`}
          >
            <span>{tab.icon}</span>
            <button>{tab.label}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NavbarAdmin;
