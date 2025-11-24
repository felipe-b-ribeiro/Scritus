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
import PaginaSplash from '../PaginaSplash';
import ContainerBasico from '../../components/ContainerBasico';
import livre from '../../assets/classificacao/livre.png';
import dez from '../../assets/classificacao/10.png';
import doze from '../../assets/classificacao/12.png';
import catorze from '../../assets/classificacao/14.png'
import dezesseis from '../../assets/classificacao/16.png';
import dezoito from '../../assets/classificacao/18.png';
import { SC_FotoPerfil, SC_NomeUsuario, SC_Pseudonimo } from './styles';
import fotoPadrao from '../../assets/foto_perfil_padrao.png';

function PaginaPerfil() {

    const { id_perfil } = useParams();
    const [perfil, setPerfil] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarPagina = async () => {
            try {
                
                const perfil = await fetch(`http://localhost:5000/api/v1/usuarios/perfil/${id_perfil}`);
                if (!perfil.ok) throw new Error('Erro ao buscar perfil.');
                const data = await perfil.json();
                setPerfil(data);
                console.log(data);
            } catch (err) {
                console.error('Erro ao carregar perfil: ', err);
            } finally {
                setLoading(false);
            }
        }
        carregarPagina();
    }, [] );

    useTitulo(`Perfil - Scritus`);

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
            <div className='flx' style={{alignItems:' center'}}>
            <SC_FotoPerfil src={perfil.foto_perfil_url ? `http://localhost:5000${perfil.foto_perfil_url}` : fotoPadrao} />
            <div>
            <SC_NomeUsuario>{perfil.nome_usuario}</SC_NomeUsuario>
            {perfil.tipo_usuario === 'Autor' && perfil.pseudonimo ? <SC_Pseudonimo>{perfil.pseudonimo}</SC_Pseudonimo> : null}
            </div>
            </div>
        </ContainerBasico>
        </>
    );
}

export default PaginaPerfil;