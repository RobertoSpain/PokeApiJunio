// Importa hooks de React y el hook de navegación de React Router
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Listado.css';

// URL base de la API de PokéAPI
const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export function Listado() {
  // Estado para la lista de pokemones
  const [pokemones, setPokemones] = useState([]);
  // Estado para el offset de paginación
  const [offset, setOffset] = useState(0);
  // Estado para el término de búsqueda actual
  const [busqueda, setBusqueda] = useState("");
  // Estado para el input de búsqueda
  const [inputBusqueda, setInputBusqueda] = useState("");
  // Estado para el resultado de la búsqueda
  const [pokemonBusqueda, setPokemonBusqueda] = useState(null);
  // Estado para indicar si se está buscando
  const [buscando, setBuscando] = useState(false);
  // Estado para mostrar errores de búsqueda
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

  // Cargar los primeros 12 pokemones al montar el componente
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

  // Decide qué pokemones mostrar: si hay búsqueda, muestra el resultado, si no, la lista normal
  const pokemonesFiltrados = busqueda
    ? (pokemonBusqueda ? [pokemonBusqueda] : [])
    : pokemones;

  // Hook para navegar a la página de detalles
  const navigate = useNavigate();

  return (
    <section className="listado-section">
      <h2>Pokémons</h2>
      {/* Formulario de búsqueda */}
      <form className="listado-busqueda-container" onSubmit={buscarPokemon} autoComplete="off">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={inputBusqueda}
          onChange={e => setInputBusqueda(e.target.value)}
          className="listado-busqueda"
        />
        <button type="submit" className="buscar-btn">Buscar</button>
        {/* Botón para limpiar la búsqueda */}
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
          // Extrae el id del Pokémon desde la URL
          const id = p.url.split('/').filter(Boolean).pop();
          return (
            <div
              key={p.name}
              className="pokemon-card"
              onClick={() => navigate(`/detalles/${id}`)}
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
    </section>
  );
}
