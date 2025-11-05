import { SC_Textarea, SC_TextareaWrapper } from "./styles";

const InputTextarea = ({ text, id, children, ...props }) => {
    
    
    return (
        <SC_TextareaWrapper>
            <SC_Textarea id={id} {...props} />
            <label htmlFor={id}>{text}</label>
            {children}
        </SC_TextareaWrapper>
    );
};

export default InputTextarea;
