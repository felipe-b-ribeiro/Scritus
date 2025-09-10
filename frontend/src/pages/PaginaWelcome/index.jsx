import './styles.js';

import Logo from '../../components/LogoScritus/index.jsx';
import Linha from '../../components/LinhaDegrade/index.jsx';
import Botao from '../../components/Botao';
import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from '../../components/Cabecalho/index.jsx';
import GuestIcon from '../../components/icons/guestIcon';
import SeparadorVertical from '../../components/separadorVertical';

function PaginaWelcome() {

  return (
    <>
      <Cabecalho>
        <CabecalhoEsquerda>
          <Botao to='/sobre-nos' variant="secondary" className="btn-icone">
              <GuestIcon />
              <span>SOBRE NÓS</span>
          </Botao>
        </CabecalhoEsquerda>
        <CabecalhoCentro>
          <Logo />
        </CabecalhoCentro>
        <CabecalhoDireita>
          <Botao to='/cadastro' variant="terciary">
          <span>CRIAR CONTA</span>
          </Botao>
          <SeparadorVertical />
          <Botao to='/login'>
            <span>FAZER LOGIN</span>
          </Botao>
        </CabecalhoDireita>
      </Cabecalho>
      <Linha />
    </>
  );
}

export default PaginaWelcome;
