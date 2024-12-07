import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import demo from "../../assets/img/bannerLogin.jpg";
import Modal from "../myModal";
import HotelsDisabled from "../../assets/icons/hotelsDisabled";

function HotelManagementItem({ hotel, onClick }) {
  const { hotelName, isActive, address, description } = hotel;

  return (
    <div
      onClick={onClick}
      className={`w-auto p-3 relative bg-white rounded shadow group 
        hover:shadow-md transition-shadow duration-200 ${
          !isActive ? "pointer-events-none" : "cursor-pointer"
        }`}
    >
      <div className="relative overflow-hidden">
        <div className="w-full h-[250px] flex items-center justify-center">
          <img
            src={demo}
            className="w-full h-auto rounded object-cover
             transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>
      <div className="p-4 w-full">
        <h5 className="text-lg text-center uppercase max-w-[209px] overflow-hidden whitespace-nowrap text-ellipsis text-primary">
          {hotelName}
        </h5>
        <div className="flex flex-col mt-3 gap-3">
          <div className="w-[200px] overflow-hidden whitespace-nowrap text-ellipsis text-secondary">
            {address}
          </div>

          <div className="w-[209px] overflow-hidden line-clamp-2 text-secondary">
            {description}
          </div>
        </div>
      </div>
      {!isActive && (
        <div className="absolute rounded inset-0 bg-gray-500 opacity-50 flex items-center justify-center">
          <HotelsDisabled color="#c5c5c5" size="200" />
        </div>
      )}
    </div>
  );
}

export default HotelManagementItem;
