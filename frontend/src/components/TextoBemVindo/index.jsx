import { SC_Img, SC_Wrapper, SC_Texto } from './styles';
import ImgPadrao from '../../assets/foto_perfil_padrao.png';

const TextoBemVindo = ({src, usuario}) => {
    return (
        <SC_Wrapper>
            <a href="/perfil">
                <SC_Img src={src || ImgPadrao} role='button'/>
            </a>
            <SC_Texto>
                Bem vindo, <strong>{usuario}</strong>
            </SC_Texto>
        </SC_Wrapper>
    );
}

export default TextoBemVindo;