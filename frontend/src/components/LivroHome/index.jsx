import { SC_LivroHome } from "./styles";
import capaPadrao from "../../assets/foto_capa_padrao.png";

const LivroHome = ({src, children, onClick}) => {
    return (
        <SC_LivroHome >
            {src && <img onClick={onClick} style={{borderRadius: '15px', cursor: 'pointer'}} width='100%' height='100%' src={src === '/src/assets/foto_capa_padrao.png' ? capaPadrao : `http://localhost:5000${src}`} alt="Capa do Livro"/>}
            {children}
        </SC_LivroHome>
    );
}

export default LivroHome;