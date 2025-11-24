import useTitulo from "../../hooks/useTitulo.js";
import { useState, useEffect } from "react";
import {
  SC_Página,
  SC_BotaoVoltar,
  SC_BotaoNavegacao,
  SC_Titulo,
  SC_TagWrapper,
  SC_Tag,
  SC_TextoAmostra,
  SC_Capa,
  SC_BotaoLer,
  SC_ButtonInteracao,
  SC_WrapperInteracoes,
} from "./styles.js";
import useNavigateCustom from "../../hooks/useNavigateCustom.js";
import Arrow2Icon from "../../components/icons/arrow2Icon/index.jsx";
import HeartIcon from "../../components/icons/heartIcon/index.jsx";
import HeartFullfiledIcon from "../../components/icons/heartFullfiledIcon/index.jsx";
import SavedIcon from "../../components/icons/savedIcon";
import SavedFullfiledIcon from "../../components/icons/savedFullfiledIcon/index.jsx";
import ClickIcon from "../../components/icons/clickIcon";
import ClickFullfiledIcon from "../../components/icons/clickFullfiledIcon/index.jsx";
import ComentIcon from "../../components/icons/comentIcon";
import PaginaSplash from "../PaginaSplash/index.jsx";
import decodificarJWT from "../../utils/decodificarJWT.js";
import CapaPadrao from '../../assets/foto_capa_padrao.png';

