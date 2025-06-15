// Componente de inicio de sesión para la aplicación
// Permite al usuario iniciar sesión con usuario/contraseña o Google
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase"; // Ajusta la ruta si tu archivo firebase está en otro lugar
import '../assets/loginYRegistro.css';

function IniciarSesion({ onLogin }) {
  // Estados locales para usuario, contraseña y errores
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navegar = useNavigate(); // Hook para navegación entre rutas

  // Maneja el envío del formulario de login tradicional
  const manejarEnvio = (e) => {
    e.preventDefault();
    if (usuario && contrasena) {
      onLogin(usuario); // Llama a la función de login recibida por props
      navegar('/'); // Redirige al usuario a la página principal
    } else {
      setError('Usuario y contraseña obligatorios'); // Muestra error si faltan datos
    }
  };

  // Maneja el login con Google usando Firebase Auth y promesas
  const manejarGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        onLogin(result.user.displayName || result.user.email || result.user.uid); // Llama a onLogin con el nombre, email o uid de Google
        navegar('/'); // Redirige al usuario a la página principal
      })
      .catch(() => {
        setError('Error al iniciar sesión con Google'); // Muestra error si falla el login con Google
      });
  };

  // Renderiza el formulario de login y el botón social
  return (
    <section className="login-section">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={e => setContrasena(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      {/* Solo botón de Google */}
      <div className="social-login-buttons">
        <button className="google-btn" onClick={manejarGoogle}>
          Google
        </button>
      </div>
      {error && <div className="login-error">{error}</div>}
    </section>
  );
}

export default IniciarSesion;