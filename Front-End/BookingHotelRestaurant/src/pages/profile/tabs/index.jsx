import React, { useState } from "react";
import { motion } from "framer-motion";
import Favourite from "./favourite";
import Booking from "./booking";
import Payment from "./payment";
import ReviewRaiting from "./reviewRaiting";
import SavedAddress from "./savedAddress";
import LogoutIcon from "../../../assets/icons/logoutIcon";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Yêu thích", content: <Favourite /> },
    { label: "Booking", content: <Booking /> },
    { label: "Thanh toán", content: <Payment /> },
    { label: "Đánh giá", content: <ReviewRaiting /> },
    { label: "Địa chỉ đã lưu", content: <SavedAddress /> },
  ];

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <div className="flex gap-[30px] mt-4">
      {/* Tabs Sidebar */}
      <div className="w-[250px] px-[23px] flex flex-col items-center py-9 bg-white p-4 rounded-2xl">
        {tabs.map((tab, index) => (
          <button
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
          </button>
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
          {tabs[activeTab].content}
        </motion.div>
      </div>
    </div>
  );
};

export default Tabs;
