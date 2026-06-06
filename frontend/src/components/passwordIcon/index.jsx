import { LiaEye, LiaEyeSlash } from "react-icons/lia";
import { SC_BotaoPassword } from "./styles";

function EyeIcon({ aberto, onClick, className }) {
  return (
    <SC_BotaoPassword
      onClick={onClick}
      type="button"
      className={className}
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" ? onClick : undefined}
    >
      {!aberto ? <LiaEyeSlash size={25} /> : <LiaEye size={25} />}
    </SC_BotaoPassword>
  );
}

export default EyeIcon;
