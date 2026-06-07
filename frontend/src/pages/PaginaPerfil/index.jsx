import { useEffect, useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import dez from "../../assets/classificacao/10.png";
import doze from "../../assets/classificacao/12.png";
import catorze from "../../assets/classificacao/14.png";
import dezesseis from "../../assets/classificacao/16.png";
import dezoito from "../../assets/classificacao/18.png";
import livre from "../../assets/classificacao/livre.png";
import BackButton from "../../components/BackButton";
import ContainerBasico from "../../components/ContainerBasico";
import Header from "../../components/Header";
import Linha from "../../components/LinhaDegrade";
import LivroHome from "../../components/LivroHome";
import Logo from "../../components/LogoScritus";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import useTitulo from "../../hooks/useTitulo";
import decodificarJWT from "../../utils/decodificarJWT";
import PaginaSplash from "../PaginaSplash";
import {
  SC_Biografia,
  SC_BotaoSeguir,
  SC_FotoPerfil,
  SC_NomeUsuario,
  SC_Pseudonimo,
  SC_Seguidores,
  SC_Tag,
} from "./styles";

function PaginaPerfil() {
  const { id_perfil_autor } = useParams();
  const [perfil, setPerfil] = useState();
  const [idPerfilSeguidor, setIdPerfilSeguidor] = useState();
  const [loading, setLoading] = useState(true);
  const [seguindo, setSeguindo] = useState(false);
  const [obras, setObras] = useState([]);

  const { goTo } = useNavigateCustom();

  useEffect(() => {
    const carregarPagina = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { id_perfil } = await decodificarJWT(token);
        setIdPerfilSeguidor(id_perfil);
        if (id_perfil_autor !== id_perfil) {
          const resposta = await fetch(` /api/v1/seguidor/verificar`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id_seguidor: id_perfil,
              id_seguido: id_perfil_autor,
            }),
          });
          const jaSegue = await resposta.json();
          if (jaSegue) setSeguindo(true);
        }
        const perfil = await fetch(
          ` /api/v1/usuarios/perfil/${id_perfil_autor}`,
        );
        if (!perfil.ok) throw new Error("Erro ao buscar perfil.");
        const dataPerfil = await perfil.json();
        setPerfil(dataPerfil);
        if (dataPerfil.tipo_usuario === "Autor") {
          const resp = await fetch(
            ` /api/v1/obra/autor/${dataPerfil.id_autor}`,
          );
          if (!resp.ok) throw new Error("Erro ao buscar obras");

          const data = await resp.json();
          setObras(data);
        }
      } catch (err) {
        console.error("Erro ao carregar perfil: ", err);
      } finally {
        setLoading(false);
      }
    };
    carregarPagina();
  }, [id_perfil_autor]);

  useTitulo(`Perfil - Scritus`);

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

  const criarSeguidor = async (seguidorObj) => {
    try {
      await fetch(" /api/v1/seguidor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seguidorObj),
      });
    } catch (err) {
      console.error("Erro ao enviar interação:", err);
    }
  };

  let timerCriar;
  const criarSeguidorDebounced = (obj) => {
    return () => {
      clearTimeout(timerCriar);
      timerCriar = setTimeout(() => criarSeguidor(obj), 500);
    };
  };

  const excluirSeguidor = async (seguidorObj) => {
    try {
      await fetch(" /api/v1/seguidor", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(seguidorObj),
      });
    } catch (err) {
      console.error("Erro ao deletar seguidor:", err);
    }
  };

  let timerExcluir;
  const excluirSeguidorDebounced = (obj) => {
    return () => {
      clearTimeout(timerExcluir);
      timerExcluir = setTimeout(() => excluirSeguidor(obj), 1000);
    };
  };

  const handleSeguidor = () => {
    if (!seguindo) {
      criarSeguidorDebounced({
        id_perfil: id_perfil_autor,
        id_perfil_seguidor: idPerfilSeguidor,
      })();
    } else {
      excluirSeguidorDebounced({
        id_perfil: id_perfil_autor,
        id_perfil_seguidor: idPerfilSeguidor,
      })();
    }
    setSeguindo(!seguindo);
  };

  if (loading) return <PaginaSplash />;

  return (
    <>
      <Header left={<BackButton />} center={<Logo />} />
      <Linha />
      <ContainerBasico width="60vw" className={"p-20 gap-16"}>
        <div className="flex" style={{ alignItems: " center" }}>
          <SC_FotoPerfil src={` ${perfil.foto_perfil_url}`} />
          <div>
            <SC_Tag $tipo={perfil.tipo_usuario}>{perfil.tipo_usuario}</SC_Tag>
            <SC_NomeUsuario>{perfil.nome_usuario}</SC_NomeUsuario>
            {perfil.tipo_usuario === "Autor" && perfil.pseudonimo ? (
              <SC_Pseudonimo>{perfil.pseudonimo}</SC_Pseudonimo>
            ) : null}
            <div
              className="flex"
              style={{ alignItems: "center", gap: "8px", marginTop: "10px" }}
            >
              <div className="flex" style={{ marginLeft: "50px", gap: "8px" }}>
                {perfil.tipo_usuario === "Autor" ? (
                  <>
                    {Number(id_perfil_autor) ===
                    Number(idPerfilSeguidor) ? null : (
                      <SC_BotaoSeguir onClick={handleSeguidor}>
                        {seguindo ? "Seguindo" : "Seguir"}
                        {seguindo ? <FaCheck /> : <FaPlus />}
                      </SC_BotaoSeguir>
                    )}

                    <SC_Seguidores>
                      {`${perfil.seguidores} ${perfil.seguidores > 1 ? "seguidores" : "seguidor"}`}
                    </SC_Seguidores>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex">
            <SC_Biografia>
              {perfil.bio ? perfil.bio : "Esse usuário não tem biografia."}
            </SC_Biografia>
          </div>
        </div>
      </ContainerBasico>
      {perfil.tipo_usuario === "Autor" && (
        <ContainerBasico width="90vw" className={"p-20"}>
          <h2
            className="p-10 m-10"
            style={{
              fontFamily: "Raleway",
              borderRadius: "20px",
              border: "1px solid var(--cor-principal)",
            }}
          >
            {obras.length} livros publicados
          </h2>
          <div>
            {Array.from({ length: Math.ceil(obras.length / 3) }).map((_, i) => {
              const grupo = obras.slice(i * 3, i * 3 + 3);
              return obras.length === 0 ? (
                <p key={Math.floor(Math.random() * 10000)}>Esse usuário não possui obras cadastradas</p>
              ) : (
                <div
                  key={Math.floor(Math.random() * 10000)}
                  className="flex"
                  style={{
                    marginBottom: "20px",
                    justifyContent: "center",
                    gap: "8px",
                  }}
                >
                  {grupo.map((obra) => (
                    <div
                      key={obra.id_obra}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        cursor: "pointer",
                        width: "fit-content",
                      }}
                    >
                      <LivroHome
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
                          color: "var(--cor-principal)",
                          fontFamily: "Cinzel",
                          marginTop: "10px",
                          textAlign: "center",
                          maxWidth: "200px",
                        }}
                      >
                        {obra.titulo}
                      </h4>
                      <h6
                        style={{
                          fontWeight: "normal",
                          fontFamily: "Raleway",
                          marginTop: "3px",
                        }}
                      >
                        {obra.status_obra}
                      </h6>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </ContainerBasico>
      )}
    </>
  );
}

export default PaginaPerfil;
