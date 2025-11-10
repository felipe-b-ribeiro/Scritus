import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useTitulo from '../../hooks/useTitulo.js';
import Logo from '../../components/LogoScritus';
import Linha from '../../components/LinhaDegrade';
import BotaoSimples from '../../components/BotaoSimples';
import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from '../../components/Cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";
import Visualizador from '../../components/Visualizador';


function PaginaVisualizador() {
  const { id_obra } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const [capaUrl, setCapaUrl] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useTitulo('Sobre Nós - Scritus');

  useEffect(() => {
    const fetchObra = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const resposta = await fetch(`http://localhost:5000/api/v1/obra/pdf/${id_obra}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!resposta.ok) throw new Error('Erro ao buscar obra');

        const data = await resposta.json();
        setPdfUrl(data.pdf_url);
        setCapaUrl(data.capa_url);
      } catch (err) {
        console.error(err);
        setErro('Não foi possível carregar o PDF.');
      } finally {
        setCarregando(false);
      }
    };

    fetchObra();
  }, [id_obra]);

  if (carregando) return <p>Carregando PDF...</p>;
  if (erro) return <p>{erro}</p>;

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
      <Visualizador pdfUrl={pdfUrl} capaUrl={capaUrl} />
    </>
  );
}

export default PaginaVisualizador;
