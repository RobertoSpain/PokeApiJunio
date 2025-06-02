import { Link } from 'react-router-dom';
import '../assets/Header.css';

function Header() {
  return (
    <header style={{background:'#eee',padding:'1rem 0',marginBottom:'2rem'}}>
      <nav style={{display:'flex',justifyContent:'center',gap:'2rem'}}>
        <Link to="/">Inicio</Link>
        <Link to="/pokemons">Pokemons</Link>
        <Link to="/jugar">Jugar</Link>
      </nav>
    </header>
  );
}

export default Header;
