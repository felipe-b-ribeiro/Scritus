import { useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import ContainerBasico from "../../components/ContainerBasico";
import ContainerCarrosel from "../../components/ContainerCarrosel";
import Header from "../../components/Header";
import Linha from "../../components/LinhaDegrade";
import LivroHome from "../../components/LivroHome";
import Logo from "../../components/LogoScritus";
import TagGrande from "../../components/TagGrande";
import useTitulo from "../../hooks/useTitulo";
import decodificarJWT from "../../utils/decodificarJWT";
import PaginaSplash from "../PaginaSplash";
import { SC_Info } from "./styles";

function PaginaSalvos() {
  const [obras, setObras] = useState();
  const [loading, setLoading] = useState(true);

  useTitulo("Meus Salvos - Scritus");

  useEffect(() => {
    const carregarPagina = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { id_perfil } = await decodificarJWT(token);
        const resposta = await fetch(
          ` /api/v1/obra/salvos?idPerfil=${id_perfil}&tipoInteracao=salvo`,
        );
        const data = await resposta.json();
        console.log("Dados vindo do back", data);
        setObras(data);
      } catch (err) {
        console.error("Erro ao carregar página: ", err);
      } finally {
        setLoading(false);
      }
    };
    carregarPagina();
  }, []);

  if (loading) return <PaginaSplash />;

  return (
    <>
      <Header left={<BackButton />} center={<Logo />} />
      <Linha />
      <ContainerBasico width="90vw">
        <TagGrande variant="saveds" />
        <SC_Info cor="blue">
          <strong>{obras.length}</strong>
          {obras.length === 1 ? " livro salvo" : " livros salvos"}
        </SC_Info>
        {obras.length === 0 ? (
          <p
            className="p-10"
            style={{
              textAlign: "center",
              fontFamily: "Cinzel",
              color: "var(--cor-principal)",
            }}
          >
            Nenhum livro foi salvo ainda.
          </p>
        ) : (
          Array.from({ length: Math.ceil(obras.length / 5) }).map((_, i) => {
            const grupo = obras.slice(i * 5, i * 5 + 5);
            return (
              <ContainerCarrosel key={Math.floor(Math.random() * i)}>
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
      </ContainerBasico>
    </>
  );
}

export default PaginaSalvos;
