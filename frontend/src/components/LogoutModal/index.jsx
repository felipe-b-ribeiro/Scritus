import BotaoSimples from "../BotaoSimples";
import { SC_Container } from "./styles";

const LogoutModal = ({ confirmClick, cancelClick, state }) => {
  return (
    <SC_Container className={state}>
      <p className="popupTitle">
        Você <strong>deseja mesmo</strong> sair?
      </p>
      <hr className="popupLine" />
      <div className="flex m-10 gap-8">
        <BotaoSimples onClick={confirmClick} variant="cancel2" text="Sair" />
        <BotaoSimples onClick={cancelClick} variant="cancel" text="Cancelar" />
      </div>
    </SC_Container>
  );
};

export default LogoutModal;
