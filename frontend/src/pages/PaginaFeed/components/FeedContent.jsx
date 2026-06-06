import { FaArrowLeft } from "react-icons/fa";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { HiCursorClick, HiOutlineCursorClick } from "react-icons/hi";
import { IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import { PiHeartStraightFill, PiHeartStraightLight } from "react-icons/pi";
import useNavigateCustom from "../../../hooks/useNavigateCustom";

const FeedContent = ({
  obras,
  indiceAtual,
  proximaObra,
  obraAnterior,
  interacoes,
  contadores,
  handleInteracao,
}) => {
  const { goBack, goTo } = useNavigateCustom();

  const obra = obras[indiceAtual];

  return (
    <>
      <button type="button" className="backButtonFeed" onClick={() => goBack()}>
        <FaArrowLeft size={18} />
      </button>

      <div className="feedPage">
        <button
          type="button"
          className="navigationButton"
          onClick={obraAnterior}
          disabled={indiceAtual === 0}
        >
          <IoMdArrowUp size={30} />
        </button>
        <button
          type="button"
          className="navigationButton"
          onClick={proximaObra}
          disabled={indiceAtual === obras.length - 1}
        >
          <IoMdArrowDown size={30} />
        </button>

        <h1 className="feedTitle">{obra.titulo}</h1>

        <div className="feedTagWrapper">
          {obra.tags?.map((tag) => (
            <button
              className="feedTag"
              key={Math.floor(Math.random() * 5) }
              type="button"
              onClick={() => goTo(`/tag/${tag}`)}
              onKeyDown={(e) => e.key === 'Enter' && goTo(`/tag/${tag}`)}
            >
              {tag}
            </button>
          ))}
        </div>

        <h4 className="feedSampleText">{obra.trecho_de_amostra}</h4>

        <img
          className="feedBookCover"
          src={obra.capa_url}
          alt="Capa da Obra"
          onClick={() => goTo(`/obra/${obra?.id_obra}`)}
          onKeyDown={(e) => e.key === 'Enter' && goTo(`/obra/${obra?.id_obra}`)}
        />

        <button
          type="button"
          className="feedReadButton"
          onClick={() => window.open(` ${obra.pdf_url}`)}
        >
          Ler Obra
        </button>
        <div className="feedInteractionsWrapper">
          <button
            type="button"
            className="feedInteractionButton likes"
            onClick={() => handleInteracao("curtida")}
          >
            {interacoes?.curtida ? (
              <PiHeartStraightFill size={25} color="red" />
            ) : (
              <PiHeartStraightLight size={25} color="red" />
            )}
            {contadores.curtidas}
          </button>
          <button
            type="button"
            className="feedInteractionButton saves"
            onClick={() => handleInteracao("salvo")}
          >
            {interacoes?.salvo ? (
              <GoBookmarkFill size={25} color="blue" />
            ) : (
              <GoBookmark size={25} color="blue" />
            )}
            {contadores.salvos}
          </button>
          <button type="button" className="feedInteractionButton nohover">
            {interacoes?.clique ? (
              <HiCursorClick size={25} />
            ) : (
              <HiOutlineCursorClick size={25} />
            )}
            {contadores.cliques}
          </button>
        </div>
      </div>
    </>
  );
};

export default FeedContent;
