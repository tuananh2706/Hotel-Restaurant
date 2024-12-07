import { useEffect, useState } from "react";

function useScreenWithResize() {
  const [withResize, setWithResize] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWithResize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [withResize]);
  return withResize;
}

export default useScreenWithResize;
