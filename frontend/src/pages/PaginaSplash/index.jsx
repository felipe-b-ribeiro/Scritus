import { useEffect, useState } from "react";
import Img from "../../assets/Splash.gif";
import { SC_Img, SC_Overlay, SC_Titulo1, SC_Titulo2 } from "./styles";

const PaginaSplash = () => {
  const [texto, setTexto] = useState("Carregando");

  useEffect(() => {
    const interval = setInterval(() => {
      setTexto((prev) => {
        if (prev.endsWith("...")) return "Carregando";
        return `${prev}.`;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);
  return (
    <SC_Overlay>
      <SC_Img src={Img} />
      <SC_Titulo2>{texto}</SC_Titulo2>
      <SC_Titulo1>
        ScRi<strong>tUS</strong>
      </SC_Titulo1>
    </SC_Overlay>
  );
};

export default PaginaSplash;
