import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importa páginas
import PaginaWelcome from "../pages/PaginaWelcome";
import PaginaCadastro from "../pages/PaginaCadastro";
import PaginaLogin from "../pages/PaginaLogin";
import PaginaSobreNos from "../pages/PaginaSobreNos";
import PaginaHome from "../pages/PaginaHome";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaWelcome />} />
        <Route path="/cadastro" element={<PaginaCadastro />} />
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/sobre-nos" element={<PaginaSobreNos />} />
        <Route path="/home" element={<PaginaHome />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
