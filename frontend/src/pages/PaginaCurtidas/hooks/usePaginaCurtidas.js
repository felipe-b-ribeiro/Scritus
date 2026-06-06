import { useEffect, useState } from "react";
import decodificarJWT from "../../../utils/decodificarJWT";

const usePaginaCurtidas = () => {
  const [obras, setObras] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarPagina = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const { id_perfil } = await decodificarJWT(token);
        const resposta = await fetch(
          `/api/v1/obra/salvos?idPerfil=${id_perfil}&tipoInteracao=curtida`,
        );
        const data = await resposta.json();
        setObras(data);
      } catch (err) {
        console.error("Erro ao carregar página: ", err);
      } finally {
        setLoading(false);
      }
    };
    carregarPagina();
  }, []);

  return {
    obras,
    loading,
  };
};

export default usePaginaCurtidas;
