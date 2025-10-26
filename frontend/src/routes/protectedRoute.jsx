import { Navigate } from "react-router-dom";
import decodificarJWT from "../utils/decodificarJWT";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");

  // Decodifica token, se falhar considera inválido
  let payload;
  try {
    payload = token ? decodificarJWT(token) : null;
  } catch {
    payload = null;
  }

  // Se não houver payload ou expirada, redireciona
  if (!payload || (payload.exp && Date.now() >= payload.exp * 1000)) {
    localStorage.removeItem("accessToken"); // opcional: limpa token inválido
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
