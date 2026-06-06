import BotaoSimples from "../BotaoSimples";
import { SC_Container, SC_Linha, SC_Titulo } from "./styles";

const DeleteModal = ({ confirmClick, cancelClick, msg, state }) => {
  return (
    <SC_Container className={state}>
      <SC_Titulo>
        {msg} <strong>Essa ação é irreversível.</strong>
      </SC_Titulo>
      <SC_Linha />
      <div className="flex m-10 gap-8">
        <BotaoSimples onClick={confirmClick} variant="cancel2" text="Deletar" />
        <BotaoSimples onClick={cancelClick} variant="cancel" text="Cancelar" />
      </div>
    </SC_Container>
  );
};

export default DeleteModal;
