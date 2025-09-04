import SC_ContainerBasico from "./styles";

const ContainerBasico = ({ children, text }) => {
    return (
        <SC_ContainerBasico>
            <h1>{text}</h1>
            {children}
        </SC_ContainerBasico>
    );
}

export default ContainerBasico;