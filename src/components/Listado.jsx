import { useState, useEffect } from 'react';
import { Detalle } from './Detalle';

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
    <section style={{ maxWidth: '900px', margin: '0 auto', padding: '1rem' }}>
      <h2>Pokémons</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
        {pokemones.map((p) => {
          const id = p.url.split('/').filter(Boolean).pop();
          return (
            <div
              key={p.name}
              style={{
                background: '#f8f8f8',
                padding: '1rem',
                borderRadius: '12px',
                width: '150px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 8px #0001',
              }}
              onClick={() => setPokemonSeleccionado(id)}
            >
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                alt={p.name}
                style={{ width: '100px', height: '100px', objectFit: 'contain', marginBottom: '0.5rem' }}
              />
              <b style={{ textTransform: 'capitalize' }}>{p.name}</b>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}>
        <button
          onClick={cargarMasPokemones}
          style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: '#1976d2', color: '#fff', cursor: 'pointer' }}
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
