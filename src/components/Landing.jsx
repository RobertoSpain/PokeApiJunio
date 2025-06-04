import '../assets/Landing.css';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <section className="seccion-inicio">
      <div className="contenido-inicio">
        {/* Sección superior con título  */}
        <div className="inicio-principal">
          <h1 className="titulo">Bienvenido a la Pokédex Online</h1>
          <p className="descripcion">
            Descubre todos los Pokémons y pon a prueba tus conocimientos jugando 🎮
          </p>
        </div>

        {/* Sección central con imagen de fondo */}
        <div className="seccion-fondo"></div>

        {/* Sección inferior con características */}
        <div className="contenedor-caracteristicas">
          <div className="decoracion-pokebola"></div>
          <ul className="lista-caracteristicas">
            <li>
              <span className="icono">📱</span>
              Consulta información de todos los Pokémons gracias a la PokéAPI
            </li>
            <li>
             
            </li>
          </ul>
        </div>
      </div>
      {/* Footer personalizado */}
      <footer className="footer-landing">
        <div className="footer-main">© 2025 Pokédex App</div>
        <div className="footer-author">
          Proyecto Realizado con React ⚛️ por Roberto España
               Código disponible en{' '}
          <a href="https://github.com/RobertoSpain/PokeApiJunio" target="_blank" rel="PokeApiJunio">
            Github
          </a>
        </div>
        <div className="footer-social">
          <a href="https://www.linkedin.com/in/roberto-espa%C3%B1a-540552208/" target="_blank" rel="noopener noreferrer">
            Linkedin
          </a>
          <a href="https://www.facebook.com/roberto.espana.58/?locale=es_ES" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
        </div>
      </footer>
    </section>
  );
}

export default Landing;
