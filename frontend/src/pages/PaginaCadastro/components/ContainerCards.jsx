import { Link } from "react-router-dom";
import CardAutor from "../../../assets/card/card-autor.webp";
import CardEditora from "../../../assets/card/card-editora.webp";
import CardLeitor from "../../../assets/card/card-leitor.webp";
import BotaoSimples from "../../../components/BotaoSimples";
import Card from "../../../components/CardBasico";
import ContainerBasico from "../../../components/ContainerBasico";
import RenderizarInputs from "../../../components/RenderizarInputs";
import { CAMPOS, TIPO_USUARIO } from "../../../constants/userConstants.js";
import useScreen from "../../../hooks/useScreen";
import useUserForm from "../hooks/useUserForm";

function ContainerCards() {
  const {
    cleanState,
    criarContaRef,
    forms,
    handleBlur,
    handleChange,
    handleSubmit,
    handleTipoUsuario,
    scrollarAteFinalContainer,
    senhaVisivel,
    setSenhaVisivel,
    tipoUsuario,
    verificarErro,
  } = useUserForm();

  const { isMobile, isPC, isTablet } = useScreen();

  return (
    <section
      className={`flex ${isMobile || isTablet ? "flex-column" : "flex-row"}`}
    >
      <ContainerBasico
        width="40vw"
        text="Qual seu objetivo aqui?"
        className={`normalCards ${tipoUsuario && isPC && "mr-6vw"}`}
      >
        <Card
          className={tipoUsuario === TIPO_USUARIO.LEITOR ? "selected" : ""}
          variant="primary"
          onClick={() => {
            handleTipoUsuario(TIPO_USUARIO.LEITOR);
            scrollarAteFinalContainer();
          }}
          role="button"
          tabIndex={0}
          aria-selected={tipoUsuario === TIPO_USUARIO.LEITOR}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTipoUsuario(TIPO_USUARIO.LEITOR);
          }}
        >
          <h2>Sou leitor</h2>
          <h5>e quero ler livros profundos e impactantes.</h5>
          <img src={CardLeitor} alt="Foto do Card de Leitor" />
        </Card>
        <Card
          variant="secondary"
          className={tipoUsuario === TIPO_USUARIO.AUTOR ? "selected" : ""}
          onClick={() => {
            handleTipoUsuario(TIPO_USUARIO.AUTOR);
            scrollarAteFinalContainer();
          }}
          role="button"
          tabIndex={0}
          aria-selected={tipoUsuario === TIPO_USUARIO.AUTOR}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTipoUsuario(TIPO_USUARIO.AUTOR);
          }}
        >
          <h2>Sou autor</h2>
          <h5>e quero mostrar meus livros profissionalmente.</h5>
          <img src={CardAutor} alt="Foto do Card de Autor" />
        </Card>
        <Card
          variant="tertiary"
          className={tipoUsuario === TIPO_USUARIO.EDITORA ? "selected" : ""}
          onClick={() => {
            handleTipoUsuario(TIPO_USUARIO.EDITORA);
            scrollarAteFinalContainer();
          }}
          role="button"
          aria-selected={tipoUsuario === TIPO_USUARIO.EDITORA}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleTipoUsuario(TIPO_USUARIO.EDITORA);
          }}
        >
          <h2>Sou editora</h2>
          <h5>e quero garimpar verdadeiras obras-primas.</h5>
          <img src={CardEditora} alt="Foto do Card de Editora" />
        </Card>
      </ContainerBasico>
      <ContainerBasico
        className={`${!tipoUsuario ? "hidden" : "enteringCards"} ${isPC && "mt-10vh ml-0"}`}
        width="32vw"
        text={`Criar conta de ${tipoUsuario}`}
        ref={criarContaRef}
        tipoUsuario={tipoUsuario}
      >
        <form onSubmit={handleSubmit} noValidate>
          <RenderizarInputs
            tipoUsuario={tipoUsuario}
            campos={CAMPOS[tipoUsuario]}
            camposValues={forms[tipoUsuario]}
            handleChange={handleChange}
            handleBlur={handleBlur}
            senhaVisivel={senhaVisivel}
            setSenhaVisivel={setSenhaVisivel}
            verificarErro={verificarErro}
          />
          <Link className="raleway" to="/login">
            Já tem uma conta?<strong className="color-primary"> Entrar</strong>
          </Link>
          <div className="flex justify-around gap-8 m-10">
            <BotaoSimples
              variant="cancel"
              type="reset"
              onClick={cleanState}
              text="Cancelar"
            />
            <BotaoSimples variant="primary" type="submit" text="Criar Conta" />
          </div>
        </form>
      </ContainerBasico>
    </section>
  );
}
export default ContainerCards;
