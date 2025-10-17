import { SC_Tag } from './styles';

const Tag = ({tipo}) => {
    return (
        <SC_Tag tipo={tipo}>
            {tipo}
        </SC_Tag>
    ); 
}

export default Tag;