import { BiSolidTrash } from "react-icons/bi";
import { FaPlus } from "react-icons/fa6";
import SemObrasImg from "../../../assets/sem-obras/sem-obras.webp";
import SemObrasImgHover from "../../../assets/sem-obras/sem-obras-hover.webp";
import BotaoSimples from "../../../components/BotaoSimples";
import LivroHome from "../../../components/LivroHome";
import styles from "../styles/PaginaEstante.module.css";
import { Link } from "react-router-dom";

const PaginaEstante = ({
  obras,
  setIdObraSelecionada,
  setOverlayState,
  setDeleteModalState,
}) => {
  return (
    <div className={`mt-15 ${styles.bookGrid}`}>
      {obras.length === 0 ? (
        <div className="flex flex-column items-center gap-10">
          <img
            width={"400px"}
            src={SemObrasImg}
            alt="Imagem de que você não tem nenhuma obra cadastrada"
            onMouseEnter={(e) => {
              e.target.src = SemObrasImgHover;
            }}
            onMouseLeave={(e) => {
              e.target.src = SemObrasImg;
            }}
          />
          <h2 className="cinzel font-normal color-primary">
            Você ainda não cadastrou nenhuma obra!
          </h2>
          <BotaoSimples
            className="m-10"
            variant="secondary"
            to="/cadastrar-obra"
            text="Cadastrar Agora"
          />
        </div>
      ) : (
        <>
          {obras.map((obra) => {
            return (
              <div key={obra.id_obra} className="flex flex-column items-center">
                <LivroHome
                  src={obra.capa_url}
                  bookId={obra.id_obra}
                  bookAge={obra.classificacao_indicativa}
                  bookTitle={obra.titulo}
                  bookStatus={obra.status_obra}
                >
                  <button
                    type="button"
                    className="deleteBookButton"
                    onClick={() => {
                      setOverlayState("entering");
                      setDeleteModalState("entering");
                      setIdObraSelecionada(obra.id_obra);
                    }}
                  >
                    <BiSolidTrash size={24} color="white" />
                  </button>
                </LivroHome>
              </div>
            );
          })}
          <Link className="flex justify-center" to="/cadastrar-obra">
            <div className={styles.createNewBookButton}>
              <FaPlus size={50} color="green" />
            </div>
          </Link>
        </>
      )}
    </div>
  );
};

export default PaginaEstante;
