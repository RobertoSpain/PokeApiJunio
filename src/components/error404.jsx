// Importa Link para navegación y el CSS de estilos
import { Link } from 'react-router-dom';
import '../assets/error404.css';

// Componente para mostrar la página de error 404 (no encontrada)
export default function Error404() {
  return (
    <div className="error404-container">
      <h1>404</h1>
      <div className="error404-interrogacion">¿ ?</div>
      <img
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/54.png"
        alt="Psyduck confundido"
        className="error404-pokemon"
      />
      <h2>Página no encontrada</h2>
      <p>La ruta que buscas no existe.</p>
      {/* Enlace para volver al inicio */}
      <Link to="/" className="error404-link">Volver al inicio</Link>
    </div>
  );
}