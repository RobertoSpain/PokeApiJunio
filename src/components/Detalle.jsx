import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../assets/Detalle.css';

export function Detalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => res.json())
      .then(data => setPokemon(data))
      .catch(() => setPokemon(null));
  }, [id]);

  if (!pokemon) return <div>Cargando...</div>;

  return (
    <div className="detallesPokemon">
      <button className="btn-close" onClick={() => navigate(-1)}>✖</button>
      <div className="contenido">
        <div className="img">
          <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} className="imgDetalle" />
        </div>
        <div className="text">
          <h1 className="nombrePokemon">{pokemon.name}</h1>
          <div className="information">
            <div className="typeAbility">
              <div className="types">
                <h2>Types</h2>
                <ul>
                  {pokemon.types.map((type, i) => (
                    <li className={type.type.name} key={i}>{type.type.name}</li>
                  ))}
                </ul>
              </div>
              <div className="abilities">
                <h2>Abilities</h2>
                <ul>
                  {pokemon.abilities.map((ability, i) => (
                    <li key={i}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
            </div>
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
