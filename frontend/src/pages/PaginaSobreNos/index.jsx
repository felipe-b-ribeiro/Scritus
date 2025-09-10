import { useNavigate } from "react-router-dom";

import Logo from '../../components/LogoScritus';
import Linha from '../../components/LinhaDegrade';
import Botao from '../../components/Botao';
import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from '../../components/Cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";

function PaginaSobreNos() {

  return (
    <>
      <Cabecalho>
        <CabecalhoEsquerda>
          <Botao back variant="secondary" className="btn-icone">
              <ArrowIcon />
              <span>Voltar</span>
          </Botao>
        </CabecalhoEsquerda>
        <CabecalhoCentro>
          <Logo />
        </CabecalhoCentro>
      </Cabecalho>
      <Linha />
    </>
  );
}

export default PaginaSobreNos;