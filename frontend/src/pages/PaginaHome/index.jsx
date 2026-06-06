import BotaoSimples from "../../components/BotaoSimples/index.jsx";
import ContainerHome from "../../components/ContainerHome/index.jsx";
import Linha from "../../components/LinhaDegrade/index.jsx";
import LogoutModal from "../../components/LogoutModal/index.jsx";
import MenuHome from "../../components/MenuHome";
import MenuMobile from "../../components/MenuMobile/index.jsx";
import Overlay from "../../components/Overlay/index.jsx";
import { PHRASE } from "../../constants/systemConstants.js";
import useTitulo from "../../hooks/useTitulo.js";
import PaginaSplash from "../PaginaSplash/index.jsx";
import HeaderHome from "./components/HeaderHome.jsx";
import HomeContent from "./components/HomeContent.jsx";
import useHomepage from "./hooks/useHomepage.js";

function PaginaHome() {
  const {
    btnSair,
    sairConfirm,
    sairCancel,
    overlayState,
    overlayAction,
    logoutModalState,
    menuState,
    openMenu,
    closeMenu,
    obras,
    usuario,
    loading,
    foto,
  } = useHomepage();

  useTitulo(`Scritus - ${PHRASE || "A rede social literária"}`);

  if (loading) return <PaginaSplash />;

  return (
    <>
      {overlayState !== "closed" && (
        <Overlay state={overlayState} onClick={overlayAction} />
      )}
      {logoutModalState !== "closed" && (
        <LogoutModal
          confirmClick={sairConfirm}
          cancelClick={sairCancel}
          state={logoutModalState}
        />
      )}
      {menuState !== "closed" && (
        <MenuMobile
          className="justify-between"
          state={menuState}
          closeClick={closeMenu}
        >
          <div>
            <BotaoSimples variant="cancel2" text="Sair" onClick={btnSair} />
          </div>
        </MenuMobile>
      )}

      <HeaderHome
        foto={foto}
        name={usuario.nome}
        userType={usuario.tipoUsuario}
        btnSair={btnSair}
        openMenu={openMenu}
      />
      <Linha />
      <MenuHome tipoUsuario={usuario.tipoUsuario} />
      <ContainerHome>
        <HomeContent obras={obras} />
      </ContainerHome>
    </>
  );
}

export default PaginaHome;
