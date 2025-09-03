import { useNavigate } from "react-router-dom";

import Logo from '../../components/LogoScritus';
import Linha from '../../components/LinhaDegrade';
import Botao from '../../components/Botao';
import { Cabecalho, CabecalhoCentro, CabecalhoEsquerda } from '../../components/Cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";
import ContainerBasico from "../../components/ContainerBasico";

function PaginaLogin() {

  const navigate = useNavigate();

  const voltar = () => {
    navigate(-1);
  };

  return (
    <>
      <Cabecalho>
        <CabecalhoEsquerda>
          <Botao $variant="secondary" className="btn-icone">
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
      <ContainerBasico>
        <form>
          <input type="email" placeholder="Digite seu e-mail" required />
          <input type="password" placeholder="Digite sua senha" required />
          <Botao type="submit">Entrar</Botao>
        </form>
      </ContainerBasico>
    </>
  );
}

export default PaginaLogin;