import BackButton from "../../components/BackButton";
import ContainerBasico from "../../components/ContainerBasico";
import Header from "../../components/Header";
import Linha from "../../components/LinhaDegrade";
import Logo from "../../components/LogoScritus";
import useTitulo from "../../hooks/useTitulo";
import PaginaSplash from "../PaginaSplash";
import CurtidasContent from "./components/CurtidasContent";
import usePaginaCurtidas from "./hooks/usePaginaCurtidas";

function PaginaCurtidas() {
  useTitulo("Minhas Curtidas - Scritus");

  const { obras, loading } = usePaginaCurtidas();

  if (loading) return <PaginaSplash />;

  return (
    <>
      <Header left={<BackButton />} center={<Logo />} />
      <Linha />
      <ContainerBasico width="90vw">
        <CurtidasContent obras={obras} />
      </ContainerBasico>
    </>
  );
}

export default PaginaCurtidas;
