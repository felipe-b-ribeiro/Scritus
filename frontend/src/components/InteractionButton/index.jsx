import { SC_ButtonInteracao } from "./styles";

const Index = ({ variant, onClick, icon, counter }) => {
  return (
    <SC_ButtonInteracao className={variant} onClick={onClick}>
      {icon}
      {counter}
    </SC_ButtonInteracao>
  );
};

export default Index;
