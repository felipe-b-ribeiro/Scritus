import { useEffect, useState } from "react";
import puxarDadosHook from "../../hooks/puxarDadosHook";
import decodificarJWT from "../../utils/decodificarJWT";
import Logo from "../../components/LogoScritus";
import Linha from "../../components/LinhaDegrade";
import BotaoSimples from "../../components/BotaoSimples";
import {
  Cabecalho,
  CabecalhoCentro,
  CabecalhoEsquerda,
} from "../../components/Cabecalho";
import ArrowIcon from "../../components/icons/arrowIcon";
import ContainerBasico from "../../components/ContainerBasico";
import LivroHome from "../../components/LivroHome";
import PaginaSplash from "../PaginaSplash";

function PaginaEstante() {
  const [obras, setObras] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const { puxarDados } = puxarDadosHook();

  useEffect(() => {
    const carregarObras = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const payload = decodificarJWT(token);

        const usuario = await puxarDados(payload.email, payload.tipoUsuario);
        console.log(usuario);

        const resp = await fetch(
          `http://localhost:5000/api/v1/obra/${usuario.usuario.id_autor}`
        );
        if (!resp.ok) throw new Error("Erro ao buscar obras");

        const data = await resp.json();
        setObras(data);
      } catch (err) {
        console.error("Erro ao carregar obras:", err);
      } finally {
        setCarregando(false);
      }
    };

    carregarObras();
  }, []);

  if (carregando) return <PaginaSplash />;

  const abrirPDF = (arquivo_pdf) => {
    if (arquivo_pdf) {
      window.open(`http://localhost:5000/uploads/${arquivo_pdf}`, "_blank");
    } else {
      alert("PDF não encontrado para esta obra.");
    }
  };

  return (
    <>
      <Cabecalho>
        <CabecalhoEsquerda>
          <BotaoSimples back variant="secondary" className="btn-icone">
            <ArrowIcon />
            <span>Voltar</span>
          </BotaoSimples>
        </CabecalhoEsquerda>
        <CabecalhoCentro>
          <Logo />
        </CabecalhoCentro>
      </Cabecalho>
      <Linha />
      <ContainerBasico text="Suas Obras">
        <div style={{marginTop: '15px'}}>
          {Array.from({ length: Math.ceil(obras.length / 3) }).map((_, i) => {
            const grupo = obras.slice(i * 3, i * 3 + 3);
            return (
              <div
                key={i}
                className="flx"
                style={{
                  marginBottom: "20px",
                  justifyContent: "center",
                  gap: '8px'
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
                    onClick={() => abrirPDF(obra.arquivo_pdf)}
                  >
                    <LivroHome
                      src={obra.capa_url || "uploads/foto_capa_padrao.png"}
                    />
                    <h4
                      style={{
                        color: "var(--cor-principal)",
                        fontFamily: "Cinzel",
                        marginTop: "10px",
                        textAlign: "center",
                      }}
                    >
                      {obra.titulo}
                    </h4>
                  </div>
                ))}
              </div>
            );
          })}
          </div>
      </ContainerBasico>
    </>
  );
}

export default PaginaEstante;
