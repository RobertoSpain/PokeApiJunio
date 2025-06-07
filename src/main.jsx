// Importa StrictMode para ayudar a detectar problemas en la app durante el desarrollo
import { StrictMode } from 'react';
// Importa createRoot para renderizar la aplicación en el DOM
import { createRoot } from 'react-dom/client';
// Importa los estilos globales de la aplicación
import './assets/App.css';
// Importa el componente principal de la aplicación
import App from './App';

// Renderiza la aplicación en el elemento con id 'root'
createRoot(document.getElementById('root')).render(
  // StrictMode ayuda a identificar problemas potenciales en la app
  <StrictMode>
    <App />
  </StrictMode>
);
