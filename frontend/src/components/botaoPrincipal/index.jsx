import SC_BotaoPrincipal from './styles';

function Botao({ children, className }) {
  return (
    <SC_BotaoPrincipal className={className}>
        {children}
    </SC_BotaoPrincipal>
  );
}

export default Botao;