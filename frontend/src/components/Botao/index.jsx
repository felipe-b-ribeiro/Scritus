import SC_BotaoPrincipal from './styles';
import { useNavigateCustom } from '../../hooks/useNavigateCustom.js';

function Botao({ children, variant, to, back, ...props }) {

  const { goTo, goBack } = useNavigateCustom();

  const handleClick = () => {
    if (to) return goTo(to);
    if (back) return goBack();
    return null;
  }

  return (
    <SC_BotaoPrincipal variant={variant} onClick={handleClick} {...props}>
      {children}
    </SC_BotaoPrincipal>
  );
}

export default Botao;