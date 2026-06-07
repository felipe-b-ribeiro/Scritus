import { useEffect, useState } from "react";
import puxarDadosHook from "../../../hooks/puxarDadosHook";
import decodificarJWT from "../../../utils/decodificarJWT";

const usePaginaEstante = () => {
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [idObraSelecionada, setIdObraSelecionada] = useState(null);
  const [deleteModalState, setDeleteModalState] = useState("closed");
  const [overlayState, setOverlayState] = useState("closed");
  const { puxarDados } = puxarDadosHook();

  useEffect(() => {
    const carregarObras = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const payload = decodificarJWT(token);

        const usuario = await puxarDados(payload.email, payload.tipoUsuario);

        const resp = await fetch(
          ` /api/v1/obra/autor/${usuario.usuario.id_autor}`,
        );
        if (!resp.ok) throw new Error("Erro ao buscar obras");

        const data = await resp.json();
        setObras(data);
      } catch (err) {
        console.error("Erro ao carregar obras:", err);
      } finally {
        setLoading(false);
      }
    };

    carregarObras();
  }, []);

  const handleCancelModal = () => {
    setOverlayState("leaving");
    setDeleteModalState("leaving");
    setTimeout(() => {
      setOverlayState("closed");
      setDeleteModalState("closed");
    }, 800);
  };

  const handleDeleteObra = async (obraId) => {
    try {
      const resposta = await fetch(` /api/v1/obra/${obraId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (resposta.ok) {
        alert("Obra deletada com sucesso!");
        window.location.reload();
      } else {
        const data = await resposta.json();
        alert(`Erro ao deletar obra: ${data.mensagem || "Erro desconhecido"}`);
      }
    } catch (err) {
      console.error("Erro ao deletar obra:", err);
    }
  };

  return {
    obras,
    loading,
    idObraSelecionada,
    setIdObraSelecionada,
    deleteModalState,
    setDeleteModalState,
    overlayState,
    setOverlayState,
    handleCancelModal,
    handleDeleteObra,
  };
};

export default usePaginaEstante;
