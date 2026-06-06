import ReactDOM from "react-dom/client";
import AppRoutes from "./routes/appRoutes";
import EstilosGlobais from "./styles/globalStyles";
import UtilitaryClasses from "./styles/utilitaryClasses";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <EstilosGlobais />
    <UtilitaryClasses />
    <AppRoutes />
  </>,
);
