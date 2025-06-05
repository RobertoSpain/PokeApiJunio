import { Link } from 'react-router-dom';
import '../assets/error404.css';

export default function Error404() {
  return (
    <div className="error404-container">
      <h1>404</h1>
      <h2>Página no encontrada</h2>
      <p>La ruta que buscas no existe.</p>
      <Link to="/" className="error404-link">Volver al inicio</Link>
    </div>
  );
}
