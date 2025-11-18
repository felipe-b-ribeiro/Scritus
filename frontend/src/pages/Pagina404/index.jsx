import useTitulo from '../../hooks/useTitulo.js';
import Logo from '../../components/LogoScritus';
import Linha from '../../components/LinhaDegrade';
import BotaoSimples from '../../components/BotaoSimples';
import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from '../../components/Cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";
import ContainerPrincipal from '../../components/ContainerBasico';
import img404 from '../../assets/404.svg'; 
import { useNavigate } from 'react-router-dom';

function Pagina404() {

  useTitulo('Não encontrado - Scritus');
  const navigate = useNavigate();
  return (
    <>
      <Cabecalho>
        <CabecalhoCentro>
          <Logo />
        </CabecalhoCentro>
      </Cabecalho>
      <Linha />
      <ContainerPrincipal text='404' width='70vw'>
        <img width='50%' src={img404} alt="404 - Não Encontrado" />
        <BotaoSimples onClick={() => navigate(-3)} variant="secondary" className="btn-icone">
              <ArrowIcon />
              <span>Voltar</span>
        </BotaoSimples>
      </ContainerPrincipal>
    </>
  );
}

export default Pagina404;