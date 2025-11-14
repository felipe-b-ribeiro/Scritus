import SC_ContainerBasico from "./styles";

const ContainerBasico = ({ children, text, width, direction}) => {
    return (
        <SC_ContainerBasico width={width} direction={direction} >
            {text ? <h1 id="textContainer">{text}</h1> : null}
            {children}
        </SC_ContainerBasico>
    );
}

export default ContainerBasico;