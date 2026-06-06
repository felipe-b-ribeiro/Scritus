import { MdArrowBack } from "react-icons/md";
import BotaoSimples from "../BotaoSimples";
import useNavigateCustom from "../../hooks/useNavigateCustom";

const BackButton = () => {
  
  const { goBack } = useNavigateCustom();
   
  return (
    <BotaoSimples
      variant="secondary"
      text="Voltar"
      onClick={goBack}
      icon={<MdArrowBack color={"var(--cor-secundaria)"} size={25} />}
    />
  );
};

export default BackButton;
