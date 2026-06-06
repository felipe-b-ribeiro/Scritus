import BotaoSimples from "../BotaoSimples";
import { SC_Container, SC_Titulo } from "./styles";

const GenericModal = ({ confirmClick, cancelClick, msg, state }) => {
  return (
    <SC_Container className={state}>
      <SC_Titulo>
        {msg}
      </SC_Titulo>
      <div className="flex m-10 gap-8">
        <BotaoSimples onClick={confirmClick} variant="cancel2" text="Deletar" />
        <BotaoSimples onClick={cancelClick} variant="cancel" text="Cancelar" />
      </div>
    </SC_Container>
  );
};

export default GenericModal;
