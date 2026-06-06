import BackButton from "../../components/BackButton";
import ContainerBasico from "../../components/ContainerBasico";
import Header from "../../components/Header";
import Linha from "../../components/LinhaDegrade";
import Logo from "../../components/LogoScritus";
import useTitulo from "../../hooks/useTitulo";
import PaginaSplash from "../PaginaSplash";
import PaginaLivroContent from "./components/PaginaLivroContent";
import usePaginaLivro from "./hooks/usePaginaLivro";

function PaginaLivro() {
  const { obra, loading, interacoes, contadores, handleInteracao, abrirPDF } =
    usePaginaLivro();

  useTitulo(
    obra?.titulo
      ? `${obra.titulo} - Scritus`
      : "Scritus - A Rede Social Literária",
  );

  if (loading) return <PaginaSplash />;

  return (
    <>
      <Header left={<BackButton />} center={<Logo />} />
      <Linha />
      <ContainerBasico width="90vw" className="flex-row p-30">
        <PaginaLivroContent
          obra={obra}
          interacoes={interacoes}
          contadores={contadores}
          handleInteracao={handleInteracao}
          abrirPDF={abrirPDF}
        />
      </ContainerBasico>
    </>
  );
}

export default PaginaLivro;
