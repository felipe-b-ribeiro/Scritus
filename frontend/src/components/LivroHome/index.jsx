import { SC_LivroHome } from "./styles";

const LivroHome = ({src}) => {
    return (
        <SC_LivroHome>
            {src && <img style={{borderRadius: '15px'}} width='100%' height='100%' src={`http://localhost:5000${src}`} alt="Capa do Livro"/>}
        </SC_LivroHome>
    );
}

export default LivroHome;