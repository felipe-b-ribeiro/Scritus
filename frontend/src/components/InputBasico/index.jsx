import { SC_InputBasico, SC_InputWrapper } from "./styles";

const InputBasico = ({ text, id, children, ...props }) => {
    
    
    return (
        <SC_InputWrapper>
            <SC_InputBasico id={id} {...props} />
            <label htmlFor={id}>{text}</label>
            {children}
        </SC_InputWrapper>
    );
};

export default InputBasico;
