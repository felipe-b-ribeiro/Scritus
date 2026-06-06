import useNavigateCustom from "../../hooks/useNavigateCustom";
import { SC_LogoScritus } from "./styles";

function Logo({ to, reload }) {
  const { goTo } = useNavigateCustom();

  const onClick = () =>
    reload ? window.location.reload() : goTo(to || "/home");
  const role = reload ? "button" : "link";

  return (
    <SC_LogoScritus tabIndex={0} role={role} onClick={onClick}>
      ScRi<strong>tUS</strong>
    </SC_LogoScritus>
  );
}

export default Logo;
