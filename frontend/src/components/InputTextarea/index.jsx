import { SC_TextareaWrapper } from "./styles";

const InputTextarea = ({
  text,
  id,
  children,
  value,
  tipoUsuario,
  name,
  ...props
}) => {
  return (
    <SC_TextareaWrapper className={tipoUsuario?.toLowerCase()}>
      <textarea id={name} value={value == null ? "" : value} {...props} />
      <label htmlFor={name}>{text}</label>
      {children}
    </SC_TextareaWrapper>
  );
};

export default InputTextarea;
