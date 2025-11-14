import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTitulo from "../../hooks/useTitulo";
import Logo from '../../components/LogoScritus';
import Linha from '../../components/LinhaDegrade';
import BotaoSimples from '../../components/BotaoSimples';
import { Cabecalho, CabecalhoCentro, CabecalhoEsquerda } from '../../components/Cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";
import PaginaSplash from '../PaginaSplash';
import ContainerBasico from '../../components/ContainerBasico';
import livre from '../../assets/classificacao/livre.png';
import dez from '../../assets/classificacao/10.png';
import doze from '../../assets/classificacao/12.png';
import catorze from '../../assets/classificacao/14.png'
import dezesseis from '../../assets/classificacao/16.png';
import dezoito from '../../assets/classificacao/18.png';

function PaginaLivro() {

    const { id_obra } = useParams();
    const [obra, setObra] = useState();
    const [loading, setLoading] = useState(true);

    useTitulo('Livro - Scritus');

    useEffect(() => {
        const carregarPagina = async () => {
            try {
                const resp = await fetch(`http://localhost:5000/api/v1/obra/${id_obra}`);
                if (!resp.ok) throw new Error('Erro ao buscar obra.');
                const data = await resp.json();
                setObra(data);
                console.log(data);
            } catch (err) {
                console.error('Erro ao carregar página: ', err);
            } finally {
                setLoading(false);
            }
        }
        carregarPagina();
    }, [] );

    const abrirPDF = (pdf_url) => {
    if (pdf_url) {
      window.open(`http://localhost:5000${pdf_url}`, "_blank");
    } else {
      alert("PDF não encontrado para esta obra.");
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

    if (loading) return <PaginaSplash />;

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
        <ContainerBasico width='80vw' direction='row'>
            <div style={{position: 'relative'}}>
                <img 
                src={`http://localhost:5000${obra.capa_url}`}
                width='440'
                height='600'
                alt="Capa do Livro"
                style={{
                    borderRadius: '20px',
                    margin: '20px 0 10px 0',
                    border: '1px solid black'
                }}
                />
                <img 
                src={imgClassificacao(obra.classificacao_indicativa)}
                alt="Classificação Indicativa"
                width='70'
                height='70'
                style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '10px'
                }}
                />
            </div>
            <div style={{backgroundColor: '#eee', padding: '20px 20px 20px 0', borderRadius: '20px', marginLeft: '20px'}}>
                <h1 style={{
                    fontFamily: 'Cinzel',
                    color: 'var(--cor-principal)',
                    marginLeft: '20px',
                    fontSize: '1.8em'
                }}>
                {obra.titulo}</h1>
                <div className='flx' style={{marginLeft: '20px', alignItems: 'center'}}>
                    <img style={{borderRadius:'50%', border: '1px solid black'}} width='50' height='50' src={`http://localhost:5000${obra.foto_perfil_url}`} alt="Foto do Autor" />
                    <h4 style={{ marginLeft: '10px', fontSize: '1.3em'}}>{obra.pseudonimo ?? obra.nome_autor}</h4>
                </div>
                <p style={{fontFamily: 'Cinzel', marginLeft: '20px', marginTop: '10px', marginBottom: '10px'}}><b style={{color: 'var(--cor-principal)'}}>Sinopse:</b> <br />{obra.sinopse}</p>
                <button style={{marginLeft: '20px', border: '1px solid black', padding: '10px', borderRadius: '10px', backgroundColor: 'var(--cor-principal)', color: 'white', fontFamily: 'Cinzel', cursor: 'pointer'}} onClick={() => abrirPDF(obra.pdf_url)}>Ler Livro</button>
            </div>
        </ContainerBasico>
        </>
    );
}

export default PaginaLivro;