import BackButton from "../../components/BackButton";
import ContainerBasico from "../../components/ContainerBasico";
import Header from "../../components/Header";
import Linha from "../../components/LinhaDegrade";
import Logo from "../../components/LogoScritus";
import useTitulo from "../../hooks/useTitulo";
import FormLogin from "./components/FormLogin";

const PaginaLogin = () => {
  useTitulo("Fazer Login - Scritus");

  return (
    <>
      <Header left={<BackButton />} center={<Logo to="/" />} />
      <Linha />
      <ContainerBasico width="32vw" text="Fazer Login">
        <FormLogin />
      </ContainerBasico>
    </>
  );
};

export default PaginaLogin;
