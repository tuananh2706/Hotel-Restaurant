import React, { useEffect, useState } from "react";
import StarIcon from "../assets/icons/starIcon"; // Đảm bảo đường dẫn đúng

const StarRating = ({ onChange, reset = false, toggle }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (reset) {
      setRating(0);
      setHoverRating(0);
      toggle(false);
    }
  }, [reset]);

  // Hàm xử lý click vào sao
  const handleClick = (value) => {
    setRating(value);
    onChange(value);
  };

  // Hàm xử lý khi hover vào sao
  const handleMouseEnter = (value) => {
    setHoverRating(value);
  };

  // Hàm xử lý khi bỏ hover
  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <div
          key={star}
          onClick={() => handleClick(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={handleMouseLeave}
        >
          <StarIcon
            color="#007e47"
            size="50"
            outline={rating < star}
            fill={hoverRating >= star || rating >= star ? "#007e47" : "none"}
          />
        </div>
      ))}
    </div>
  );
};

export default StarRating;
