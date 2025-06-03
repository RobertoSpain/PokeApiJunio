import { useState, useEffect } from 'react';
import { Detalle } from './Detalle';
import '../assets/Listado.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export function Listado() {
  const [pokemones, setPokemones] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);

  const cargarMasPokemones = () => {
    fetch(`${API_URL}?limit=12&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemones((prev) => [...prev, ...data.results]);
        setOffset((prevOffset) => prevOffset + 12);
      });
  };

  useEffect(() => {
    fetch(`${API_URL}?limit=12&offset=0`)
      .then((res) => res.json())
      .then((data) => {
        setPokemones(data.results);
        setOffset(12); // La siguiente carga empezará en el 13
      });
  }, []);

  return (
    <section className="listado-section">
      <h2>Pokémons</h2>
      <div className="listado-grid">
        {pokemones.map((p) => {
          const id = p.url.split('/').filter(Boolean).pop();
          return (
            <div
              key={p.name}
              className="pokemon-card"
              onClick={() => setPokemonSeleccionado(id)}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                alt={p.name}
                className="pokemon-img"
              />
              <b className="pokemon-name">{p.name}</b>
            </div>
          );
        })}
      </div>
      <div className="listado-cargar-mas">
        <button
          onClick={cargarMasPokemones}
          className="cargar-mas-btn"
        >
          Cargar más
        </button>
      </div>
      {pokemonSeleccionado && (
        <Detalle id={pokemonSeleccionado} onClose={() => setPokemonSeleccionado(null)} />
      )}
    </section>
  );
}