function PaginaFeed() {
  useTitulo("Feed - Scritus");
  const { goBack, goTo } = useNavigateCustom();

  const [obras, setObras] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [idPerfil, setIdPerfil] = useState();
  const [interacoes, setInteracoes] = useState();
  const [contadores, setContadores] = useState();

  async function fetchObras() {
    try {
      const token = localStorage.getItem("accessToken");
      const { id_perfil } = await decodificarJWT(token);
      setIdPerfil(id_perfil);
      const deletou = await fetch(`http:localhost:5000/api/v1/obra/recomendacao?idPerfil=${id_perfil}`, {
        method: 'DELETE',
      })
      if (!deletou) return console.log('Erro ao deletar recomendações antigas');
      const listaBruta = await fetch(
        `http://localhost:5000/api/v1/obra/recomendacao?idPerfil=${id_perfil}&quantidade=6`
      );
      const listaIds = await listaBruta.json();
      const ids = listaIds.listaIds.map((item) => item.id_obra);

      const obrasBrutas = await fetch(
        `http://localhost:5000/api/v1/obra/puxarporid`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id_obra: ids }),
        }
      );

      const listaObras = await obrasBrutas.json();
      setObras(listaObras);
      setContadores({
                    'curtidas': parseInt(listaObras[indiceAtual].curtidas),
                    'salvos': parseInt(listaObras[indiceAtual].salvos),
                    'cliques': parseInt(listaObras[indiceAtual].cliques),
                    'comentarios': parseInt(listaObras[indiceAtual].comentarios)
                })
                const body = {
                    "id_perfil": id_perfil,
                    "id_obra": listaObras[indiceAtual].id_obra,
                }
                const interacoesBanco = await fetch(`http://localhost:5000/api/v1/interacao-por-id`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
                const data2 = await interacoesBanco.json();
                setInteracoes({
                    curtida: data2.interacoes.some(i => i.tipo === "curtida"),
                    salvo: data2.interacoes.some(i => i.tipo === "salvo"),
                    clique: data2.interacoes.some(i => i.tipo === "clique"),
                    comentario: data2.interacoes.some(i => i.tipo === "comentario")
                });
    } catch (err) {
      console.error("Erro ao buscar obras:", err);
    } finally {
      setCarregando(false);
    }
  }

  // botão anterior e próximo
  function proximaObra() {
    setIndiceAtual((atual) => (atual < obras.length - 1 ? atual + 1 : atual));
  }

  function obraAnterior() {
    setIndiceAtual((atual) => (atual > 0 ? atual - 1 : atual));
  }

  useEffect(() => {
    fetchObras();
  }, [indiceAtual]);

  // ------------------------
  // Interações
  // ------------------------
  const handleInteracao = (tipo) => {

        setInteracoes(prevInteracoes => {

            const estavaAtivado = prevInteracoes[tipo];
            const novoEstado = !estavaAtivado;

            // Atualiza counters no mesmo ciclo
            setContadores(prev => ({
                ...prev,
                [`${tipo}s`]: prev[`${tipo}s`] + (estavaAtivado ? -1 : +1)
            }));

            // Backend
            if (!estavaAtivado) {
                criarInteracaoDebounced({
                    id_perfil: idPerfil,
                    id_obra: obras[indiceAtual].id_obra,
                    tipo_interacao: tipo,
                    conteudoParam: null
                })();
            } else {
                excluirInteracaoDebounced({
                    id_perfil: idPerfil,
                    id_obra: obras[indiceAtual].id_obra,
                    tipo_interacao: tipo
                })();
            }

            // Retorna o novo estado do usuário
            return {
                ...prevInteracoes,
                [tipo]: novoEstado
            };
        });
    };

  const criarInteracao = async (interacaoObj) => {
    try {
        await fetch("http://localhost:5000/api/v1/interacao", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(interacaoObj),
        });
        console.log("Interação enviada:", interacaoObj);
    } catch (err) {
        console.error("Erro ao enviar interação:", err);
    }
    };

    let timerCriar;
    const criarInteracaoDebounced = (obj) => {
        return () => {
            clearTimeout(timerCriar);
            timerCriar = setTimeout(() => criarInteracao(obj), 500);
        };
    }

    const excluirInteracao = async (interacaoObj) => {
        try {
            await fetch("http://localhost:5000/api/v1/interacao", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(interacaoObj),
            });
        } catch (err) {
            console.error("Erro ao deletar interação:", err);
        }
    }

    let timerExcluir;
    const excluirInteracaoDebounced = (obj) => {
        return () => {
            clearTimeout(timerExcluir);
            timerExcluir = setTimeout(() => excluirInteracao(obj), 1000);
        };
    }

    const Tag = ({nomeTag}) => <SC_Tag onClick={() => goTo(`/tag/${nomeTag}`)}>{nomeTag}</SC_Tag>;
    

  if (carregando) return <PaginaSplash />;

  const obra = obras[indiceAtual];

  return (
    <div
      style={{
        backgroundColor: "darkgray",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <SC_BotaoVoltar onClick={() => goBack()}>
        <Arrow2Icon cor="black" />
      </SC_BotaoVoltar>

      <SC_Página>
        <SC_BotaoNavegacao onClick={obraAnterior} disabled={indiceAtual === 0}>
          <Arrow2Icon cor='black' />
        </SC_BotaoNavegacao>
        <SC_BotaoNavegacao onClick={proximaObra} disabled={indiceAtual === obras.length - 1}>
          <Arrow2Icon cor='black' />
        </SC_BotaoNavegacao>
        <SC_Titulo>{obra.titulo}</SC_Titulo>

        <SC_TagWrapper>
          {obra.tags?.map((tag, i) => (
            <Tag key={i} nomeTag={tag} />
          ))}
        </SC_TagWrapper>

        <SC_TextoAmostra>{obra.trecho_de_amostra}</SC_TextoAmostra>

        <SC_Capa src={obra.capa_url ? `http://localhost:5000${obra.capa_url}` : CapaPadrao} />

        <SC_BotaoLer
          onClick={() => window.open(`http://localhost:5000${obra.pdf_url}`)}
        >
          Ler Obra
        </SC_BotaoLer>
        <SC_WrapperInteracoes>
          <SC_ButtonInteracao cor='red' onClick={() => handleInteracao('curtida')}>
            {interacoes.curtida ? <HeartFullfiledIcon /> : <HeartIcon />}
            {contadores.curtidas}
          </SC_ButtonInteracao>
          <SC_ButtonInteracao cor='blue' onClick={() => handleInteracao('salvo')}>
            {interacoes.salvo ? <SavedFullfiledIcon /> : <SavedIcon />}
            {contadores.salvos}
          </SC_ButtonInteracao>
          <SC_ButtonInteracao nohover >
            {interacoes.clique ? <ClickFullfiledIcon /> : <ClickIcon />}
            {contadores.cliques}
          </SC_ButtonInteracao>
        </SC_WrapperInteracoes>
      </SC_Página>
    </div>
  );
}

export default PaginaFeed;
