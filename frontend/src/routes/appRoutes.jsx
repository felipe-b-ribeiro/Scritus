import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Pagina404 from "../pages/Pagina404/index.jsx";
import PaginaCadastro from "../pages/PaginaCadastro/index.jsx";
import PaginaCadastroObras from "../pages/PaginaCadastroObras/index.jsx";
import PaginaCurtidas from "../pages/PaginaCurtidas/index.jsx";
import PaginaEditarPerfil from "../pages/PaginaEditarPerfil/index.jsx";
import PaginaEstante from "../pages/PaginaEstante/index.jsx";
import PaginaFeed from "../pages/PaginaFeed/index.jsx";
import PaginaHome from "../pages/PaginaHome/index.jsx";
import PaginaLivro from "../pages/PaginaLivro/index.jsx";
import PaginaLogin from "../pages/PaginaLogin/index.jsx";
import PaginaPerfil from "../pages/PaginaPerfil/index.jsx";
import PaginaRecentes from "../pages/PaginaRecentes/index.jsx";
import PaginaSalvos from "../pages/PaginaSalvos/index.jsx";
import PaginaSobreNos from "../pages/PaginaSobreNos/index.jsx";
import PaginaTag from "../pages/PaginaTag/index.jsx";
import PaginaWelcome from "../pages/PaginaWelcome/index.jsx";
import ProtectedRoute from "./protectedRoute.jsx";
import IfLoggedRedirectRoute from "./ifLoggedRedirectRoute.jsx";

function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <IfLoggedRedirectRoute>
          <PaginaWelcome />
        </IfLoggedRedirectRoute>
      ),
    },
    {
      path: "/cadastro",
      element: (
        <IfLoggedRedirectRoute>
          <PaginaCadastro />
        </IfLoggedRedirectRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <IfLoggedRedirectRoute>
          <PaginaLogin />
        </IfLoggedRedirectRoute>
      ),
    },
    {
      path: "/sobre-nos",
      element: <PaginaSobreNos />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute>
          <PaginaHome />
        </ProtectedRoute>
      ),
    },
    {
      path: "/homepage",
      element: <Navigate to="/home" replace />,
    },
    {
      path: "/perfil",
      element: (
        <ProtectedRoute>
          <PaginaEditarPerfil />
        </ProtectedRoute>
      ),
    },
    {
      path: "/cadastrar-obra",
      element: (
        <ProtectedRoute allowedRoles={"Autor"}>
          <PaginaCadastroObras />
        </ProtectedRoute>
      ),
    },
    {
      path: "/minhas-obras",
      element: (
        <ProtectedRoute allowedRoles={"Autor"}>
          <PaginaEstante />
        </ProtectedRoute>
      ),
    },
    {
      path: "/obra/:id_obra",
      element: (
        <ProtectedRoute>
          <PaginaLivro />
        </ProtectedRoute>
      ),
    },
    {
      path: "/tag/:nome_tag",
      element: (
        <ProtectedRoute>
          <PaginaTag />
        </ProtectedRoute>
      ),
    },
    {
      path: "/404",
      element: <Pagina404 />,
    },
    {
      path: "/perfil/:id_perfil_autor",
      element: (
        <ProtectedRoute>
          <PaginaPerfil />
        </ProtectedRoute>
      ),
    },
    {
      path: "/feed",
      element: (
        <ProtectedRoute>
          <PaginaFeed />
        </ProtectedRoute>
      ),
    },
    {
      path: "/meus-salvos",
      element: (
        <ProtectedRoute>
          <PaginaSalvos />
        </ProtectedRoute>
      ),
    },
    {
      path: "/minhas-curtidas",
      element: (
        <ProtectedRoute>
          <PaginaCurtidas />
        </ProtectedRoute>
      ),
    },
    {
      path: "/recentes",
      element: (
        <ProtectedRoute>
          <PaginaRecentes />
        </ProtectedRoute>
      ),
    },
    {
      path: "*",
      element: <Pagina404 />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppRoutes;
