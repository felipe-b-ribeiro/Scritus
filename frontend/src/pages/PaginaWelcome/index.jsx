
import Logo from '../../components/LogoScritus/index.jsx';
import Linha from '../../components/LinhaDegrade/index.jsx';
import BotaoSimples from '../../components/BotaoSimples';
import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from '../../components/Cabecalho/index.jsx';
import GuestIcon from '../../components/icons/guestIcon';
import SeparadorVertical from '../../components/separadorVertical';
import Banner from '../../assets/banner.png';

function PaginaWelcome() {

  return (
    <>
      <Cabecalho>
        <CabecalhoEsquerda>
          <BotaoSimples to='/sobre-nos' variant="secondary" className="btn-icone">
              <GuestIcon />
              <span>SOBRE NÓS</span>
          </BotaoSimples>
        </CabecalhoEsquerda>
        <CabecalhoCentro>
          <Logo />
        </CabecalhoCentro>
        <CabecalhoDireita>
          <BotaoSimples to='/cadastro' variant="terciary">
          <span>CRIAR CONTA</span>
          </BotaoSimples>
          <SeparadorVertical />
          <BotaoSimples to='/login'>
            <span>FAZER LOGIN</span>
          </BotaoSimples>
        </CabecalhoDireita>
      </Cabecalho>
      <Linha />
      <img width='100%' height='100%' src={Banner} alt="Banner Principal" />
    </>
  );
}

export default PaginaWelcome;
