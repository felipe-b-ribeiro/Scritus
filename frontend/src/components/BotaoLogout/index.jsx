import { SC_BotaoLogout, SC_Wrapper } from "./styles";
import ArrowIcon from "../icons/arrowIcon";


const BotaoLogout = ({onClick, children}) => {
    return (
        <SC_Wrapper>
            <SC_BotaoLogout onClick={onClick}>
            <ArrowIcon />
            <span>SAIR</span>
            </SC_BotaoLogout>
            {children}
        </SC_Wrapper>
    );
}

export default BotaoLogout;