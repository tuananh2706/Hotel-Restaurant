import MoreIcon from "../../assets/icons/moreIcon";
import StarIcon from "../../assets/icons/starIcon";
import Demo from "../../assets/img/banner.png";
import { useState } from "react";
import { deleteReview } from "../../service/reviewService";
import Modal from "../myModal";

function RaitingProfile({ profile = true, obj, className = "", fetchData }) {
  const [dropdownBtn, setDropdownBtn] = useState(false);
  const { reviewer, reviewText, reviewDate, rating, hotelReviewId } = obj;
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteReview = async () => {
    try {
      await deleteReview(hotelReviewId);
      await fetchData();
      setOpenModal(false);
    } catch (error) {
      console.error("Đã có lỗi xảy ra", error.message);
    }
  };

  return (
    <div
      className={`w-full md:max-w-[532px] h-[160px] 
    hover:shadow-lg transition-all duration-200
    overflow-hidden p-5 rounded-xl relative bg-white ${className}`}
    >
      {/* Overlay that appears when the dropdown is open */}
      {dropdownBtn && (
        <div
          className="absolute inset-0 bg-black opacity-10 z-10 rounded-xl transition-opacity duration-200 ease-in-out"
          onClick={() => setDropdownBtn(false)}
        ></div>
      )}

      {/* Dropdown menu */}
      {profile ? (
        <div
          className={`absolute w-40 bg-white shadow z-10 h-10 right-5 top-9
          px-2 rounded-lg flex items-center text-danger text-xs
          transition-all duration-200 ease-in-out transform ${
            dropdownBtn ? "opacity-100 scale-100" : "opacity-0 scale-0"
          }`}
          style={{ transformOrigin: "top right" }}
        >
          <button
            onClick={() => setOpenModal(true)}
            className="w-full text-start hover:bg-slate-100 px-3 py-2"
          >
            Xóa review
          </button>
        </div>
      ) : null}

      {/* Main content */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-[18px] items-center relative border-b border-gray-300 pb-3">
          <img
            src={Demo}
            alt="avt"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col gap-1">
            <p className="text-gray-900 text-sm font-medium">{`${reviewer.firstName} ${reviewer.lastName}`}</p>
            <p className="text-[10px] text-gray-400 italic">{reviewDate}</p>
          </div>
          <div className="absolute right-0 top-0">
            {profile ? (
              <button onClick={() => setDropdownBtn((prev) => !prev)}>
                <MoreIcon size="20" />
              </button>
            ) : null}
          </div>
        </div>
        <p className="text-gray-700 text-xs h-[42px]">{reviewText}</p>
      </div>
      <div className="w-full flex justify-end">
        <p className="text-sm flex items-center gap-1 text-secondary">
          {rating} <StarIcon size="14" color="#007e47" />
        </p>
      </div>
      <Modal
        isOpen={openModal}
        onClose={() => setOpenModal(true)}
        title="Bạn muốn xóa đánh giá này ?"
        className={"text-secondary"}
      >
        <div className="flex justify-end gap-5">
          <button
            className="px-5 py-2 bg-seconGray rounded text-white font-medium"
            onClick={() => setOpenModal(false)}
          >
            {" "}
            Hủy{" "}
          </button>
          <button
            className="px-5 py-2 bg-danger rounded text-white font-medium"
            onClick={() => handleDeleteReview()}
          >
            {" "}
            Xác nhận{" "}
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default RaitingProfile;
