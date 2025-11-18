import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useTitulo from "../../hooks/useTitulo";
import Logo from '../../components/LogoScritus';
import Linha from '../../components/LinhaDegrade';
import TagList from '../../components/Tag';
import BotaoSimples from '../../components/BotaoSimples';
import { Cabecalho, CabecalhoCentro, CabecalhoEsquerda } from '../../components/Cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";
import Arrow2Icon from '../../components/icons/arrow2Icon';
import HeartIcon from '../../components/icons/heartIcon';
import HeartFullfiledIcon from '../../components/icons/heartFullfiledIcon';
import SavedIcon from '../../components/icons/savedIcon';
import SavedFullfiledIcon from '../../components/icons/savedFullfiledIcon';
import ClickIcon from '../../components/icons/clickIcon';
import PaginaSplash from '../PaginaSplash';
import ContainerBasico from '../../components/ContainerBasico';
import livre from '../../assets/classificacao/livre.png';
import dez from '../../assets/classificacao/10.png';
import doze from '../../assets/classificacao/12.png';
import catorze from '../../assets/classificacao/14.png'
import dezesseis from '../../assets/classificacao/16.png';
import dezoito from '../../assets/classificacao/18.png';
import { SC_Wrapper, SC_MiniWrapper, SC_Button, SC_ButtonInteracao } from './styles';
import decodificarJWT from '../../utils/decodificarJWT';

function PaginaLivro() {

    const { id_obra } = useParams();
    const [idPerfil, setIdPerfil] = useState();
    const [obra, setObra] = useState();
    const [loading, setLoading] = useState(true);
    const [interacoes, setInteracoes] = useState({
        "curtida": false,
        "salvo": false,
        "clique": false,
        "comentario": false 
    });

    useTitulo(obra?.titulo && `${obra.titulo} - Scritus`);

    useEffect(() => {
        const carregarPagina = async () => {
            try {
                const resp = await fetch(`http://localhost:5000/api/v1/obra/${id_obra}`);
                if (!resp.ok) throw new Error('Erro ao buscar obra.');
                const token = localStorage.getItem('accessToken');
                const { id_perfil } = await decodificarJWT(token);
                setIdPerfil(id_perfil);
                const data = await resp.json();
                setObra(data);
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
        <ContainerBasico width='90vw' direction='row' align='normal' padding='20px'>
            <div style={{position: 'relative'}}>
                <img 
                src={`http://localhost:5000${obra.capa_url}`}
                width='440'
                height='600'
                alt="Capa do Livro"
                style={{
                    borderRadius: '20px',
                    border: '1px solid black'
                }}
                />
                <img 
                src={imgClassificacao(obra.classificacao_indicativa)}
                alt="Classificação Indicativa"
                width='60'
                height='60'
                style={{
                    position: 'absolute',
                    bottom: '18px',
                    left: '10px'
                }}
                />
            </div>
            <div style={{ borderRadius: '20px', marginLeft: '20px', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <SC_Wrapper>
                    <h1 style={{
                    fontFamily: 'Raleway',
                    marginLeft: '20px',
                    fontSize: '1.8em',
                    fontWeight: 'normal'
                    }}>
                    {obra.titulo}</h1><TagList tags={obra.tags} />
                    <div className='flx' style={{marginLeft: '20px', flexDirection: 'column'}}>
                        <div><p style={{fontFamily: 'Cinzel', color: 'var(--cor-principal)', marginBottom: '5px'}}>Escrito por:</p></div>
                        <div className='flx' style={{alignItems: 'center'}}>
                            <SC_MiniWrapper>
                                <img style={{borderRadius:'50%', border: '1px solid black'}} width='50' height='50' src={`http://localhost:5000${obra.foto_perfil_url}`} alt="Foto do Autor" />
                                <h5 style={{ marginLeft: '10px', fontSize: '1.3em', fontFamily: 'Raleway', fontWeight: 'normal'}}>{obra.pseudonimo ?? obra.nome_autor}</h5>
                            </SC_MiniWrapper>
                            <SC_ButtonInteracao onClick={() => setInteracoes({...interacoes, "curtida": !interacoes.curtida})} cor='red'>{interacoes.curtida ? <HeartFullfiledIcon /> : <HeartIcon />}9999</SC_ButtonInteracao>
                            <SC_ButtonInteracao onClick={() => setInteracoes({...interacoes, "salvo": !interacoes.salvo})} cor='blue'>{interacoes.salvo ? <SavedFullfiledIcon /> : <SavedIcon />}999</SC_ButtonInteracao>
                            <SC_ButtonInteracao nohover cor='black'><ClickIcon />999</SC_ButtonInteracao>
                        </div>
                    </div>
                </SC_Wrapper>
                <SC_Wrapper>
                    <p style={{ marginLeft: '20px', marginTop: '10px', marginBottom: '10px', fontFamily: 'Raleway'}}><b style={{color: 'var(--cor-principal)', fontWeight: 'normal', fontFamily: 'Cinzel'}}>Sinopse do livro:</b> <br />{obra.sinopse}</p>
                </SC_Wrapper>
                <SC_Button onClick={() => abrirPDF(obra.pdf_url)}>Ler Obra<Arrow2Icon /></SC_Button>
            </div>
        </ContainerBasico>
        </>
    );
}

export default PaginaLivro;