import { FiMenu } from "react-icons/fi";
import BotaoLogout from "../../../components/BotaoLogout";
import BotaoSimples from "../../../components/BotaoSimples";
import Header from "../../../components/Header";
import Logo from "../../../components/LogoScritus";
import SeparadorVertical from "../../../components/SeparadorVertical";
import TagTipoUsuario from "../../../components/TagTipoUsuario";
import TextoBemVindo from "../../../components/TextoBemVindo";
import useScreen from "../../../hooks/useScreen";

const HeaderHome = ({ foto, name, userType, btnSair, openMenu }) => {
  const { isMobile } = useScreen();

  return (
    <Header
      left={<TextoBemVindo src={foto} usuario={name.split(" ")[0] || name} />}
      center={<Logo reload />}
      right={
        isMobile ? (
          <BotaoSimples
            onClick={openMenu}
            variant="tertiary"
            icon={<FiMenu size={25} />}
          />
        ) : (
          <>
            <TagTipoUsuario tipo={userType} />
            <SeparadorVertical />
            <BotaoLogout onClick={btnSair} />
          </>
        )
      }
    />
  );
};

export default HeaderHome;
