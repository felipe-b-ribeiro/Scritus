import { useNavigate } from "react-router-dom";

import Logo from '../../components/logoScritus';
import Linha from '../../components/linhaDegrade';
import Botao from '../../components/Botao';
import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from '../../components/cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";

function PaginaCadastro() {

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

export default PaginaCadastro;