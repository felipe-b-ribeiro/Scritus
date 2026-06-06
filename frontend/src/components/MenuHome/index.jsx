import { BiBookHeart } from "react-icons/bi";
import { GoBookmarkFill } from "react-icons/go";
import { LuBookPlus } from "react-icons/lu";
import { RiBookShelfFill } from "react-icons/ri";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import useScreen from "../../hooks/useScreen";
import { SC_WrapperMenuHome } from "./styles";

const Index = ({ tipoUsuario }) => {
  const { isMobile } = useScreen();
  const { goTo } = useNavigateCustom();
  return (
    <>
      {!isMobile && (
        <SC_WrapperMenuHome>
          {tipoUsuario === "Autor" && (
            <>
              <button type="button" onClick={() => goTo("/cadastrar-obra")}>
                <LuBookPlus size={30} />
              </button>
              <button type="button" onClick={() => goTo("/minhas-obras")}>
                <RiBookShelfFill size={30} />
              </button>
            </>
          )}
          <button type="button" onClick={() => goTo("/meus-salvos")}>
            <GoBookmarkFill size={30} />
          </button>
          <button type="button" onClick={() => goTo("/minhas-curtidas")}>
            <BiBookHeart size={30} />
          </button>
        </SC_WrapperMenuHome>
      )}
    </>
  );
};

export default Index;
