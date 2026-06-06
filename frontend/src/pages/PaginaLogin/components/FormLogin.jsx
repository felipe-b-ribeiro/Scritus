import { Link } from "react-router-dom";
import BotaoSimples from "../../../components/BotaoSimples";
import ErrorHelper from "../../../components/ErrorHelper";
import InputBasico from "../../../components/InputBasico";
import EyeIcon from "../../../components/passwordIcon";
import { useLoginHook } from "../hooks/useLoginHook";

const FormLogin = () => {
  const {
    handleChange,
    handleSubmit,
    verificarErro,
    campos,
    senhaVisivel,
    setSenhaVisivel,
    errorHelperState,
    limparErros,
  } = useLoginHook();

  return (
    <form onSubmit={handleSubmit} noValidate>
      <InputBasico
        text="EMAIL"
        name="email"
        type="email"
        placeholder="Digite seu e-mail"
        onChange={handleChange}
        className={(verificarErro("email") && "input-error") || undefined}
        required
      >
        {verificarErro("email") && campos.email.erroMsg !== "" && (
          <ErrorHelper
            onClick={() => limparErros("email")}
            text={campos.email.erroMsg}
            className={errorHelperState}
          />
        )}
      </InputBasico>
      <InputBasico
        text="SENHA"
        name="senha"
        type={senhaVisivel ? "text" : "password"}
        placeholder="Digite sua senha"
        onChange={handleChange}
        className={(verificarErro("senha") && "input-error") || undefined}
        required
      >
        <EyeIcon
          aberto={!senhaVisivel}
          onClick={() => setSenhaVisivel(!senhaVisivel)}
          className="eye-icon"
        />
        {verificarErro("senha") && campos.senha.erroMsg !== "" && (
          <ErrorHelper
            onClick={() => limparErros("senha")}
            text={campos.senha.erroMsg}
            className={errorHelperState}
          />
        )}
      </InputBasico>

      <Link className="raleway" to="/cadastro">
        Não possui conta? <strong className="color-primary">Cadastre-se</strong>
      </Link>
      <BotaoSimples className="m-10" type="submit" text="Entrar" />
    </form>
  );
};

export default FormLogin;
