import { useEffect, useState } from "react";
import decodificarJWT from "../../../utils/decodificarJWT";

const usePaginaFeed = () => {
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [idPerfil, setIdPerfil] = useState();
  const [interacoes, setInteracoes] = useState();
  const [contadores, setContadores] = useState();

  useEffect(() => {
  async function fetchObras() {
    try {
      const token = localStorage.getItem("accessToken");
      const { id_perfil } = await decodificarJWT(token);
      setIdPerfil(id_perfil);
      const deletou = await fetch(
        `/api/v1/obra/recomendacao?idPerfil=${id_perfil}`,
        {
          method: "DELETE",
        },
      );
      console.log(deletou);
      if (!deletou) throw new Error("Erro ao deletar recomendações antigas");
      const listaBruta = await fetch(
        `/api/v1/obra/recomendacao?idPerfil=${id_perfil}&quantidade=6`,
      );
      const listaIds = await listaBruta.json();
      const ids = listaIds.listaIds.map((item) => item.id_obra);

      const obrasBrutas = await fetch(`/api/v1/obra/puxarporid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_obra: ids }),
      });

      const listaObras = await obrasBrutas.json();
      setObras(listaObras);
      setContadores({
        curtidas: parseInt(listaObras[indiceAtual].curtidas, 10),
        salvos: parseInt(listaObras[indiceAtual].salvos, 10),
        cliques: parseInt(listaObras[indiceAtual].cliques, 10),
        comentarios: parseInt(listaObras[indiceAtual].comentarios, 10),
      });
      const body = {
        id_perfil: id_perfil,
        id_obra: listaObras[indiceAtual].id_obra,
      };
      const interacoesBanco = await fetch(`/api/v1/interacao-por-id`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data2 = await interacoesBanco.json();
      setInteracoes({
        curtida: data2.interacoes.some((i) => i.tipo === "curtida"),
        salvo: data2.interacoes.some((i) => i.tipo === "salvo"),
        clique: data2.interacoes.some((i) => i.tipo === "clique"),
        comentario: data2.interacoes.some((i) => i.tipo === "comentario"),
      });
    } catch (err) {
      console.error("Erro ao buscar obras:", err);
    } finally {
      setLoading(false);
    }
  }
  fetchObras();
}, [indiceAtual]);

  function proximaObra() {
    setIndiceAtual((atual) => (atual < obras.length - 1 ? atual + 1 : atual));
  }

  function obraAnterior() {
    setIndiceAtual((atual) => (atual > 0 ? atual - 1 : atual));
  }


  const handleInteracao = (tipo) => {
    setInteracoes((prevInteracoes) => {
      const estavaAtivado = prevInteracoes[tipo];
      const novoEstado = !estavaAtivado;

      setContadores((prev) => ({
        ...prev,
        [`${tipo}s`]: prev[`${tipo}s`] + (estavaAtivado ? -1 : +1),
      }));

      if (!estavaAtivado) {
        criarInteracaoDebounced({
          id_perfil: idPerfil,
          id_obra: obras[indiceAtual].id_obra,
          tipo_interacao: tipo,
          conteudoParam: null,
        })();
      } else {
        excluirInteracaoDebounced({
          id_perfil: idPerfil,
          id_obra: obras[indiceAtual].id_obra,
          tipo_interacao: tipo,
        })();
      }

      return {
        ...prevInteracoes,
        [tipo]: novoEstado,
      };
    });
  };

  const criarInteracao = async (interacaoObj) => {
    try {
      await fetch("/api/v1/interacao", {
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
  };

  const excluirInteracao = async (interacaoObj) => {
    try {
      await fetch("/api/v1/interacao", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(interacaoObj),
      });
    } catch (err) {
      console.error("Erro ao deletar interação:", err);
    }
  };

  let timerExcluir;
  const excluirInteracaoDebounced = (obj) => {
    return () => {
      clearTimeout(timerExcluir);
      timerExcluir = setTimeout(() => excluirInteracao(obj), 1000);
    };
  };

  return {
    obras,
    indiceAtual,
    proximaObra,
    obraAnterior,
    interacoes,
    contadores,
    handleInteracao,
    loading,
  };
};

export default usePaginaFeed;
