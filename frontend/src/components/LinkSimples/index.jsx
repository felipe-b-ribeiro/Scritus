import { SC_LinkSimples } from './styles';
import { useNavigateCustom } from '../../hooks/useNavigateCustom.js';

const LinkSimples = ({children, to, ...props}) => {

    const { goTo } = useNavigateCustom();

    const handleClick = () => {
        return to ? goTo(to) : null;
    }

    return (
        <SC_LinkSimples onClick={handleClick} {...props}>
            {children}
        </SC_LinkSimples>
    );
}

export default LinkSimples;