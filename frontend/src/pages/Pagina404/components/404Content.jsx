import { MdArrowBack } from "react-icons/md";
import img404 from "../../../assets/404.svg";
import BotaoSimples from "../../../components/BotaoSimples";
import useScreen from "../../../hooks/useScreen.js";

const Content404 = () => {
  const { isMobile, isTablet } = useScreen();

  return (
    <>
      <img
        width={isMobile || isTablet ? "100%" : "50%"}
        src={img404}
        alt="404 - Não Encontrado"
      />
      <BotaoSimples
        className={"m-10"}
        variant="secondary"
        text="Voltar"
        back
        withMobileText
        icon={<MdArrowBack color={"var(--cor-secundaria)"} size={25} />}
      />
    </>
  );
};

export default Content404;
