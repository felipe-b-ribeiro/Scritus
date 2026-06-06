import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { HiCursorClick, HiOutlineCursorClick } from "react-icons/hi";
import { MdArrowOutward } from "react-icons/md";
import { PiHeartStraightFill, PiHeartStraightLight } from "react-icons/pi";
import InteractionButton from "../../../components/InteractionButton";
import TagList from "../../../components/Tag";
import useNavigateCustom from "../../../hooks/useNavigateCustom";
import imgClassificacao from "../../../utils/imgClassificacao";
import { SC_BookPageContainer } from "../styles";

const PaginaLivroContent = ({
  obra,
  interacoes,
  contadores,
  handleInteracao,
  abrirPDF,
}) => {
  const { goTo } = useNavigateCustom();

  return (
    <SC_BookPageContainer>
      <div className="relative">
        <img
          src={` ${obra.capa_url}`}
          width="440"
          height="600"
          alt="Capa do Livro"
        />
        <img
          src={imgClassificacao(obra.classificacao_indicativa)}
          alt="Classificação Indicativa"
          width="60"
          height="60"
        />
      </div>
      <div>
        <div className="wrapper">
          <h1>{obra.titulo}</h1>
          <TagList tags={obra.tags} />
          <div className="flex flex-column">
            <div>
              <p className="cinzel color-primary mb-5">Escrito por:</p>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                className="miniProfileWrapper"
                onClick={() => goTo(`/perfil/${obra.id_perfil_autor}`)}
              >
                <img
                  width="50"
                  height="50"
                  src={` ${obra.foto_perfil_url}`}
                  alt="Foto do Autor"
                />
                <h5>{obra.pseudonimo ?? obra.nome_autor}</h5>
              </button>
              <InteractionButton
                onClick={() => handleInteracao("curtida")}
                variant="likes"
                icon={
                  interacoes.curtida ? (
                    <PiHeartStraightFill size={30} />
                  ) : (
                    <PiHeartStraightLight size={30} />
                  )
                }
                counter={contadores.curtidas}
              />
              <InteractionButton
                onClick={() => handleInteracao("salvo")}
                variant="saves"
                icon={
                  interacoes.salvo ? (
                    <GoBookmarkFill size={30} />
                  ) : (
                    <GoBookmark size={30} />
                  )
                }
                counter={contadores.salvos}
              />
              <InteractionButton
                variant="nohover"
                icon={
                  interacoes.clique ? (
                    <HiCursorClick size={30} />
                  ) : (
                    <HiOutlineCursorClick size={30} />
                  )
                }
                counter={contadores.cliques}
              />
            </div>
          </div>
        </div>
        <div className="wrapper">
          <p className="flex flex-column gap-10">
            <b>Sinopse do livro:</b>
            {obra.sinopse}
          </p>
        </div>
        <button
          type="button"
          className="readButton"
          onClick={() => {
            abrirPDF(obra.pdf_url);
            interacoes.clique ? null : handleInteracao("clique");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              abrirPDF(obra.pdf_url);
              interacoes.clique ? null : handleInteracao("clique");
            }
          }}
        >
          Ler Obra
          <MdArrowOutward color="white" size={20} />
        </button>
      </div>
    </SC_BookPageContainer>
  );
};

export default PaginaLivroContent;
