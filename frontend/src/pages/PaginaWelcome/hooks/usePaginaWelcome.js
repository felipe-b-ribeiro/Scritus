import { useState } from "react";

const usePaginaWelcome = () => {
  const [menuState, setMenuState] = useState("closed");

  const openMenu = () => setMenuState("entering");

  const closeMenu = () => {
    setMenuState("leaving");
    setTimeout(() => setMenuState("closed"), 500);
  };

  return {
    menuState,
    openMenu,
    closeMenu,
  };
};

export default usePaginaWelcome;
