import SC_ContainerBasico from "./styles";

const ContainerBasico = ({
  children,
  text,
  width,
  tipoUsuario,
  className,
  ref,
}) => {
  return (
    <SC_ContainerBasico width={width} className={className} ref={ref}>
      {text ? (
        <h1 id="textContainer" className={tipoUsuario?.toLowerCase()}>
          {text}
        </h1>
      ) : null}
      {children}
    </SC_ContainerBasico>
  );
};

export default ContainerBasico;
