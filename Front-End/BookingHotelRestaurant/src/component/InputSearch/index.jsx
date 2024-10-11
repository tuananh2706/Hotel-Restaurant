import { useState } from "react";
import SearchIcon from "../../assets/icons/searchIcon";

function Input({ iconBefore = true, onClick, className, ...rest }) {
  const [isFocus, setIsFocus] = useState(false);
  let positionIcon = "";
  let realClass = "";
  if (iconBefore) {
    positionIcon = "left-4";
    realClass = "pl-[50px]";
  } else {
    positionIcon = " right-4";
    realClass = "pl-4";
  }

  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        {...rest}
        className={`border border-[#C5C5C5] focus:border-2  w-[100%] h-[100%] pr-4 py-3 text-sm text-[#007E47] rounded-lg outline-none focus:border-[#007E47] ${realClass} `}
      />
      <button
        onClick={() => {
          onClick && onClick();
        }}
        className={`absolute top-[35%] ${positionIcon}`}
      >
        <SearchIcon color={isFocus ? "#007E47" : "#C5C5C5"} />
      </button>
    </div>
  );
}

export default Input;
