import BackButton from "../../components/BackButton";
import ContainerBasico from "../../components/ContainerBasico";
import Header from "../../components/Header";
import Linha from "../../components/LinhaDegrade";
import Logo from "../../components/LogoScritus";
import Overlay from "../../components/Overlay";
import useTitulo from "../../hooks/useTitulo";
import PaginaSplash from "../PaginaSplash";
import FormObras from "./components/FormObras.jsx";
import useCadastroObras from "./hooks/useCadastroObras";

function PaginaCadastroObras() {
  const { loading, overlayState } = useCadastroObras();

  useTitulo("Cadastrar Obra - Scritus");

  if (loading) return <PaginaSplash />;

  return (
    <>
      {overlayState !== "closed" && <Overlay state={overlayState} />}
      <Header left={<BackButton />} center={<Logo />} />
      <Linha />
      <ContainerBasico width="35vw" text="Cadastrar Obra">
        <FormObras />
      </ContainerBasico>
    </>
  );
}

export default PaginaCadastroObras;
