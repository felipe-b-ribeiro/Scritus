import { Link } from 'react-router-dom';

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
          <Botao variant="secondary" className="btn-icone">
            <Link to="/sobre-nos">
              <GuestIcon />
              <span>SOBRE NÓS</span>
            </Link>
          </Botao>
        </CabecalhoEsquerda>
        <CabecalhoCentro>
          <Logo />
        </CabecalhoCentro>
        <CabecalhoDireita>
          <Botao variant="terciary">
            <Link to="/cadastro">Criar Conta</Link>
          </Botao>
          <SeparadorVertical />
          <Botao>
            <Link to="/login">Fazer Login</Link>
          </Botao>
        </CabecalhoDireita>
      </Cabecalho>
      <Linha />
    </>
  );
}

export default PaginaWelcome;
