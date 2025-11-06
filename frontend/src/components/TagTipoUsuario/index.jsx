import { SC_Tag } from './styles';

const Tag = ({tipo, marginLeft, marginTop, marginBottom}) => {
    return (
        <SC_Tag tipo={tipo} marginTop={marginTop} marginLeft={marginLeft} marginBottom={marginBottom}>
            {tipo}
        </SC_Tag>
    ); 
}

export default Tag;