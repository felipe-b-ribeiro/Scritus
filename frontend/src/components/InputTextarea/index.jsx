import { SC_Textarea, SC_TextareaWrapper } from "./styles";

const InputTextarea = ({ text, id, children, value, ...props }) => {
    
    
    return (
        <SC_TextareaWrapper>
            <SC_Textarea id={id} value={value} {...props} />
            <label htmlFor={id}>{text}</label>
            {children}
        </SC_TextareaWrapper>
    );
};

export default InputTextarea;
