import { Link } from 'react-router-dom';

import './styles.js';
import Logo from '../../components/logoScritus';
import Linha from '../../components/linhaDegrade';
import Botao from '../../components/Botao';
import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from '../../components/cabecalho';
import GuestIcon from '../../components/icons/guestIcon';

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
          <Botao>
            <Link to="/cadastro">Criar Conta</Link>
          </Botao>
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
