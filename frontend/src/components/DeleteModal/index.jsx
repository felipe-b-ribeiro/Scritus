import { SC_Linha, SC_Titulo, SC_Container } from "./styles";
import BotaoSimples from '../BotaoSimples';

const DeleteModal = ({confirmClick, cancelClick}) => {
    return (
        <SC_Container>
            <SC_Titulo>Deseja deletar mesmo a sua conta? <strong>Essa ação é irreversível.</strong></SC_Titulo>
            <SC_Linha />
            <div className="flx">
                <BotaoSimples onClick={confirmClick} variant='cancel2'>Deletar</BotaoSimples>
                <BotaoSimples onClick={cancelClick} variant='cancel'>Cancelar</BotaoSimples>
            </div>
        </SC_Container>
    );
};

export default DeleteModal;