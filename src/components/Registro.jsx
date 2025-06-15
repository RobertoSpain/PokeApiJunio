import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registro() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de registro básico (sustituir por Firebase Auth en el futuro)
    if (usuario && password) {
      // Aquí guardarías el usuario en la base de datos
      navigate('/login');
    } else {
      setError('Usuario y contraseña obligatorios');
    }
  };

  return (
    <section className="registro-section">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Registrarse</button>
        {error && <div className="registro-error">{error}</div>}
      </form>
      <div className="registro-redes">
        <button disabled>Google</button>
      </div>
    </section>
  );
}

export default Registro;
