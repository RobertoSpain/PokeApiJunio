// Importa hooks de React y utilidades de React Router
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/Detalle.css';

export function Detalle() {
  // Obtiene el parámetro 'id' de la URL
  const { id } = useParams();
  // Hook para navegar entre páginas
  const navigate = useNavigate();
  // Estado para almacenar los datos del Pokémon
  const [pokemon, setPokemon] = useState(null);

  // Efecto para cargar los datos del Pokémon cuando cambia el id
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => res.json())
      .then(data => setPokemon(data))
      .catch(() => setPokemon(null));
  }, [id]);

  // Muestra un mensaje de carga si los datos aún no están disponibles
  if (!pokemon) return <div>Cargando...</div>;

  return (
    <div className="detallesPokemon">
      {/* Botón para volver atrás */}
      <button className="btn-close" onClick={() => navigate(-1)}>✖</button>
      <div className="contenido">
        <div className="img">
          {/* Imagen oficial del Pokémon */}
          <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="imgDetalle" />
        </div>
        <div className="text">
          <h1 className="nombrePokemon">{pokemon.name}</h1>
          <div className="information">
            <div className="typeAbility">
              {/* Tipos del Pokémon */}
              <div className="types">
                <h2>Types</h2>
                <ul>
                  {pokemon.types.map((type, i) => (
                    <li className={type.type.name} key={i}>{type.type.name}</li>
                  ))}
                </ul>
              </div>
              {/* Habilidades del Pokémon */}
              <div className="abilities">
                <h2>Abilities</h2>
                <ul>
                  {pokemon.abilities.map((ability, i) => (
                    <li key={i}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Estadísticas del Pokémon */}
            <div className="stats">
              <h2>Stats</h2>
              <ul>
                {pokemon.stats.map((stat, i) => (
                  <li key={i}>{stat.stat.name}: {stat.base_stat}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Lista de movimientos del Pokémon */}
      <div className="moves">
        <h2>Moves</h2>
        <ul className="moves-container">
          {pokemon.moves.map((move, i) => (
            <li key={i}>{move.move.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
