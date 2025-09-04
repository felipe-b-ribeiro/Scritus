import { useNavigate } from "react-router-dom";

import Logo from '../../components/LogoScritus';
import Linha from '../../components/LinhaDegrade';
import Botao from '../../components/Botao';
import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from '../../components/Cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";

function PaginaSobreNos() {

  const navigate = useNavigate();

  const voltar = () => {
    navigate(-1);
  };

  return (
    <>
      <Cabecalho>
        <CabecalhoEsquerda>
          <Botao variant="secondary" className="btn-icone">
            <a onClick={voltar}>
              <ArrowIcon />
              <span>Voltar</span>
            </a>
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