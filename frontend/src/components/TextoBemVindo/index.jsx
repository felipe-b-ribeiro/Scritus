import { SC_Img, SC_Wrapper, SC_Texto } from './styles';
import ImgPadrao from '../../assets/foto_perfil_padrao.png';

const TextoBemVindo = ({src, usuario}) => {
    return (
        <SC_Wrapper>
            <SC_Img src={ImgPadrao || src} role='button'/>
            <SC_Texto>
                Bem vindo, <strong>{usuario}</strong>
            </SC_Texto>
        </SC_Wrapper>
    );
}

export default TextoBemVindo;