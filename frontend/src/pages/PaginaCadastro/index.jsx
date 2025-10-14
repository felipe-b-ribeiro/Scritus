// 1. Bibliotecas externas
import { useState } from "react";

// 2. Hooks customizados
import { useUserForm } from "./hooks/useUserForm";

// 3. Constants
import { TIPO_USUARIO, CAMPOS } from "../../constants/userConstants.js";

// 4. Utils/helpers
import { aplicarMascaraCNPJ } from "../../utils/mascaraCNPJ";

// 5. Componentes globais
import Logo from "../../components/LogoScritus";
import Linha from "../../components/LinhaDegrade";
import Botao from "../../components/Botao";
import ContainerBasico from "../../components/ContainerBasico";
import InputBasico from "../../components/InputBasico";
import Card from "../../components/CardBasico";
import ErrorHelper from '../../components/ErrorHelper';

// 6. Componentes de layout / específicos
import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from "../../components/Cabecalho";
import ArrowIcon from "../../components/icons/arrowIcon";
import EyeIcon from "../../components/icons/passwordIcon";



function PaginaCadastro() {

  const { tipoUsuario, forms, errorMsg, verificarErro, handleChange, handleFocus, handleBlur, handleTipoUsuario, handleSubmit, cleanState, goBackIfUserNull } = useUserForm();

  const [senhaVisivel, setSenhaVisivel] = useState({
    'senha': false,
    'confirmarSenha': false
  });

  function renderInputs() {

    if (!tipoUsuario) return null;

    const hoje = new Date().toISOString().split('T')[0];
    
    return Object.entries(CAMPOS[tipoUsuario]).map(([campo, meta]) => {

    const erroMsg = forms[tipoUsuario][campo].erroMsg;

      return (
          <InputBasico
            key={campo}
            name={campo}
            value={
              meta.cnpj
                ? aplicarMascaraCNPJ(forms[tipoUsuario][campo].valor || "")
                : forms[tipoUsuario][campo].valor || ""
            }
            onChange={handleChange}
            onFocus={() => handleFocus(campo)}
            onBlur={campo === 'email' || campo === 'nomeUsuario' || campo === 'cnpj' ? (e) => handleBlur(campo, e.target.value) : undefined}
            onInvalid={(e) => e.preventDefault()}
            text={meta.label}
            type={meta.senha && senhaVisivel[campo] ? 'text' : meta.tipo}
            required={meta.required}
            className={verificarErro(campo) === "Erro" ? "input-error" : verificarErro(campo) === "Sucesso" ? "input-success" : ""}
            max={meta.data ? hoje : undefined}
            minLength={meta.minlength}
          >
            {meta.senha && <EyeIcon aberto={!senhaVisivel[campo]} onClick={() => setSenhaVisivel(prev => ({ ...prev, [campo]: !prev[campo] }))} />}
            {verificarErro(campo) && erroMsg ? <ErrorHelper text={erroMsg}/> : null}
          </InputBasico>
      );
    });
  }

  function renderCards() {
    if (!tipoUsuario) {
      return (
        <ContainerBasico text="O que você busca no Scritus?">
          <Card variant='primary' onClick={() => handleTipoUsuario(TIPO_USUARIO.LEITOR)} role='button' tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') handleState(TIPO_USUARIO.LEITOR); }}>
            <h2>Sou leitor</h2>
            <h5>e quero ler livros profundos e impactantes.</h5>
          </Card>
          <Card variant='secondary' onClick={() => handleTipoUsuario(TIPO_USUARIO.AUTOR)} role='button' tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') handleState(TIPO_USUARIO.AUTOR); }}>
            <h2>Sou autor</h2>
            <h5>e quero mostrar meus livros profissionalmente.</h5>
          </Card>
          <Card variant='terciary' onClick={() => handleTipoUsuario(TIPO_USUARIO.EDITORA)} role='button' tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') handleState(TIPO_USUARIO.EDITORA); }}>
            <h2>Sou editora</h2>
            <h5>e quero garimpar verdadeiras obras-primas.</h5>
          </Card>
        </ContainerBasico>
      );
    }

    return (
      <ContainerBasico text={`Criar conta de ${tipoUsuario}`}>
        <form onSubmit={handleSubmit} noValidate>
          {renderInputs()}
          <div className='flx space-a'>
            <Botao variant={'cancel'} type='button' onClick={cleanState}><a>Cancelar</a></Botao>
            <Botao variant={'primary'} type='submit'><a>Criar Conta</a></Botao>
          </div>
        </form>
      </ContainerBasico>
    );
  }

  return (
    <>
      <Cabecalho>
        <CabecalhoEsquerda>
          <Botao variant="secondary" onClick={goBackIfUserNull}>
            <ArrowIcon aria-label="Voltar" />
            <span>Voltar</span>
          </Botao>
        </CabecalhoEsquerda>
        <CabecalhoCentro>
          <Logo />
        </CabecalhoCentro>
      </Cabecalho>
      <Linha />

      {renderCards()}
    </>
  );
}

export default PaginaCadastro;