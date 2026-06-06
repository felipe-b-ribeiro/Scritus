import { useEffect, useState } from "react";

function useScreen(delay = 150) {
  const [screenType, setScreenType] = useState({
    isMobile: false,
    isTablet: false,
    isPC: false,
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeout = null;

    const handleResize = () => {
      if (timeout) clearTimeout(timeout);

      timeout = setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        setScreenType({
          isMobile: width < 768,
          isTablet: width >= 768 && width <= 1024,
          isPC: width > 1024,
          width,
          height,
        });
      }, delay);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      if (timeout) clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [delay]);

  return screenType;
}

export default useScreen;
