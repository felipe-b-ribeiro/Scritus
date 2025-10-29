import { useLoginHook } from './hooks/useLoginHook';
import { useState } from 'react';

import Logo from '../../components/LogoScritus';
import Linha from '../../components/LinhaDegrade';
import BotaoSimples from '../../components/BotaoSimples';
import { Cabecalho, CabecalhoCentro, CabecalhoEsquerda } from '../../components/Cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";
import EyeIcon from '../../components/icons/passwordIcon';
import ContainerBasico from "../../components/ContainerBasico";
import InputBasico from "../../components/InputBasico";
import LinkSimples from '../../components/LinkSimples';
import ErrorHelper from '../../components/ErrorHelper';


const PaginaLogin = () => {

  const [senhaVisivel, setSenhaVisivel] = useState(false);

  const { handleChange, handleSubmit, verificarErro, campos } = useLoginHook();

  return (
    <>
      <Cabecalho>
        <CabecalhoEsquerda>
          <BotaoSimples back variant="secondary" className="btn-icone">
              <ArrowIcon />
              <span>Voltar</span>
          </BotaoSimples>
        </CabecalhoEsquerda>
        <CabecalhoCentro>
          <Logo />
        </CabecalhoCentro>
      </Cabecalho>
      <Linha />
      <ContainerBasico text="Fazer Login">
         <form onSubmit={handleSubmit} noValidate>
           <InputBasico 
            text='EMAIL'
            name='email'
            type="email"
            placeholder="Digite seu e-mail"
            onChange={handleChange}
            className={verificarErro('email') && 'input-error' || undefined}
            required 
           >
           { verificarErro('email') && campos.email.erroMsg != "" ? <ErrorHelper text={campos.email.erroMsg}/> : null }
           </InputBasico>
           <InputBasico
            text='SENHA'
            name='senha'
            type={senhaVisivel ? "text" : "password"}
            placeholder="Digite sua senha"
            onChange={handleChange}
            className={verificarErro('senha') && 'input-error' || undefined}
            required
           >
            <EyeIcon aberto={!senhaVisivel} onClick={() => setSenhaVisivel(!senhaVisivel)} />
            { verificarErro('senha') && campos.senha.erroMsg != "" ? <ErrorHelper text={campos.senha.erroMsg}/> : null } 
           </InputBasico>
           
           <LinkSimples to='/cadastro'><strong>Não possui conta?</strong> Cadastre-se</LinkSimples>
           <BotaoSimples type='submit'>Entrar</BotaoSimples>
         </form>
      </ContainerBasico>
    </>
  );
}

export default PaginaLogin;