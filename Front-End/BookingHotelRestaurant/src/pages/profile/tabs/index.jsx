import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LogoutIcon from "../../../assets/icons/logoutIcon";
import { Outlet, Link, useLocation } from "react-router-dom";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const location = useLocation();

  const tabs = [
    { label: "Yêu thích", linkTo: "/profile" },
    { label: "Booking", linkTo: "/profile/booking" },
    { label: "Thanh toán", linkTo: "/profile/payment" },
    { label: "Đánh giá", linkTo: "/profile/review" },
    { label: "Địa chỉ đã lưu", linkTo: "/profile/addressSaved" },
  ];

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    const currentTab = tabs.findIndex((t) => t.linkTo === location.pathname);
    if (currentTab !== -1) {
      setActiveTab(currentTab);
    }
  }, [location.pathname, tabs]);

  return (
    <div className="flex gap-[30px] mt-4">
      {/* Tabs Sidebar */}
      <div className="w-[250px] px-[23px] flex flex-col items-center py-9 bg-white p-4 rounded-2xl">
        {tabs.map((tab, index) => (
          <Link
            to={tab.linkTo}
            key={index}
            className={`w-full h-[63px] flex items-center justify-center  p-2 transition-all duration-75 text-lg 
              ${
                activeTab === index
                  ? "bg-secondary bg-opacity-20 text-primary rounded-xl hover:bg-secondary font-medium hover:bg-opacity-20 hover:rounded-xl"
                  : "bg-white font-light text-gray-900 hover:bg-seconGray hover:bg-opacity-20 hover:rounded-xl"
              }`}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </Link>
        ))}
        <button
          className="mt-10 text-danger flex gap-2 items-center justify-center w-full
         hover:opacity-80  transition-all duration-50"
        >
          <LogoutIcon color="#C5270E" size="20" />
          Đăng xuất
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-grow">
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
};

export default Tabs;
