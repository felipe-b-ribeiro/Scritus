import { Link } from "react-router-dom";
import useScreen from "../../hooks/useScreen.js";
import SC_BotaoPrincipal from "./styles.js";

function Botao({
  text,
  withMobileText,
  icon = undefined,
  variant = "primary",
  className = "",
  to = undefined,
  onClick = undefined,
  type = "button",
}) {

  const { isMobile, isPC } = useScreen();
  const mobileButton = icon && isMobile;
  const essentialProperties = !to && !onClick && !type;

  if (essentialProperties) {
    console.warn("Botão Simples: você precisa fornecer 'to', 'onClick' ou 'type'.");
    return null;
  }

  const classes = [variant, className, mobileButton ? "icon" : null].filter(Boolean).join(" ");

  return (
    <SC_BotaoPrincipal
      as={to ? Link : "button"}
      className={classes}
      to={to}
      onClick={onClick}
      type={!to ? type : undefined}
      tabIndex={0}
    >
      {icon && <span>{icon}</span>}
      {(!icon || isPC || withMobileText) && <span>{text}</span>}
    </SC_BotaoPrincipal>
  );
}

export default Botao;