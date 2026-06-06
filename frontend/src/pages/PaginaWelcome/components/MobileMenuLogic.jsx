import { FiMenu } from "react-icons/fi";
import BotaoSimples from "../../../components/BotaoSimples/index.jsx";
import MenuMobile from "../../../components/MenuMobile/index.jsx";
import Overlay from "../../../components/Overlay/index.jsx";
import SeparadorVertical from "../../../components/SeparadorVertical/index.jsx";
import useScreen from "../../../hooks/useScreen.js";
import usePaginaWelcome from "../hooks/usePaginaWelcome.js";

const MobileMenuLogic = () => {
  const { isPC } = useScreen();
  const { menuState, openMenu, closeMenu } = usePaginaWelcome();

  return (
    <>
      {isPC ? (
        <>
          <BotaoSimples to="/cadastro" variant="tertiary" text="Criar Conta" />
          <SeparadorVertical />
          <BotaoSimples to="/login" variant="primary" text="Fazer login" />
        </>
      ) : (
        <BotaoSimples
          onClick={menuState === "closed" ? openMenu : closeMenu}
          variant="tertiary"
          icon={<FiMenu size={25} />}
        />
      )}
      {menuState !== "closed" && (
        <>
          <MenuMobile state={menuState} closeClick={closeMenu}>
            <div>
              <BotaoSimples
                to="/cadastro"
                variant="tertiary"
                text="Criar Conta"
              />
              <BotaoSimples to="/login" variant="primary" text="Fazer Login" />
            </div>
          </MenuMobile>
          <Overlay onClick={closeMenu} state={menuState} />
        </>
      )}
    </>
  );
};

export default MobileMenuLogic;
