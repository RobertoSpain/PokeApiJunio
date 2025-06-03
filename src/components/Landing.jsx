import '../assets/Landing.css';

function Landing() {
  return (
    <section className="landing-section">
      <h1 className="landing-title">Bienvenido a la Pokédex Online</h1>
      <p className="landing-description">Descubre todos los Pokémons y pon a prueba tus conocimientos jugando.</p>
      <ul className="landing-features">
        <li>Consulta información de todos los Pokémons gracias a la PokéAPI.</li>
        <li>Juega y demuestra cuánto sabes sobre ellos.</li>
        <li>Proyecto realizado con React.</li>
      </ul>
    </section>
  );
}

export default Landing;
