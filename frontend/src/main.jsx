import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from "./routes/appRoutes";
import EstilosGlobais from './styles/globalStyles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <EstilosGlobais />
      <AppRoutes />
  </React.StrictMode>
);

