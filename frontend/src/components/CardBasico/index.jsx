import SC_CardBasico from "./styles";

function Card({ children, onClick, variant, ...props }) {
    return (
        <SC_CardBasico onClick={onClick} variant={variant} {...props}>
            {children}
        </SC_CardBasico>
    );
}

export default Card;
