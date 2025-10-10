import SC_ContainerBasico from "./styles";

const ContainerBasico = ({ children, text, width }) => {
    return (
        <SC_ContainerBasico width={width}>
            <h1>{text}</h1>
            {children}
        </SC_ContainerBasico>
    );
}

export default ContainerBasico;