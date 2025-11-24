import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './protectedRoute.jsx';

import PaginaWelcome from "../pages/PaginaWelcome/index.jsx";
import PaginaCadastro from "../pages/PaginaCadastro/index.jsx";
import PaginaLogin from "../pages/PaginaLogin/index.jsx";
import PaginaSobreNos from "../pages/PaginaSobreNos/index.jsx";
import PaginaHome from "../pages/PaginaHome/index.jsx";
import PaginaEditarPerfil from "../pages/PaginaEditarPerfil/index.jsx";
import PaginaCadastroObras from '../pages/PaginaCadastroObras/index.jsx';
import PaginaEstante from '../pages/PaginaEstante/index.jsx';
import PaginaLivro from "../pages/PaginaLivro/index.jsx";
import PaginaTag from '../pages/PaginaTag/index.jsx';
import Pagina404 from '../pages/Pagina404/index.jsx';
import PaginaPerfil from "../pages/PaginaPerfil/index.jsx";
import PaginaFeed from '../pages/PaginaFeed/index.jsx';
import PaginaSalvos from '../pages/PaginaSalvos/index.jsx';
import PaginaCurtidas from "../pages/PaginaCurtidas/index.jsx";
import PaginaRecentes from "../pages/PaginaRecentes/index.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaWelcome />}/>
        <Route path="/cadastro" element={<PaginaCadastro />}/>
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/sobre-nos" element={<PaginaSobreNos />}/>
        <Route path="/home" element={<ProtectedRoute allowedRoles={['Autor', 'Leitor', 'Editora']}><PaginaHome /></ProtectedRoute>}/>
        <Route path="/perfil" element={<ProtectedRoute allowedRoles={['Autor', 'Leitor', 'Editora']} ><PaginaEditarPerfil /></ProtectedRoute>}/>
        <Route path="/cadastrar-obra" element={<ProtectedRoute allowedRoles={['Autor']}><PaginaCadastroObras /></ProtectedRoute>}/>
        <Route path="/minhas-obras" element={<ProtectedRoute allowedRoles={['Autor']}><PaginaEstante /></ProtectedRoute>}/>
        <Route path="/obra/:id_obra" element={<ProtectedRoute allowedRoles={['Autor', 'Leitor', 'Editora']}><PaginaLivro /></ProtectedRoute>}/>
        <Route path="/tag/:nome_tag" element={<ProtectedRoute allowedRoles={['Autor', 'Leitor', 'Editora']}><PaginaTag /></ProtectedRoute>}/>
        <Route path="/404" element={<ProtectedRoute allowedRoles={['Autor', 'Leitor', 'Editora']}><Pagina404 /></ProtectedRoute>}/>
        <Route path="/perfil/:id_perfil" element={<ProtectedRoute allowedRoles={['Autor', 'Leitor', 'Editora']}><PaginaPerfil /></ProtectedRoute>}/>
        <Route path="/feed" element={<ProtectedRoute allowedRoles={['Autor', 'Leitor', 'Editora']}><PaginaFeed /></ProtectedRoute>}/>
        <Route path="/meus-salvos" element={<ProtectedRoute allowedRoles={['Autor', 'Leitor', 'Editora']}><PaginaSalvos /></ProtectedRoute>}/>
        <Route path="/minhas-curtidas" element={<ProtectedRoute allowedRoles={['Autor', 'Leitor', 'Editora']}><PaginaCurtidas /></ProtectedRoute>}/>
        <Route path="/recentes" element={<ProtectedRoute allowedRoles={['Autor', 'Leitor', 'Editora']}><PaginaRecentes /></ProtectedRoute>}/>

        <Route path="*" element={<Pagina404 navigate='true'/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
