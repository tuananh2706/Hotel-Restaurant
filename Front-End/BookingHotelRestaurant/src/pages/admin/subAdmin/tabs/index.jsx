import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoutIcon from "../../../../assets/icons/logoutIcon";
import { Outlet, Link, useLocation } from "react-router-dom";
import MenuIcon from "../../../../assets/icons/menuIcon";
import useScreenWithResize from "../../../../hook/useScreenWithResize";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const screenWidth = useScreenWithResize();
  const isMobile = screenWidth <= 768;
  const isTablet = screenWidth > 768 && screenWidth <= 1024;
  const location = useLocation();

  const tabs = [
    { label: "Dashboard", linkTo: "/ownerManagement" },
    { label: "QL Khách sạn", linkTo: "/ownerManagement/hotels" },
    { label: "QL Booking", linkTo: "/ownerManagement/booking" },
    { label: "Thông tin cá nhân", linkTo: "/ownerManagement/infomation" },
    {
      label: "Thay đổi thông tin cá nhân",
      linkTo: "/ownerManagement/infomation",
      forRenpon: true,
    },
    {
      label: "Đổi mật khẩu",
      linkTo: "/ownerManagement/changlePassword",
      forRenpon: true,
    },
  ];

  const desktopTabs = tabs.filter((tab) => !tab.forRenpon);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Set active tab based on URL
  useEffect(() => {
    const currentTab = tabs.findIndex((t) => t.linkTo === location.pathname);
    if (currentTab !== -1) {
      setActiveTab(currentTab);
    }
  }, [location.pathname, tabs]);

  return (
    <div className="flex gap-4 mt-4">
      {/* Sidebar or Menu Button */}
      {isMobile || isTablet ? (
        <div className="fixed top-24 right-3 z-50">
          {/* Menu Button for Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-3 bg-secondary rounded-xl"
          >
            <MenuIcon />
          </button>
          <AnimatePresence>
            {menuOpen && (
              <div
                className={`fixed inset-0 bg-black bg-opacity-30 transition-opacity
                  ${
                    menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                  } duration-100 z-40`}
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <motion.div
                  initial={{ opacity: 0, x: "50%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "50%" }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="fixed top-0 right-0 w-2/3 md:w-1/3 h-full bg-white p-6 flex flex-col items-center shadow-lg z-40"
                >
                  {tabs.map((tab, index) => (
                    <Link
                      to={tab.linkTo}
                      key={index}
                      className={`w-full my-2 py-3 text-center text-lg rounded-lg transition-all duration-75 
                        ${
                          activeTab === index
                            ? "bg-secondary bg-opacity-30 text-primary font-medium"
                            : "text-primary hover:bg-seconGray"
                        }
                      `}
                      onClick={() => {
                        setActiveTab(index);
                        setMenuOpen(false); // Close menu on click
                      }}
                    >
                      {tab.label}
                    </Link>
                  ))}
                  <button className="mt-10 text-danger flex gap-2 items-center w-full justify-center hover:opacity-80 transition-all duration-50">
                    <LogoutIcon color="#C5270E" size="20" />
                    Đăng xuất
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        // Sidebar for Desktop
        <div className="w-[250px] px-6 flex flex-col items-center py-9 bg-white rounded-2xl">
          {desktopTabs.map((tab, index) => (
            <Link
              to={tab.linkTo}
              key={index}
              className={`w-full h-[63px] flex items-center justify-center p-2 transition-all duration-75 text-lg 
                ${
                  activeTab === index
                    ? "bg-secondary bg-opacity-20 text-primary rounded-xl font-medium hover:bg-opacity-20"
                    : "bg-white font-light text-gray-900 hover:bg-seconGray hover:bg-opacity-20"
                }`}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </Link>
          ))}
          <button className="mt-10 text-danger flex gap-2 items-center justify-center w-full hover:opacity-80 transition-all duration-50">
            <LogoutIcon color="#C5270E" size="20" />
            Đăng xuất
          </button>
        </div>
      )}

      {/* Tab Content */}
      <div className="flex-grow">
        <motion.div
          className="h-auto lg:h-[600px] ml-5"
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
