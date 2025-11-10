import { useEffect, useState } from "react";
import puxarDadosHook from "../../hooks/puxarDadosHook";
import useTitulo from "../../hooks/useTitulo";
import decodificarJWT from "../../utils/decodificarJWT";
import Logo from "../../components/LogoScritus";
import Linha from "../../components/LinhaDegrade";
import BotaoSimples from "../../components/BotaoSimples";
import { Cabecalho, CabecalhoCentro, CabecalhoEsquerda } from "../../components/Cabecalho";
import ArrowIcon from "../../components/icons/arrowIcon";
import ContainerBasico from "../../components/ContainerBasico";
import LivroHome from "../../components/LivroHome";
import PaginaSplash from "../PaginaSplash";
import DeleteModal from "../../components/DeleteModal";
import Overlay from "../../components/Overlay";
import livre from '../../assets/classificacao/livre.png';
import dez from '../../assets/classificacao/10.png';
import doze from '../../assets/classificacao/12.png';
import catorze from '../../assets/classificacao/14.png'
import dezesseis from '../../assets/classificacao/16.png';
import dezoito from '../../assets/classificacao/18.png';
import capaPadrao from '../../assets/foto_capa_padrao.png';
import TrashIcon from "../../components/icons/trashIcon";

function PaginaEstante() {
  const [obras, setObras] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [idObraSelecionada, setIdObraSelecionada] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const { puxarDados } = puxarDadosHook();

  useTitulo('Minhas Obras - Scritus');

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

  const abrirPDF = (pdf_url) => {
    if (pdf_url) {
      window.open(`http://localhost:5000${pdf_url}`, "_blank");
    } else {
      alert("PDF não encontrado para esta obra.");
    }
  };

  const handleCancelModal = () => {
    setOverlay(false);
    setDeleteModal(false);
  };

  const handleDeleteObra = async (obraId) => {
    try {
        const resposta = await fetch(`http://localhost:5000/api/v1/obra/${obraId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });

        if (resposta.ok) {
            alert("Obra deletada com sucesso!");
            // Atualize a lista de obras ou recarregue a página
            window.location.reload();
        } else {
            const data = await resposta.json();
            alert(`Erro ao deletar obra: ${data.mensagem || 'Erro desconhecido'}`);
        }
    } catch (err) {
        console.error("Erro ao deletar obra:", err);
    }
};

  const imgClassificacao = (idade) => {

    let imagem;

    switch (idade) {
      case 'Livre': imagem = livre; break;
      case '10': imagem = dez; break;
      case '12': imagem = doze; break;
      case '14': imagem = catorze; break;
      case '16': imagem = dezesseis; break;
      case '18': imagem = dezoito; break;
    }

    return imagem;
  }

  return (
    <> 
      { overlay && <Overlay />}
      { deleteModal && <DeleteModal msg='Deseja mesmo deletar a sua obra?' confirmClick={() => handleDeleteObra(idObraSelecionada)} cancelClick={handleCancelModal} />}
      <Cabecalho>
        <CabecalhoEsquerda>
          <BotaoSimples to='/home' variant="secondary" className="btn-icone">
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
          {obras.length === 0 ? (
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
              <h2 style={{color: 'var(--cor-principal)', fontWeight: 'normal', fontFamily: 'Cinzel'}}>
                Você ainda não cadastrou nenhuma obra!
              </h2>
              <BotaoSimples variant='secondary' to='/cadastrarobra'>Cadastrar Agora</BotaoSimples>
            </div>  )
               : Array.from({ length: Math.ceil(obras.length / 3) }).map((_, i) => {
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
                  >
                    <LivroHome
                      src={(!obra.capa_url || obra.capa_url === '[default]') ? capaPadrao : obra.capa_url}
                      onClick={() => abrirPDF(obra.pdf_url)}
                    >
                      <img style={{ zIndex: '5', position: 'relative', top: '-50px', left: '6px'}} width='40' height='40' src={imgClassificacao(obra.classificacao_indicativa)} alt="Classificação Indicativa" />
                      <button 
                      id="btnTrash"
                      type="button" 
                      style={{
                        zIndex: '5',
                        position: 'relative',
                        top: '-61px',
                        left: '10px',
                        border: 'none',
                        padding: '6px',
                        backgroundColor: 'red',
                        borderRadius: '7px',
                        cursor: 'pointer'
                        }}
                      onClick={() => {setOverlay(true); setDeleteModal(true); setIdObraSelecionada(obra.id_obra);}}>
                          <TrashIcon />
                        </button>
                    </LivroHome>
                    <h4
                      style={{
                        color: "var(--cor-principal)",
                        fontFamily: "Cinzel",
                        marginTop: "10px",
                        textAlign: "center",
                        maxWidth: '200px'
                      }}
                    >
                      {obra.titulo}
                    </h4>
                    <h6 style={{fontWeight: 'normal', fontFamily: 'Raleway', marginTop: '3px'}}>
                      {obra.status_obra}
                    </h6>
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
