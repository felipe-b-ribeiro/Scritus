import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import decodificarJWT from "../../../utils/decodificarJWT";

const usePaginaLivro = () => {
  const { id_obra } = useParams();
  const [idPerfil, setIdPerfil] = useState();
  const [obra, setObra] = useState();
  const [loading, setLoading] = useState(true);
  const [interacoes, setInteracoes] = useState();
  const [contadores, setContadores] = useState();

  useEffect(() => {
    const carregarPagina = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { id_perfil } = await decodificarJWT(token);
        setIdPerfil(id_perfil);
        const obraBanco = await fetch(` /api/v1/obra/puxarporid`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id_obra: id_obra }),
        });
        if (!obraBanco.ok) throw new Error("Erro ao buscar obra.");
        const data = await obraBanco.json();
        setObra(data[0]);
        setContadores({
          curtidas: parseInt(data[0].curtidas, 10),
          salvos: parseInt(data[0].salvos, 10),
          cliques: parseInt(data[0].cliques, 10),
          comentarios: parseInt(data[0].comentarios, 10),
        });
        const body = {
          id_perfil: id_perfil,
          id_obra: data[0].id_obra,
        };
        const interacoesBanco = await fetch(` /api/v1/interacao-por-id`, {
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
        console.error("Erro ao carregar página: ", err);
      } finally {
        setLoading(false);
      }
    };
    carregarPagina();
  }, [id_obra]);

  const abrirPDF = (pdf_url) => {
    if (pdf_url) {
      window.open(` ${pdf_url}`, "_blank");
    } else {
      alert("PDF não encontrado para esta obra.");
    }
  };

  const criarInteracao = async (interacaoObj) => {
    try {
      await fetch(" /api/v1/interacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(interacaoObj),
      });
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
      await fetch(" /api/v1/interacao", {
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
          id_obra: id_obra,
          tipo_interacao: tipo,
          conteudoParam: null,
        })();
      } else {
        excluirInteracaoDebounced({
          id_perfil: idPerfil,
          id_obra: id_obra,
          tipo_interacao: tipo,
        })();
      }

      return {
        ...prevInteracoes,
        [tipo]: novoEstado,
      };
    });
  };

  return {
    obra,
    loading,
    interacoes,
    contadores,
    handleInteracao,
    abrirPDF,
  };
};

export default usePaginaLivro;
