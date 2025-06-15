// Componente de registro de usuario para la aplicación
// Permite a un nuevo usuario registrarse con usuario y contraseña
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistroUsuario() {
  // Estados locales para usuario, contraseña y errores
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navegar = useNavigate(); // Hook para navegación entre rutas

  // Maneja el envío del formulario de registro
  const manejarEnvio = (e) => {
    e.preventDefault();
    if (usuario && contrasena) {
      // Aquí guardarías el usuario en la base de datos 
      navegar('/login'); // Redirige al usuario a la pantalla de login tras registrarse
    } else {
      setError('Usuario y contraseña obligatorios'); // Muestra error si faltan datos
    }
  };

  // Renderiza el formulario de registro
  return (
    <section className="registro-section">
      <h2>Registro</h2>
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
        <button type="submit">Registrarse</button>
        {error && <div className="registro-error">{error}</div>}
      </form>
    </section>
  );
}

export default RegistroUsuario;
