import BackButton from "../../components/BackButton/index.jsx";
import ContainerBasico from "../../components/ContainerBasico";
import Header from "../../components/Header";
import Linha from "../../components/LinhaDegrade";
import Logo from "../../components/LogoScritus";
import useTitulo from "../../hooks/useTitulo.js";
import AboutUsContent from "./components/AboutUsContent.jsx";

function PaginaSobreNos() {
  useTitulo("Sobre Nós - Scritus");

  return (
    <>
      <Header left={<BackButton />} center={<Logo to="/" />} />
      <Linha />
      <ContainerBasico text="Sobre nossa trajetória">
        <AboutUsContent />
      </ContainerBasico>
    </>
  );
}

export default PaginaSobreNos;
