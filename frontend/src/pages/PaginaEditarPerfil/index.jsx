import BackButton from "../../components/BackButton";
import ContainerBasico from "../../components/ContainerBasico";
import Header from "../../components/Header";
import Linha from "../../components/LinhaDegrade";
import Logo from "../../components/LogoScritus";
import useTitulo from "../../hooks/useTitulo";
import EditarPerfilForm from "./components/EditarPerfilForm";

const PaginaPerfil = () => {
  useTitulo("Meu Perfil - Scritus");
  return (
    <>
      <Header left={<BackButton />} center={<Logo />} />
      <Linha />
      <ContainerBasico text="Seu Perfil" width="30vw">
        <EditarPerfilForm />
      </ContainerBasico>
    </>
  );
};

export default PaginaPerfil;
