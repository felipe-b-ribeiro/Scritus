import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import dez from "../../assets/classificacao/10.png";
import doze from "../../assets/classificacao/12.png";
import catorze from "../../assets/classificacao/14.png";
import dezesseis from "../../assets/classificacao/16.png";
import dezoito from "../../assets/classificacao/18.png";
import livre from "../../assets/classificacao/livre.png";
import BackButton from "../../components/BackButton";
import ContainerBasico from "../../components/ContainerBasico";
import ContainerCarrosel from "../../components/ContainerCarrosel";
import Header from "../../components/Header";
import Linha from "../../components/LinhaDegrade";
import LivroHome from "../../components/LivroHome";
import Logo from "../../components/LogoScritus";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import useTitulo from "../../hooks/useTitulo";
import PaginaSplash from "../PaginaSplash";
import { PALETA, SC_Info, SC_TagGrande } from "./styles";

function PaginaTag() {
  const { nome_tag } = useParams();
  const nomeTag = nome_tag.replace(/_/g, " ");
  const [obras, setObras] = useState();
  const [cor] = useState(PALETA[Math.floor(Math.random() * PALETA.length)]);
  const [loading, setLoading] = useState(true);

  useTitulo(nome_tag && `${nome_tag} - Scritus`);

  const { goTo } = useNavigateCustom();

  useEffect(() => {
    const carregarPagina = async () => {
      try {
        const resposta = await fetch(` /api/v1/obra/tag/${nomeTag}`);
        if (resposta.status === 404) goTo("/404");
        if (!resposta.ok) throw new Error("Falha ao buscar obras.");
        const data = await resposta.json();
        setObras(data);
      } catch (err) {
        console.error("Erro ao carregar página: ", err);
      } finally {
        setLoading(false);
      }
    };
    carregarPagina();
  }, [nomeTag]);

  const imgClassificacao = (idade) => {
    let imagem;

    switch (idade) {
      case "Livre":
        imagem = livre;
        break;
      case "10":
        imagem = dez;
        break;
      case "12":
        imagem = doze;
        break;
      case "14":
        imagem = catorze;
        break;
      case "16":
        imagem = dezesseis;
        break;
      case "18":
        imagem = dezoito;
        break;
    }

    return imagem;
  };

  if (loading) return <PaginaSplash />;

  return (
    <>
      <Header left={<BackButton />} center={<Logo />} />
      <Linha />
      <ContainerBasico width="90vw">
        <SC_TagGrande $cor={cor}>
          Livros do gênero <strong>"{nomeTag}"</strong>
        </SC_TagGrande>
        <SC_Info $cor={cor}>
          <strong>{obras.length}</strong> livros associados com essa tag
        </SC_Info>
        {obras.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              fontFamily: "Cinzel",
              color: "var(--cor-principal)",
            }}
          >
            Nenhuma obra associada a essa tag.
          </p>
        ) : (
          Array.from({ length: Math.ceil(obras.length / 5) }).map((_, i) => {
            const grupo = obras.slice(i * 5, i * 5 + 5);
            return (
              <ContainerCarrosel key={Math.floor(Math.random() * 10000)}>
                {grupo.map((obra) => (
                  <div
                    key={obra.id_obra}
                    className='flex flex-column items-center'
                  >
                    <LivroHome
                      key={obra.id_obra}
                      src={obra.capa_url}
                      onClick={() => goTo(`/obra/${obra.id_obra}`)}
                    >
                      <img
                        style={{
                          zIndex: "5",
                          position: "relative",
                          top: "-50px",
                          left: "6px",
                        }}
                        width="40"
                        height="40"
                        src={imgClassificacao(obra.classificacao_indicativa)}
                        alt="Classificação Indicativa"
                      />
                    </LivroHome>
                    <h4
                      style={{
                        marginTop: "7px",
                        fontFamily: "Cinzel",
                        width: "200px",
                        textAlign: "center",
                      }}
                    >
                      {obra.titulo}
                    </h4>
                    <h6
                      style={{
                        fontFamily: "Cinzel",
                        marginTop: "5px",
                        color: "var(--cor-principal)",
                      }}
                    >
                      Escrito por {obra.pseudonimo || obra.nome_autor.split("")}
                    </h6>
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

export default PaginaTag;
