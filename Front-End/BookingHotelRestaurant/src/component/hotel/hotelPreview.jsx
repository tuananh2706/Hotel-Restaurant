// import LocationIcon from "../../assets/icons/locationIcon";
// import ServiceIcon from "../../assets/icons/service";
// import Hotel5Star from "../../assets/icons/hotel/hotel5Star";
// import Hotel4Star from "../../assets/icons/hotel/hotel4Star";
// import Hotel3Star from "../../assets/icons/hotel/hotel3Star";
// import Hotel2Star from "../../assets/icons/hotel/hotel2Star";
// import Hotel1Star from "../../assets/icons/hotel/hotel1Star";

// function HotelPreview({ title, location, thumbnail, category }) {
//   let icons;
//   switch (category) {
//     case "1 sao":
//       icons = <Hotel1Star size="16" />;
//       break;
//     case "2 sao":
//       icons = <Hotel2Star size="16" />;
//       break;
//     case "3 sao":
//       icons = <Hotel3Star size="16" />;
//       break;
//     case "4 sao":
//       icons = <Hotel4Star size="16" />;
//       break;
//     case "5 sao":
//       icons = <Hotel5Star size="16" />;
//       break;
//   }

//   return (
//     <div className="w-full max-w-[528px] p-4 bg-white rounded-xl shadow-sm flex gap-4 sm:gap-6 items-center">
//       <img
//         src={thumbnail}
//         alt={title}
//         className="w-[64px] h-[64px] sm:w-[80px] sm:h-[80px] rounded-xl object-cover"
//       />
//       <div className="flex flex-col w-full gap-2 sm:gap-4">
//         <div className="flex justify-between items-center">
//           <h5 className="text-[18px] sm:text-[22px] text-primary font-medium">{title}</h5>
//           <button className="text-danger font-medium text-xs sm:text-sm hover:opacity-80 active:translate-y-[2px] transition-all duration-100">
//             Xóa
//           </button>
//         </div>
//         <div className="flex flex-wrap gap-4 sm:gap-8 text-primary items-center">
//           <div className="flex gap-2 items-center">
//             <LocationIcon size="16" color="#004225" />
//             <span className="text-xs sm:text-sm">{location}</span>
//           </div>
//           <a className="flex gap-2 items-center cursor-pointer hover:opacity-80 active:translate-y-[2px] transition-all duration-100">
//             <ServiceIcon size="16" />
//             <span className="text-xs sm:text-sm">Xem dịch vụ</span>
//           </a>
//           <div className="flex gap-2 items-center">
//             {icons}
//             <span className="text-xs sm:text-sm">{category}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default HotelPreview;

import LocationIcon from "../../assets/icons/locationIcon";
import ServiceIcon from "../../assets/icons/service";
import Hotel5Star from "../../assets/icons/hotel/hotel5Star";
import Hotel4Star from "../../assets/icons/hotel/hotel4Star";
import Hotel3Star from "../../assets/icons/hotel/hotel3Star";
import Hotel2Star from "../../assets/icons/hotel/hotel2Star";
import Hotel1Star from "../../assets/icons/hotel/hotel1Star";

function HotelPreview({ title, localtion, thumbnail, category }) {
  let icons;
  switch (category) {
    case "1 sao":
      icons = <Hotel1Star size="16" />;
      break;
    case "2 sao":
      icons = <Hotel2Star size="16" />;
      break;
    case "3 sao":
      icons = <Hotel3Star size="16" />;
      break;
    case "4 sao":
      icons = <Hotel4Star size="16" />;
      break;
    case "5 sao":
      icons = <Hotel5Star size="16" />;
      break;
  }

  return (
    <div className="w-full lg:w-[528px] max-h-[112px] p-4 bg-white rounded-xl shadow-sm flex gap-6">
      <img
        src={thumbnail}
        className="w-[80px] h-[80] rounded-xl object-cover"
      />
      <div className="w-full flex gap-6 flex-col">
        <div className="flex justify-between">
          <h5 className="text-[22px] text-primary font-medium">{title}</h5>
          <button
            className="text-danger font-medium text-sm hover:opacity-80
           active:translate-y-[2px] transition-all duration-100"
          >
            Xóa
          </button>
        </div>
        <div className="flex text-xs justify-between lg:text-base lg:gap-8 text-primary">
          <div className="flex gap-2 items-center">
            <LocationIcon size="16" color="#004225" />
            <span>{localtion}</span>
          </div>
          <a
            className="flex gap-2 items-center cursor-pointer hover:opacity-80 
          active:translate-y-[2px] transition-all duration-100 "
          >
            <ServiceIcon size="16" />
            <span>Xem dịch vụ</span>
          </a>
          <div className="flex gap-2 items-center">
            {icons}
            <span>{category}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HotelPreview;
