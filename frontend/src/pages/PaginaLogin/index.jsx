import { useNavigate } from "react-router-dom";

import './styles.css';
import Logo from '../../components/LogoScritus';
import Linha from '../../components/LinhaDegrade';
import Botao from '../../components/Botao';
import { Cabecalho, CabecalhoCentro, CabecalhoEsquerda } from '../../components/Cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";
import ContainerBasico from "../../components/ContainerBasico";
import InputBasico from "../../components/InputBasico";

function PaginaLogin() {

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
      <ContainerBasico text={"FAZER LOGIN"}>
         <form>
           <InputBasico text='EMAIL' type="email" placeholder="Digite seu e-mail" required />
           <InputBasico text='SENHA' type="password" placeholder="Digite sua senha" required />
           <Botao className="mt-0">
            <a>
            <span>Entrar</span>
            </a>
          </Botao>
         </form>
      </ContainerBasico>
    </>
  );
}

export default PaginaLogin;