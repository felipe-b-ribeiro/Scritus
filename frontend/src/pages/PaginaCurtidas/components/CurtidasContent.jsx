import ContainerCarrosel from "../../../components/ContainerCarrosel";
import LivroHome from "../../../components/LivroHome";
import TagGrande from "../../../components/TagGrande";
import TagInfo from "../../../components/TagInfo";

const CurtidasContent = ({ obras }) => {
  return (
    <>
      <TagGrande variant="likeds" />
      <TagInfo
        variant="likeds"
        text={
          <>
            <strong>{obras.length}</strong>
            {` livro${obras.length === 1 ? "" : "s"} curtido${obras.length === 1 ? "" : "s"}`}
          </>
        }
      />
      {obras.length === 0 ? (
        <p className="cinzel text-center color-primary p-20">
          Nenhum livro foi curtido ainda.
        </p>
      ) : (
        Array.from({ length: Math.ceil(obras.length / 5) }).map((_, i) => {
          const grupo = obras.slice(i * 5, i * 5 + 5);
          return (
            <ContainerCarrosel key={Math.floor(Math.random * i)}>
              {grupo.map((obra) => (
                <div
                key={Math.floor(Math.random * 10000)}
                className="flex flex-column items-center">
                  <LivroHome
                    key={obra.id_obra}
                    src={obra.capa_url}
                    bookId={obra.id_obra}
                    bookAge={obra.classificacao_indicativa}
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

export default CurtidasContent;
