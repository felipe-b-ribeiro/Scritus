import { Navigate } from "react-router-dom";
import decodificarJWT from "../utils/decodificarJWT";

const ProtectedRoute = ({
  children,
  allowedRoles = ["Autor", "Leitor", "Editora"],
}) => {
  const token = localStorage.getItem("accessToken");

  let payload;
  try {
    payload = token ? decodificarJWT(token) : null;
  } catch {
    payload = null;
  }

  if (!payload || (payload.exp && Date.now() >= payload.exp * 1000)) {
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(payload.tipoUsuario)) {
    return <Navigate to="/home" replace />;
  }

  // Tudo certo
  return children;
};

export default ProtectedRoute;
