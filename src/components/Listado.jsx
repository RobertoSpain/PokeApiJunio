import { useState, useEffect } from 'react';
import { Detalle } from './Detalle';
import '../assets/Listado.css';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export function Listado() {
  const [pokemones, setPokemones] = useState([]);
  const [offset, setOffset] = useState(0);
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [inputBusqueda, setInputBusqueda] = useState("");
  const [pokemonBusqueda, setPokemonBusqueda] = useState(null);
  const [buscando, setBuscando] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState("");

  // Cargar más pokemones (solo si no hay búsqueda activa)
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

  // Buscar globalmente en la PokéAPI solo al pulsar el botón
  const buscarPokemon = (e) => {
    e.preventDefault();
    if (inputBusqueda.trim().length === 0) return;
    setBuscando(true);
    setErrorBusqueda("");
    fetch(`https://pokeapi.co/api/v2/pokemon/${inputBusqueda.toLowerCase()}`)
      .then(res => {
        if (!res.ok) throw new Error('No encontrado');
        return res.json();
      })
      .then(data => {
        setPokemonBusqueda({
          name: data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${data.id}/`
        });
        setBusqueda(inputBusqueda);
        setBuscando(false);
      })
      .catch(() => {
        setPokemonBusqueda(null);
        setBusqueda(inputBusqueda);
        setBuscando(false);
        setErrorBusqueda('No se encontró ningún Pokémon con ese nombre.');
      });
  };

  // Decide qué pokemones mostrar
  const pokemonesFiltrados = busqueda
    ? (pokemonBusqueda ? [pokemonBusqueda] : [])
    : pokemones;

  return (
    <section className="listado-section">
      <h2>Pokémons</h2>
      <form className="listado-busqueda-container" onSubmit={buscarPokemon} autoComplete="off">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={inputBusqueda}
          onChange={e => setInputBusqueda(e.target.value)}
          className="listado-busqueda"
        />
        <button type="submit" className="buscar-btn">Buscar</button>
        {busqueda && (
          <button type="button" className="limpiar-btn" onClick={() => {
            setBusqueda("");
            setInputBusqueda("");
            setPokemonBusqueda(null);
            setErrorBusqueda("");
          }}>Limpiar</button>
        )}
      </form>
      {buscando && <div className="listado-buscando">Buscando...</div>}
      {errorBusqueda && <div className="listado-error">{errorBusqueda}</div>}
      <div className="listado-grid">
        {pokemonesFiltrados.map((p) => {
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
      {pokemonesFiltrados.length === 0 && !buscando && !errorBusqueda && (
        <div className="listado-error listado-vacio">No se encontraron Pokémon.</div>
      )}
      <div className="listado-cargar-mas">
        <button
          onClick={cargarMasPokemones}
          className="cargar-mas-btn"
          disabled={busqueda.length > 0}
          title={busqueda.length > 0 ? 'Desactiva la búsqueda para cargar más' : ''}
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
