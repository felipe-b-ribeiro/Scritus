import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useTitulo(
  titulo = "Scritus - A Rede Social Literária",
) {
  const _location = useLocation();

  useEffect(() => {
    document.title = titulo;
  }, [titulo]);
}
