import { SC_LinkSimples } from './styles';

const LinkSimples = ({children}) => {

    return (
        <SC_LinkSimples onClick={handleClick}>
            {children}
        </SC_LinkSimples>
    );
}

export default LinkSimples;