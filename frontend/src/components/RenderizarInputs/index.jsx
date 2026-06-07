import { aplicarMascaraCNPJ } from "../../utils/mascaraCNPJ";
import ErrorHelper from "../ErrorHelper";
import InputBasico from "../InputBasico";
import InputTextarea from "../InputTextarea";
import EyeIcon from "../passwordIcon";

function RenderizarInputs({
  tipoUsuario,
  camposValues,
  campos,
  handleChange,
  handleBlur,
  senhaVisivel,
  setSenhaVisivel,
  verificarErro,
}) {
  if (!campos) return null;
  if (!camposValues) return null;

  const hoje = new Date().toISOString().split("T")[0];

  return Object.entries(campos).map(([campo, meta]) => {
    const erroMsg = camposValues[campo].erroMsg;

    if (meta.tipo === "textarea") {
      return (
        <InputTextarea
          onChange={handleChange}
          text={meta.label}
          cols="20"
          rows="8"
          key={campo}
          name={campo}
          placeholder={meta.placeholder}
          value={
            camposValues[campo]?.valor === "null"
              ? ""
              : camposValues[campo].valor
          }
          tipoUsuario={tipoUsuario}
        />
      );
    }

    return (
      <InputBasico
        key={campo}
        id={campo}
        name={campo}
        value={
          meta.cnpj
            ? aplicarMascaraCNPJ(camposValues[campo].valor || "")
            : camposValues[campo].valor || ""
        }
        onChange={handleChange}
        onBlur={
          campo === "email" || campo === "nomeUsuario" || campo === "cnpj"
            ? (e) => handleBlur(campo, e.target.value)
            : undefined
        }
        onInvalid={(e) => e.preventDefault()}
        text={meta.label}
        inputMode={meta.inputmode}
        type={meta.senha && senhaVisivel[campo] ? "text" : meta.tipo}
        required={meta.required}
        className={
          verificarErro(campo) === "Erro"
            ? "input-error"
            : verificarErro(campo) === "Sucesso"
              ? "input-success"
              : ""
        }
        max={meta.data ? hoje : undefined}
        minLength={meta.minlength}
        tipoUsuario={tipoUsuario}
      >
        {meta.senha && (
          <EyeIcon
            className="eye-icon"
            aberto={!senhaVisivel[campo]}
            onClick={() =>
              setSenhaVisivel((prev) => ({ ...prev, [campo]: !prev[campo] }))
            }
          />
        )}
        {verificarErro(campo) && erroMsg ? (
          <ErrorHelper text={erroMsg} />
        ) : null}
      </InputBasico>
    );
  });
}
export default RenderizarInputs;
