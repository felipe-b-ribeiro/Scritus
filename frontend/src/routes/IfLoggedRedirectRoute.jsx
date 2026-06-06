import { Navigate } from "react-router-dom";
import decodificarJWT from "../utils/decodificarJWT";

const IfLoggedRedirectRoute = ({ children, redirectTo = "/home" }) => {
  const token = localStorage.getItem("accessToken");

  if (!token) return children;

  const payload = decodificarJWT(token);
  const isValid = payload && (!payload.exp || Date.now() < payload.exp * 1000);

  if (isValid) return <Navigate to={redirectTo} replace />;

  return children;
};

export default IfLoggedRedirectRoute;
