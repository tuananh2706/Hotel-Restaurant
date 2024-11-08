import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import ArrowUpIcon from "../assets/icons/arrowUpIcon";

function BackToTop() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (lastest) => {
    setIsVisible(lastest > 400);
  });

  const handleOnTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" }); //behavior: smooth làm cho lúc cuộn mượt mà hơn
  };

  return (
    isVisible && (
      <button
        onClick={handleOnTop}
        className="fixed bottom-10 right-5 lg:right-7 h-10 w-10 rounded-full p-2 bg-seconGray
         lg:opacity-20 lg:hover:opacity-100 active:opacity-50 transition-opacity duration-300"
      >
        <ArrowUpIcon />
      </button>
    )
  );
}

export default BackToTop;
