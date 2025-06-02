function Landing() {
  return (
    <section style={{maxWidth:'600px',margin:'0 auto',textAlign:'center'}}>
      <h1>Bienvenido a la Pokédex Online</h1>
      <p>Descubre todos los Pokémons y pon a prueba tus conocimientos jugando.</p>
      <ul style={{textAlign:'left',margin:'2rem auto',maxWidth:'400px'}}>
        <li>Consulta información de todos los Pokémons gracias a la PokéAPI.</li>
        <li>Juega y demuestra cuánto sabes sobre ellos.</li>
        <li>Proyecto realizado con React.</li>
      </ul>
    </section>
  );
}

export default Landing;
