import ContainerPrincipal from "../../components/ContainerBasico";
import Header from "../../components/Header";
import Linha from "../../components/LinhaDegrade";
import Logo from "../../components/LogoScritus";
import useTitulo from "../../hooks/useTitulo.js";
import Content404 from "./components/404Content";

function Pagina404() {
  useTitulo("Não encontrado - Scritus");

  return (
    <>
      <Header center={<Logo reload />} />
      <Linha />
      <ContainerPrincipal text="404" width="70vw">
        <Content404 />
      </ContainerPrincipal>
    </>
  );
}

export default Pagina404;
