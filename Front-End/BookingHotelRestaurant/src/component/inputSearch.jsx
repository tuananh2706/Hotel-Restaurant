import { useState } from "react";
import SearchIcon from "../assets/icons/searchIcon";

function Input({ iconBefore, onClick, className, ...rest }) {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div className={`relative flex items-center ${className}`}>
      <input
        {...rest}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        className={`border border-seconGray focus:border-2  w-[100%] h-[100%] pr-4 py-3 text-sm text-secondary rounded-lg outline-none focus:border-secondary ${
          iconBefore ? "pl-[50px]" : "pl-4"
        } `}
      />
      <button
        onClick={() => {
          onClick && onClick();
        }}
        className={`absolute top-[35%] ${iconBefore ? "left-4" : "right-4"}`}
      >
        {isFocus !== undefined && (
          <SearchIcon color={isFocus ? "#007E47" : "#C5C5C5"} />
        )}
      </button>
    </div>
  );
}

export default Input;
