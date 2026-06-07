import { FaScroll } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import ContainerCarrosel from "../../../components/ContainerCarrosel";
import LivroHome from "../../../components/LivroHome";
import TituloBasico from "../../../components/TituloBasico";
import useNavigateCustom from "../../../hooks/useNavigateCustom";
import { SC_MenuBarInferior } from "../styles";

const HomeContent = ({ obras }) => {
  const { goTo } = useNavigateCustom();
  return (
    <>
      <SC_MenuBarInferior>
        <button
          type="button"
          onClick={() => goTo("/feed")}
          onKeyDown={(e) => {
            e.key === "Enter" && goTo("/feed");
          }}
        >
          <FaScroll size={22} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            window.location.reload();
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
            e.key === "Enter" && window.location.reload();
          }}
        >
          <IoHome size={36} />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goTo("/recentes");
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
            e.key === "Enter" && goTo("/recentes");
          }}
        >
          <PiClockCounterClockwiseBold size={22} />
        </button>
      </SC_MenuBarInferior>
      <TituloBasico text="Navegue no Mundo Literário:" />
      {obras.length === 0 ? (
        <p className="cinzel text-center color-primary p-20">
          Nenhuma obra disponível no momento.
        </p>
      ) : (
        Array.from({ length: Math.ceil(obras.length / 5) }).map((_, i) => {
          const grupo = obras.slice(i * 5, i * 5 + 5);
          return (
            <ContainerCarrosel key={Math.floor(Math.random() * 10000)}>
              {grupo.map((obra) => (
                <div
                  key={obra.id_obra}
                  className="flex flex-column items-center"
                >
                  <LivroHome
                    key={obra.id_obra}
                    src={obra.capa_url}
                    bookAge={obra.classificacao_indicativa}
                    bookId={obra.id_obra}
                    bookTitle={obra.titulo}
                    bookAuthor={obra.pseudonimo || obra.nome_autor.split("")}
                  />
                </div>
              ))}
            </ContainerCarrosel>
          );
        })
      )}
    </>
  );
};

export default HomeContent;
