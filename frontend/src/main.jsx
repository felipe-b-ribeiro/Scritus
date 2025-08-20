import React from 'react';
import ReactDOM from 'react-dom/client';
import WelcomePage from './pages/welcomePage';
import EstilosGlobais from './styles/globalStyles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <EstilosGlobais />
    <WelcomePage />
  </React.StrictMode>
);

