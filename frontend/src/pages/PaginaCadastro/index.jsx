import BackButton from "../../components/BackButton";
import Header from "../../components/Header";
import Linha from "../../components/LinhaDegrade";
import Logo from "../../components/LogoScritus";
import useTitulo from "../../hooks/useTitulo.js";
import ContainerCards from "./components/ContainerCards";

const PaginaCadastro = () => {
  useTitulo("Cadastre-se - Scritus");
  return (
    <>
      <Header left={<BackButton />} center={<Logo to="/" />} />
      <Linha />
      <ContainerCards />
    </>
  );
};

export default PaginaCadastro;
