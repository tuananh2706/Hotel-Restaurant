import Button from "../../Button";
import UserIcon from "../../../assets/icons/userIcon";
import NotifficationIcon from "../../../assets/icons/notiffication";
import LocationIcon from "../../../assets/icons/locationIcon";
import ArrDownIcon from "../../../assets/icons/arrowDownIcon";
import { useState } from "react";

function HeaderRight() {
  const [selectedLocation, setSelectedLocation] = useState("Q.Gò Vấp, Tp.HCM");

  return (
    <div className="flex gap-3 shadow-sm">
      <div className="grid grid-cols-6 w-[221px] border relative cursor-pointer rounded-lg shadow-sm">
        <div className="flex items-center justify-center">
          <LocationIcon />
        </div>
        <div className="col-span-4 grid grid-rows-2 grid-cols-1">
          <span className="block mt-2 text-xs text-gray-500">Vị trí</span>
          <span className="text-sm font-nomal">{selectedLocation}</span>
        </div>
        <div className="absolute top-[30%] right-2">
          <ArrDownIcon />
        </div>
      </div>
      <Button className="w-12 h-12">
        <NotifficationIcon color="white" width="20" height="20" />
      </Button>
      <Button className="w-12 h-12">
        <UserIcon color="white" width="20" height="20" />
      </Button>
    </div>
  );
}

export default HeaderRight;
