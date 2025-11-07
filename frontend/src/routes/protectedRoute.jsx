import { Navigate } from "react-router-dom";
import decodificarJWT from "../utils/decodificarJWT";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = localStorage.getItem("accessToken");

  let payload;
  try {
    payload = token ? decodificarJWT(token) : null;
    console.log("payload:", payload);
  } catch {
    payload = null;
  }

  // Se não houver token ou estiver expirado
  if (!payload || (payload.exp && Date.now() >= payload.exp * 1000)) {
    localStorage.removeItem("accessToken");
    return <Navigate to="/login" replace />;
  }

  // Se o usuário não tiver o tipo necessário
  if (allowedRoles.length > 0 && !allowedRoles.includes(payload.tipoUsuario)) {
    return <Navigate to="/nao-autorizado" replace />;
  }

  // Tudo certo
  return children;
};

export default ProtectedRoute;
