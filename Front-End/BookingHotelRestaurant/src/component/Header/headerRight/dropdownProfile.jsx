import { Link, useNavigate } from "react-router-dom";
import Demo from "../../../assets/img/disscount/demo1.jpg";
import UserIcon from "../../../assets/icons/userIcon";
import ReviewIcon from "../../../assets/icons/reviewIcon";
import KeyIcon from "../../../assets/icons/key";
import LogoutIcon from "../../../assets/icons/logoutIcon";
import { useAuth } from "../../../context/authContext";
import { useEffect, useState } from "react";

function DropDownProfile({ closeDropDown }) {
  const [handleUser, setHandleUser] = useState({
    avatarUrl: Demo,
    accountName: "",
    role: "",
  });
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setHandleUser({
        accountName: user.accountName,
        avatarUrl: user.avatarUrl ? user.avatarUrl : Demo,
        role: user.role,
      });
    }
  }, [user]);
  const handleLogout = () => {
    logOut();
    navigate("/login");
    closeDropDown();
  };

  const listItem = [
    { icon: <UserIcon />, link: "/profile", title: "Profile" },
    { icon: <UserIcon />, link: "/profile/booking", title: "Booking" },
    { icon: <ReviewIcon />, link: "/profile/review", title: "Đánh giá" },
    { icon: <KeyIcon />, link: "", title: "Đổi mật khẩu" },
  ];
  return (
    <div className="flex flex-col gap-1 px-1 py-2">
      <div
        onClick={() => {
          navigate("/profile");
          closeDropDown();
        }}
        className="flex gap-5 items-center p-4 border-b cursor-pointer hover:bg-seconGray hover:bg-opacity-20 hover:rounded transition-colors duration-100"
      >
        <img
          src={handleUser.avatarUrl}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <p className="text-base text-primary uppercase">
            {handleUser.accountName}
          </p>
          <p className="text-seconGray uppercase">{handleUser.role}</p>
        </div>
      </div>
      <div onClick={closeDropDown} className="flex flex-col gap-1 border-b">
        {listItem &&
          listItem.map((item, index) => (
            <Link
              to={item.link}
              key={index}
              className="flex gap-3 items-center px-3 py-2 rounded  text-primary transition-colors duration-100 hover:bg-seconGray hover:bg-opacity-20 hover:text-secondary"
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
      </div>
      <button
        onClick={handleLogout}
        className="px-3 py-2 text-danger flex gap-2 items-center justify-center rounded hover:bg-seconGray hover:bg-opacity-20 transition-colors duration-100 hover:text-[#e86e5b]"
      >
        {" "}
        <LogoutIcon color="#C5270E" />
        Đăng xuất
      </button>
    </div>
  );
}

export default DropDownProfile;
