import { IoPeopleCircle } from "react-icons/io5";
import BotaoSimples from "../../../components/BotaoSimples";

const AboutUsButton = () => {
  return (
    <BotaoSimples
      to="/sobre-nos"
      variant="secondary"
      text="SOBRE NÓS"
      icon={<IoPeopleCircle color={"var(--cor-secundaria)"} size={25} />}
    />
  );
};

export default AboutUsButton;
