import { useState } from "react";
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

function HeaderRight() {
  const [selectedLocation, setSelectedLocation] = useState("Gò Vấp");
  const [openModalLocation, setOpenModalLocation] = useState(false);
  const [tempSelected, setTempSelected] = useState(selectedLocation);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);

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
    setTempSelected(selectedLocation); // reset Lại giá trị đã chọn trước đó.
  };

  const handleSaveLocation = () => {
    setSelectedLocation(tempSelected);
    closeLocation();
  };

  return (
    <div className="flex gap-3 shadow-sm">
      {/* Chose Location Customer */}
      <div
        className="grid grid-cols-6 w-[221px] border relative cursor-pointer rounded-lg shadow-sm
       hover:bg-slate-100 transition-colors duration-150 active:bg-slate-100 opacity-0 md:opacity-100"
      >
        <div className="flex items-center justify-center">
          <LocationIcon />
        </div>
        <div
          className="col-span-4 grid grid-rows-2 grid-cols-1"
          onClick={() => {
            openLocation();
          }}
        >
          <span className="block mt-2 text-xs text-gray-500">Vị trí</span>
          <span className="text-sm font-nomal">{`Q.${selectedLocation}, Tp.HCM`}</span>
        </div>
        <div className="absolute top-[30%] right-2">
          <ArrDownIcon />
        </div>
      </div>
      {/* Notification */}
      <Button
        className={`w-12 h-12 ${isOpen && "opacity-80"}`}
        onClick={toggleDropdown}
      >
        <NotifficationIcon color="white" width="20" height="20" />
      </Button>
      {/* User */}
      <Button
        className={`w-12 h-12 ${isOpenProfile && "opacity-80"}`}
        onClick={toggleDropdownProfile}
      >
        <UserIcon color="white" width="20" height="20" />
      </Button>

      <Modal
        isOpen={openModalLocation}
        onClose={closeLocation}
        closeBtn
        title="Vị trí của bạn"
        className="h-auto w-[650px]"
      >
        <div className="grid grid-cols-4 gap-3">
          {locationArr &&
            locationArr.map((item, index) => {
              return (
                <InputCheckItem
                  key={index}
                  name="location"
                  value={item}
                  checked={tempSelected === item}
                  content={item === "Bình Thạnh" ? `Q.${item}` : `Quận ${item}`}
                  onChange={() => {
                    setTempSelected(item);
                  }}
                />
              );
            })}
        </div>
        <div className="flex items-center justify-end mt-5 gap-2">
          <Button
            variant="secondary"
            className={"px-5 py-2"}
            onClick={handleSaveLocation}
          >
            Save
          </Button>
          <Button
            variant="outline"
            className={"px-5 py-2"}
            onClick={closeLocation}
          >
            Cancel
          </Button>
        </div>
      </Modal>
      <DropDown
        width={348}
        height={340}
        isOpen={isOpen}
        onClose={toggleDropdown}
        className={"top-[76px] right-40"}
      >
        <Notification />
      </DropDown>
      <DropDown
        width={250}
        isOpen={isOpenProfile}
        onClose={toggleDropdownProfile}
        className={"top-[76px] right-24"}
      >
        <DropDownProfile closeDropDown={toggleDropdownProfile} />
      </DropDown>
    </div>
  );
}

export default HeaderRight;
