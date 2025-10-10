import { useNavigate } from "react-router-dom";

import Logo from '../../components/LogoScritus';
import Linha from '../../components/LinhaDegrade';
import Botao from '../../components/Botao';
import { Cabecalho, CabecalhoCentro, CabecalhoEsquerda } from '../../components/Cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";
import ContainerBasico from "../../components/ContainerBasico";
import InputBasico from "../../components/InputBasico";

function PaginaLogin() {

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
      <ContainerBasico text={"FAZER LOGIN"}>
         <form>
           <InputBasico text='EMAIL' type="email" placeholder="Digite seu e-mail" required />
           <InputBasico text='SENHA' type="password" placeholder="Digite sua senha" required />
           <a href="">Esqueceu a senha?</a>
           <Botao>Entrar</Botao>
         </form>
      </ContainerBasico>
    </>
  );
}

export default PaginaLogin;