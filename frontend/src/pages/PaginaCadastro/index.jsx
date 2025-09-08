import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Logo from '../../components/logoScritus';
import Linha from '../../components/linhaDegrade';
import Botao from '../../components/Botao';
import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from '../../components/cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";
import ContainerBasico from "../../components/ContainerBasico";
import InputBasico from "../../components/InputBasico";
import Card from "../../components/CardBasico";
import { useUserForm } from "./hooks/useUserForm";
import { TIPO_USUARIO, LABELS, TIPOS_INPUT, CAMPOS_POR_TIPO, FORMS_INICIAIS } from "../../constants/userConstants";


function PaginaCadastro() {

  const { tipoUsuario, camposAtuais, handleChange, handleTipoUsuario, cleanState } = useUserForm();
  const navigate = useNavigate();

  function voltar() {
    if (!tipoUsuario) {
      navigate(-1);
    } 
    else {
    handleTipoUsuario("");
    }
  };

  function renderInputs() {

    if (!tipoUsuario) return null;

    return (
      CAMPOS_POR_TIPO[tipoUsuario].map(campo => (
        <InputBasico
          key={campo}
          name={campo}
          value={camposAtuais[campo] || ""}
          onChange={handleChange}
          text={LABELS[campo]}
          type={TIPOS_INPUT[campo]}
          required={campo !== "pseudonimo" && campo !== "siteOficial"} // campos opcionais
        />

      )));

  }

  function renderCards() {
    if (!tipoUsuario) {
      return (
        <ContainerBasico text="O QUE VOCÊ BUSCA NO SCRITUS?">
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
      <ContainerBasico text={`CRIAR CONTA DE ${tipoUsuario.toUpperCase()}`}>
        <form>
          {renderInputs()}
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Botao variant={'secondary'} type='button' onClick={cleanState}><a>Cancelar</a></Botao>
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
          <Botao variant="secondary" onClick={voltar} className="btn-icone">
            <a>
              <ArrowIcon aria-label="Voltar" />
              <span>Voltar</span>
            </a>
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