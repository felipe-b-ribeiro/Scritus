import { SC_InputWrapper } from "./styles";

const InputBasico = ({ text, id, children, tipoUsuario, ...props }) => {
  return (
    <SC_InputWrapper className={tipoUsuario?.toLowerCase()}>
      <input id={id} {...props} />
      <label htmlFor={id}>{text}</label>
      {children}
    </SC_InputWrapper>
  );
};

export default InputBasico;
