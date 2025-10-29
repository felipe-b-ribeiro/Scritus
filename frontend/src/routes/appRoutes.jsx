import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './protectedRoute.jsx';

// Importa páginas
import PaginaWelcome from "../pages/PaginaWelcome/index.jsx";
import PaginaCadastro from "../pages/PaginaCadastro/index.jsx";
import PaginaLogin from "../pages/PaginaLogin/index.jsx";
import PaginaSobreNos from "../pages/PaginaSobreNos/index.jsx";
import PaginaHome from "../pages/PaginaHome/index.jsx";
import PaginaSplash from "../pages/PaginaSplash/index.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaWelcome />}/>
        <Route path="/cadastro" element={<PaginaCadastro />}/>
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/sobre-nos" element={<PaginaSobreNos />}/>
        <Route path="/home" element={<ProtectedRoute><PaginaHome /></ProtectedRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
