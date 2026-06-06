import { Link } from "react-router-dom";
import imgClassificacao from "../../utils/imgClassificacao";
import { SC_LivroHome } from "./styles";

const LivroHome = ({
  src,
  bookAge,
  bookId,
  bookTitle,
  bookAuthor,
  children,
  bookStatus,
}) => {
  return (
    <>
      <SC_LivroHome>
        <Link to={`/obra/${bookId}`}>
          <img
            className="cursor-pointer rounded-15"
            width="100%"
            height="100%"
            src={src}
            alt="Capa do Livro"
          />
        </Link>
        <img
          className="relative z-5 -t-50 l-6"
          width="40"
          height="40"
          src={imgClassificacao(bookAge)}
          alt="Classificação Indicativa"
        />
        {children}
      </SC_LivroHome>
      <h4 className="cinzel mt-7 w-200 text-center">{bookTitle}</h4>
      {bookAuthor && (
        <h6 className="cinzel mt-5 color-primary">Escrito por {bookAuthor}</h6>
      )}
      {bookStatus && <h6 className="raleway mt-3 font-normal">{bookStatus}</h6>}
    </>
  );
};

export default LivroHome;
