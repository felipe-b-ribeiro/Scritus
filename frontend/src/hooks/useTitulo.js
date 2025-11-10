import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useTitulo(tituloBase = "Scritus - A Rede Social Literária") {
  const location = useLocation();

  useEffect(() => {
    // Atualiza o título sempre que a rota mudar
    document.title = tituloBase;
  }, [location.pathname, tituloBase]);
}
