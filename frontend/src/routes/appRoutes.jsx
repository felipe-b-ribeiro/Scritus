import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './protectedRoute.jsx';

import PaginaWelcome from "../pages/PaginaWelcome/index.jsx";
import PaginaCadastro from "../pages/PaginaCadastro/index.jsx";
import PaginaLogin from "../pages/PaginaLogin/index.jsx";
import PaginaSobreNos from "../pages/PaginaSobreNos/index.jsx";
import PaginaHome from "../pages/PaginaHome/index.jsx";
import PaginaPerfil from "../pages/PaginaPerfil/index.jsx";
import PaginaCadastroObras from '../pages/PaginaCadastroObras/index.jsx';
import PaginaEstante from '../pages/PaginaEstante/index.jsx';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaWelcome />}/>
        <Route path="/cadastro" element={<PaginaCadastro />}/>
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/sobre-nos" element={<PaginaSobreNos />}/>
        <Route path="/home" element={<ProtectedRoute allowedRoles={['Autor', 'Leitor', 'Editora']}><PaginaHome /></ProtectedRoute>}/>
        <Route path="/perfil" element={<ProtectedRoute><PaginaPerfil /></ProtectedRoute>}/>
        <Route path="/cadastrarobra" element={<ProtectedRoute allowedRoles={['Autor']}><PaginaCadastroObras /></ProtectedRoute>}></Route>
        <Route path="/minhasobras" element={<ProtectedRoute allowedRoles={['Autor']}><PaginaEstante /></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
