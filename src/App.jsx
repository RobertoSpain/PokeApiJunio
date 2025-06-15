// Importaciones de React Router para gestionar la navegación
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Importación de los componentes principales de la aplicación
import Header from './components/Header';
import Landing from './components/Landing';
import Jugar from './components/Jugar';
import { Listado } from './components/Listado';
import { Detalle } from './components/Detalle';
import Error404 from './components/error404';
import Login from './components/Login';
import Registro from './components/Registro';
import { useState } from 'react';

// Componente principal de la aplicación
function App() {
  // Estado para el usuario logueado
  const [usuario, setUsuario] = useState(localStorage.getItem('usuario') || '');

  // Función para login/logout
  const handleLogin = (nombre) => {
    setUsuario(nombre);
    localStorage.setItem('usuario', nombre);
  };
  const handleLogout = () => {
    setUsuario('');
    localStorage.removeItem('usuario');
  };

  return (
        // Router envuelve toda la aplicación para habilitar el enrutamiento
        // El header se muestra en todas las páginas
    <Router>
      <Header usuario={usuario} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/jugar" element={usuario ? <Jugar /> : <Login onLogin={handleLogin} />} />
        <Route path="/listado" element={<Listado />} />
        <Route path="/detalles/:id" element={<Detalle />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

// Exportación del componente App para su uso en el punto de entrada
export default App;
