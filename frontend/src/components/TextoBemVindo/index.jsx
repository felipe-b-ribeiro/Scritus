import { Link } from 'react-router-dom';
import useScreen from "../../hooks/useScreen";
import { SC_Img, SC_Texto, SC_Wrapper } from "./styles";

const TextoBemVindo = ({ src, usuario }) => {
  const { isMobile } = useScreen();

  return (
    <SC_Wrapper>
      <Link to='/perfil'>
        <SC_Img src={src}/>
      </Link>
      {!isMobile && (
        <SC_Texto>
          Bem vindo, <strong>{usuario}</strong>
        </SC_Texto>
      )}
    </SC_Wrapper>
  );
};

export default TextoBemVindo;
