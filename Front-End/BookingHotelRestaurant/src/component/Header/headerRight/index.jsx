import { useState } from "react";
import Button from "../../myButton";
import Modal from "../../myModal";
import UserIcon from "../../../assets/icons/userIcon";
import NotifficationIcon from "../../../assets/icons/notiffication";
import LocationIcon from "../../../assets/icons/locationIcon";
import ArrDownIcon from "../../../assets/icons/arrowDownIcon";
import InputCheckItem from "../../inputCheckItem";

function HeaderRight() {
  const [selectedLocation, setSelectedLocation] = useState("Q.Gò Vấp");
  const [openModalLocation, setOpenModalLocation] = useState(false);
  const [tempSelected, setTempSelected] = useState(selectedLocation);

  const locationArr = [
    "Q.Gò Vấp",
    "Quận 1",
    "Quận 2",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 9",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Q.Bình Thạnh",
    "Quận Tân Phú",
    "Quận Tân Bình",
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
       hover:bg-slate-100 transition-colors duration-150 active:bg-slate-100"
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
          <span className="text-sm font-nomal">{`${selectedLocation}, Tp.HCM`}</span>
        </div>
        <div className="absolute top-[30%] right-2">
          <ArrDownIcon />
        </div>
      </div>
      {/* Notification */}
      <Button className="w-12 h-12">
        <NotifficationIcon color="white" width="20" height="20" />
      </Button>
      {/* User */}
      <Button className="w-12 h-12">
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
                  content={item}
                  onChange={() => {
                    setTempSelected(item);
                  }}
                />
              );
            })}
        </div>
        <div className="flex items-center justify-end mt-5 gap-2">
          <Button variant="secondary" className={"px-5 py-2"} onClick={handleSaveLocation}>
            Save
          </Button>
          <Button variant="outline" className={"px-5 py-2"} onClick={closeLocation}>
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default HeaderRight;
