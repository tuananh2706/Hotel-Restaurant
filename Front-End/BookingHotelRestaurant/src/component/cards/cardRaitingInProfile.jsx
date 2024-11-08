import MoreIcon from "../../assets/icons/moreIcon";
import Demo from "../../assets/img/banner.png";
import { useState } from "react";

function RaitingProfile() {
  const [dropdownBtn, setDropdownBtn] = useState(false);

  return (
    <div className="w-full md:w-[532px] h-[207px] p-5 rounded-xl relative bg-white">
      {/* Overlay that appears when the dropdown is open */}
      {dropdownBtn && (
        <div
          className="absolute inset-0 bg-black opacity-10 z-10 rounded-xl transition-opacity duration-200 ease-in-out"
          onClick={() => setDropdownBtn(false)}
        ></div>
      )}
      
      {/* Dropdown menu */}
      <div
        className={`absolute w-40 bg-white shadow z-10 h-10 right-5 top-9
          px-2 rounded-lg flex items-center text-danger text-xs
          transition-all duration-200 ease-in-out transform ${
            dropdownBtn ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
        style={{ transformOrigin: "top right" }}
      >
        <button className="w-full text-start hover:bg-slate-100 px-3 py-2">
          Xóa review
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-[18px] items-center relative">
          <img
            src={Demo}
            alt="avt"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col gap-2">
            <p className="text-gray-900 text-sm font-medium">Nguyễn Trung</p>
            <p className="text-sm">Raiting</p>
          </div>
          <div className="absolute right-0 top-0">
            <button onClick={() => setDropdownBtn((prev) => !prev)}>
              <MoreIcon size="20" />
            </button>
          </div>
        </div>
        <p className="text-gray-700 text-xs h-[42px]">
          Nếu bạn muốn nghỉ ngơi từ Varanasi, bạn tìm thấy một vị trí tuyệt vời
          và lòng hiếu khách trong tầng thượng này ở trung tâm của thị trấn.
          Thức ăn thực sự ngon và nhân viên thực sự tuyệt vời!
        </p>
        <div className="flex gap-2">
          <img src={Demo} className="w-[70px] h-[61px] rounded-lg object-cover" />
          <img src={Demo} className="w-[70px] h-[61px] rounded-lg object-cover" />
          <img src={Demo} className="w-[70px] h-[61px] rounded-lg object-cover" />
        </div>
      </div>
    </div>
  );
}

export default RaitingProfile;
