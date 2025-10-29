import { SC_Linha, SC_Titulo, SC_Container } from "./styles";
import BotaoSimples from '../BotaoSimples';

const LogoutModal = ({confirmClick, cancelClick}) => {
    return (
        <SC_Container>
            <SC_Titulo>Você <strong>deseja mesmo</strong> sair?</SC_Titulo>
            <SC_Linha />
            <div className="flx">
                <BotaoSimples onClick={confirmClick} variant='cancel2'>Sair</BotaoSimples>
                <BotaoSimples onClick={cancelClick} variant='cancel'>Cancelar</BotaoSimples>
            </div>
        </SC_Container>
    );
};

export default LogoutModal;