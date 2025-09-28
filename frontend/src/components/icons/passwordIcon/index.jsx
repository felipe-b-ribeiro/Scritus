import { SC_BotaoPassword } from './styles';
import eyeOpen from '../../../assets/icons/eyeOpen.svg';
import eyeClosed from '../../../assets/icons/eyeClosed.svg';

function EyeIcon({aberto, onClick}) {
  return (
    <SC_BotaoPassword onClick={onClick} type='button'>
      <img
        width="25"
        height="25"
        src={aberto ? eyeOpen : eyeClosed}
        alt={aberto ? "Mostrar Senha" : "Esconder Senha"}
      />
    </SC_BotaoPassword>
  );
}

export default EyeIcon;
