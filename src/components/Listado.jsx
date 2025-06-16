// Importa hooks de React y el hook de navegación de React Router
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/Listado.css';

// URL base de la API de PokéAPI
const API_URL = 'https://pokeapi.co/api/v2/pokemon';

export function Listado() {
  // Estado para la lista de pokemones
  const [pokemones, setPokemones] = useState([]);
  // Estado para el offset de paginación (desde qué número empieza la siguiente página)
  const [offset, setOffset] = useState(0);
  // Estado para el término de búsqueda actual (lo que se ha buscado)
  const [busqueda, setBusqueda] = useState("");
  // Estado para el input de búsqueda (lo que el usuario está escribiendo)
  const [inputBusqueda, setInputBusqueda] = useState("");
  // Estado para el resultado de la búsqueda (si se encuentra un Pokémon concreto)
  const [pokemonBusqueda, setPokemonBusqueda] = useState(null);
  // Estado para indicar si se está buscando un Pokémon
  const [buscando, setBuscando] = useState(false);
  // Estado para mostrar errores de búsqueda
  const [errorBusqueda, setErrorBusqueda] = useState("");
  // Estado para indicar si se está cargando la lista inicial o más pokémon
  const [cargando, setCargando] = useState(true);

  // Al montar el componente, intenta recuperar pokemones y offset de sessionStorage
  // Si hay datos guardados, los usa para no volver a pedirlos a la API
  // Si no hay datos, pide los primeros 12 pokémon a la API y los guarda en sessionStorage
  useEffect(() => {
    const pokemonesGuardados = sessionStorage.getItem('pokemones');
    const offsetGuardado = sessionStorage.getItem('offset');
    if (pokemonesGuardados && offsetGuardado) {
      setPokemones(JSON.parse(pokemonesGuardados));
      setOffset(Number(offsetGuardado));
      setCargando(false);
    } else {
      setCargando(true);
      fetch(`${API_URL}?limit=12&offset=0`)
        .then((res) => res.json())
        .then((data) => {
          setPokemones(data.results);
          setOffset(12);
          setCargando(false);
          // Guarda en sessionStorage
          sessionStorage.setItem('pokemones', JSON.stringify(data.results));
          sessionStorage.setItem('offset', '12');
        });
    }
  }, []);

  // Cada vez que cambian los pokemones o el offset, guarda en sessionStorage
  // Así, si el usuario recarga la página, no pierde el listado ni la página actual
  useEffect(() => {
    if (pokemones.length > 0) {
      sessionStorage.setItem('pokemones', JSON.stringify(pokemones));
      sessionStorage.setItem('offset', offset.toString());
    }
  }, [pokemones, offset]);

  // Función para cargar más pokemones 
  // Solo se puede usar si NO hay búsqueda activa
  const cargarMasPokemones = () => {
    setCargando(true);
    fetch(`${API_URL}?limit=12&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemones((prev) => {
          const nuevos = [...prev, ...data.results];
          // Guarda en sessionStorage la lista actualizada
          sessionStorage.setItem('pokemones', JSON.stringify(nuevos));
          return nuevos;
        });
        setOffset((prevOffset) => {
          const nuevoOffset = prevOffset + 12; //carga mas pokemons
          sessionStorage.setItem('offset', nuevoOffset.toString());
          return nuevoOffset;
        });
        setCargando(false);
      });
  };

  // Función para buscar un Pokémon por nombre o número
  // Solo busca cuando el usuario pulsa el botón o Enter
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

  // Decide qué pokemones mostrar:
  // - Si hay búsqueda, muestra solo el resultado de la búsqueda (si existe)
  // - Si no hay búsqueda, muestra la lista normal paginada
  const pokemonesFiltrados = busqueda
    ? (pokemonBusqueda ? [pokemonBusqueda] : [])
    : pokemones;

  // Hook para navegar a la página de detalles de un Pokémon
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
        {/* Botón para limpiar la búsqueda y volver al listado normal */}
        {busqueda && (
          <button type="button" className="limpiar-btn" onClick={() => {
            setBusqueda("");
            setInputBusqueda("");
            setPokemonBusqueda(null);
            setErrorBusqueda("");
          }}>Limpiar</button>
        )}
      </form>
      {/* Mensaje de estado si se está buscando o cargando */}
      {buscando && <div className="listado-buscando">Buscando...</div>}
      {cargando && !buscando && <div className="listado-buscando">Cargando...</div>}
      {/* Mensaje de error si la búsqueda falla */}
      {errorBusqueda && <div className="listado-error">{errorBusqueda}</div>}
      {/* Grid de tarjetas de Pokémon */}
      <div className="listado-grid">
        {pokemonesFiltrados.map((p) => {
          // Extrae el id del Pokémon desde la URL de la API
          const id = p.url.split('/').filter(Boolean).pop();
          return (
            <div
              key={p.name}
              className="pokemon-card"
              // Al hacer click, navega a la página de detalles de ese Pokémon
              onClick={() => navigate(`/detalles/${id}`)}
            >
              {/* Imagen SVG del Pokémon (dream-world) */}
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                alt={p.name}
                className="pokemon-img"
              />
              {/* Nombre del Pokémon */}
              <b className="pokemon-name">{p.name}</b>
            </div>
          );
        })}
      </div>
      {/* Mensaje si no hay resultados */}
      {pokemonesFiltrados.length === 0 && !buscando && !errorBusqueda && (
        <div className="listado-error listado-vacio">No se encontraron Pokémon.</div>
      )}
      {/* Botón para cargar más pokemones (desactivado si hay búsqueda o si está cargando) */}
      <div className="listado-cargar-mas">
        <button
          onClick={cargarMasPokemones}
          className="cargar-mas-btn"
          disabled={busqueda.length > 0 || cargando}
          title={busqueda.length > 0 ? 'Desactiva la búsqueda para cargar más' : ''}
        >
          {cargando ? 'Cargando...' : 'Cargar más'}
        </button>
      </div>
    </section>
  );
}