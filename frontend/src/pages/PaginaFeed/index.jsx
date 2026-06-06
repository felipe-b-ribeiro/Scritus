import useTitulo from "../../hooks/useTitulo.js";
import PaginaSplash from "../PaginaSplash";
import FeedContent from "./components/FeedContent.jsx";
import usePaginaFeed from "./hooks/usePaginaFeed.js";
import { SC_MainContainerFeed } from "./styles.js";

function PaginaFeed() {
  useTitulo("Feed - Scritus");

  const {
    obras,
    loading,
    indiceAtual,
    proximaObra,
    obraAnterior,
    interacoes,
    contadores,
    handleInteracao,
  } = usePaginaFeed();

  if (loading) return <PaginaSplash />;

  return (
    <SC_MainContainerFeed>
      <FeedContent
        indiceAtual={indiceAtual}
        proximaObra={proximaObra}
        obraAnterior={obraAnterior}
        interacoes={interacoes}
        contadores={contadores}
        handleInteracao={handleInteracao}
        obras={obras}
      />
    </SC_MainContainerFeed>
  );
}

export default PaginaFeed;
