import SC_CardBasico from "./styles";

function Card({ children, onClick, variant, className, ...props }) {
  return (
    <SC_CardBasico
      onClick={onClick}
      className={`${variant} ${className}`}
      {...props}
    >
      {children}
    </SC_CardBasico>
  );
}

export default Card;
