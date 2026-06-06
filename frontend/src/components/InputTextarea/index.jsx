import { SC_TextareaWrapper } from "./styles";

const InputTextarea = ({
  text,
  id,
  children,
  value,
  tipoUsuario,
  ...props
}) => {
  return (
    <SC_TextareaWrapper className={tipoUsuario?.toLowerCase()}>
      <textarea id={id} value={value == null ? "" : value} {...props} />
      <label htmlFor={id}>{text}</label>
      {children}
    </SC_TextareaWrapper>
  );
};

export default InputTextarea;
