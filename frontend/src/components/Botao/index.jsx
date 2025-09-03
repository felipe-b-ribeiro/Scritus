import SC_BotaoPrincipal from './styles';

function Botao({ children, variant, ...props }) {
  return (
    <SC_BotaoPrincipal variant={variant} {...props}>
        {children}
    </SC_BotaoPrincipal>
  );
}

export default Botao;