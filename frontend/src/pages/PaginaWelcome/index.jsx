import Header from "../../components/Header";
import Linha from "../../components/LinhaDegrade";
import Logo from "../../components/LogoScritus";
import AboutUsButton from "./components/AboutUsButton.jsx";
import MobileMenuLogic from "./components/MobileMenuLogic.jsx";

function PaginaWelcome() {
  return (
    <main>
      <Header
        left={<AboutUsButton />}
        center={<Logo reload />}
        right={<MobileMenuLogic />}
      />
      <Linha />
    </main>
  );
}

export default PaginaWelcome;
