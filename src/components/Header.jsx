// Importa el componente Link de React Router para la navegación
import { Link } from 'react-router-dom';
import '../assets/Header.css';

// Componente que dibuja el icono de Pokeball usando SVG
function PokeballIcon() {
  // SVG Pokeball 
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="22" fill="#fff" stroke="#222" strokeWidth="3"/>
      <path d="M2 24h44" stroke="#222" strokeWidth="3"/>
      <path d="M2 24a22 22 0 0 1 44 0" fill="#ee1515"/>
      <circle cx="24" cy="24" r="8" fill="#fff" stroke="#222" strokeWidth="3"/>
      <circle cx="24" cy="24" r="4" fill="#eee" stroke="#222" strokeWidth="2"/>
    </svg>
  );
}

// Componente principal del header de la aplicación
function Header({ usuario, onLogout }) {
  return (
    <header>
      <span className="logo left">
        <PokeballIcon />
      </span>
      {/* Navegación principal */}
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/listado">Pokemons</Link>
        <Link to="/jugar">Jugar</Link>
        <Link to="/ranking">Ranking</Link>
        {/* Mostrar login/registro o usuario y logout */}
        {usuario ? (
          <>
            <span className="header-usuario">Hola, {usuario}</span>
            <button className="header-logout" onClick={onLogout}>Cerrar Sesión</button>
          </>
        ) : (
          <>
            <Link to="/login">Iniciar Sesión</Link>
            <Link to="/registro">Registro</Link>
          </>
        )}
      </nav>
      <span className="logo right">
        <PokeballIcon />
      </span>
    </header>
  );
}

export default Header;
