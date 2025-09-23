
import Logo from '../../components/LogoScritus';
import Linha from '../../components/LinhaDegrade';
import Botao from '../../components/Botao';
import { Cabecalho, CabecalhoCentro, CabecalhoDireita, CabecalhoEsquerda } from '../../components/Cabecalho';
import ArrowIcon from "../../components/icons/arrowIcon";
import ContainerBasico from "../../components/ContainerBasico";
import InputBasico from "../../components/InputBasico";
import Card from "../../components/CardBasico";
import { useUserForm } from "./hooks/useUserForm";
import { TIPO_USUARIO, LABELS, TIPOS_INPUT, CAMPOS_POR_TIPO } from "../../constants/userConstants.js";
import { aplicarMascaraCNPJ } from '../../utils/mascaraCNPJ';

function PaginaCadastro() {

  const { tipoUsuario, forms, senhaError, handleChange, handleTipoUsuario, handleSubmit, cleanState, goBackIfUserNull } = useUserForm();
  
  const CAMPOS_SENHA = ["senha", "confirmarSenha"];

  const pegarInputsSenha = (campo) => CAMPOS_SENHA.includes(campo);

  function renderInputs() {

    if (!tipoUsuario) return null;


    console.log(CAMPOS_POR_TIPO[tipoUsuario]);
    return (
      CAMPOS_POR_TIPO[tipoUsuario].map(campo => (
        <InputBasico
          key={campo}
          name={campo}
          value={campo === 'cnpj' ? aplicarMascaraCNPJ(forms[tipoUsuario][campo] || "") : forms[tipoUsuario][campo] || ""}
          onChange={handleChange}
          text={LABELS[campo]}
          type={TIPOS_INPUT[campo]}
          required={campo !== "pseudonimo" && campo !== "siteOficial"} // campos opcionais
          className={(senhaError && pegarInputsSenha(campo)) ? "input-error" : ""}
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
        <form onSubmit={handleSubmit}>
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