import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación de login básico (sustituir por Firebase Auth en el futuro)
    if (usuario && password) {
      onLogin(usuario);
      navigate('/');
    } else {
      setError('Usuario y contraseña obligatorios');
    }
  };

  return (
    <section className="login-section">
      <h2>Iniciar Sesión</h2>
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
        <button type="submit">Entrar</button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </section>
  );
}

export default Login;
