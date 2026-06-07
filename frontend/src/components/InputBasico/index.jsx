import { SC_InputWrapper } from "./styles";

const InputBasico = ({ text, id, children, tipoUsuario, name, ...props }) => {
  return (
    <SC_InputWrapper className={tipoUsuario?.toLowerCase()}>
      <input id={id} name={name} {...props} />
      <label htmlFor={id}>{text}</label>
      {children}
    </SC_InputWrapper>
  );
};

export default InputBasico;
