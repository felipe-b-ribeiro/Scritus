import { MdOutlineLogout } from "react-icons/md";
import { SC_BotaoLogout, SC_Wrapper } from "./styles";

const BotaoLogout = ({ onClick, children }) => {
  return (
    <SC_Wrapper>
      <SC_BotaoLogout onClick={onClick}>
        <MdOutlineLogout size={30} color="white" />
        <span>SAIR</span>
      </SC_BotaoLogout>
      {children}
    </SC_Wrapper>
  );
};

export default BotaoLogout;
