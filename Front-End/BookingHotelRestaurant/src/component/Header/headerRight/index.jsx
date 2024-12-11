import { useEffect, useState } from "react";
import Button from "../../myButton";
import Modal from "../../myModal";
import UserIcon from "../../../assets/icons/userIcon";
import NotifficationIcon from "../../../assets/icons/notiffication";
import LocationIcon from "../../../assets/icons/locationIcon";
import ArrDownIcon from "../../../assets/icons/arrowDownIcon";
import InputCheckItem from "../../inputCheckItem";
import DropDown from "../../cards/dropdown";
import Notification from "./notification";
import DropDownProfile from "./dropdownProfile";
import HaveNotAccount from "./haveNotAccount";
import useScreenWithResize from "../../../hook/useScreenWithResize";
import { useAuth } from "../../../context/authContext";
import { markAllRead } from "../../../service/notificationsService";

function HeaderRight() {
  const [selectedLocation, setSelectedLocation] = useState("Gò Vấp");
  const [openModalLocation, setOpenModalLocation] = useState(false);
  const [tempSelected, setTempSelected] = useState(selectedLocation);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const screenWidth = useScreenWithResize();
  const isMobile = screenWidth < 769;
  const {
    isHavedAccount,
    totalNotifications,
    setTotalNotifications,
    fetchNotifications,
  } = useAuth();

  useEffect(() => {
    if (!isHavedAccount) {
      setTotalNotifications(0);
    }
  }, [isHavedAccount]);

  const handleReadAll = async () => {
    if (isHavedAccount) {
      const accessToken = localStorage.getItem("AT");
      await markAllRead(accessToken);
      await fetchNotifications(accessToken);
    }
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };
  const toggleDropdownProfile = () => {
    setIsOpenProfile((prev) => !prev);
  };

  const locationArr = [
    "Gò Vấp",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "Bình Thạnh",
    "Tân Phú",
    "Tân Bình",
  ];

  const openLocation = () => {
    setOpenModalLocation(true);
    setTempSelected(selectedLocation);
  };

  const closeLocation = () => {
    setOpenModalLocation(false);
    setTempSelected(selectedLocation);
  };

  const handleSaveLocation = () => {
    setSelectedLocation(tempSelected);
    closeLocation();
  };

  return (
    <div className="flex gap-3">
      {/* Location Select */}
      <div
        className="hidden md:flex w-[221px] border rounded-lg shadow-sm cursor-pointer 
          hover:bg-slate-100 transition-colors duration-150"
        onClick={openLocation}
      >
        <div className="flex items-center justify-center px-2">
          <LocationIcon />
        </div>
        <div className="flex-grow grid grid-rows-2 py-1">
          <span className="text-xs text-gray-500">Vị trí</span>
          <span className="text-sm font-normal">{`Q.${selectedLocation}, Tp.HCM`}</span>
        </div>
        <span className="self-center pr-2">
          <ArrDownIcon />
        </span>
      </div>

      {/* Notification Button */}
      <Button
        className={`w-12 h-12 ${isOpen && "opacity-80"} relative`}
        onClick={handleReadAll}
      >
        <NotifficationIcon color="white" width="20" height="20" />
        <span
          className={`text-xs absolute top-2 ${
            totalNotifications > 0 ? "opacity-100" : "opacity-0"
          } text-white w-4 h-4 rounded-full bg-danger right-2`}
        >
          {totalNotifications}
        </span>
      </Button>

      {/* User Profile Button */}
      <Button
        className={`w-12 h-12 ${isOpenProfile && "opacity-80"}`}
        onClick={toggleDropdownProfile}
      >
        <UserIcon color="white" width="20" height="20" />
      </Button>

      {/* Location Modal */}
      <Modal
        isOpen={openModalLocation}
        onClose={closeLocation}
        closeBtn
        title="Vị trí của bạn"
        className="w-[650px]"
      >
        <div className="grid grid-cols-4 gap-3">
          {locationArr.map((item, index) => (
            <InputCheckItem
              key={index}
              name="location"
              value={item}
              checked={tempSelected === item}
              content={item === "Bình Thạnh" ? `Q.${item}` : `Quận ${item}`}
              onChange={() => setTempSelected(item)}
            />
          ))}
        </div>
        <div className="flex items-center justify-end mt-5 gap-2">
          <Button
            variant="secondary"
            className="px-5 py-2"
            onClick={handleSaveLocation}
          >
            Save
          </Button>
          <Button
            variant="outline"
            className="px-5 py-2"
            onClick={closeLocation}
          >
            Cancel
          </Button>
        </div>
      </Modal>

      {/* Notification Dropdown */}
      <DropDown
        width={isMobile ? 250 : 348}
        height={340}
        isOpen={isOpen}
        onClose={toggleDropdown}
        className="top-[76px] right-20 md:right-28 lg:right-40"
      >
        {isHavedAccount ? (
          <Notification />
        ) : (
          <HaveNotAccount closeDropdown={toggleDropdown} />
        )}
      </DropDown>

      {/* Profile Dropdown */}
      <DropDown
        width={250}
        height={315}
        isOpen={isOpenProfile}
        onClose={toggleDropdownProfile}
        className="top-[76px] right-5 md:right-14 lg:right-24"
      >
        {isHavedAccount ? (
          <DropDownProfile closeDropDown={toggleDropdownProfile} />
        ) : (
          <HaveNotAccount closeDropdown={toggleDropdownProfile} />
        )}
      </DropDown>
    </div>
  );
}

export default HeaderRight;
