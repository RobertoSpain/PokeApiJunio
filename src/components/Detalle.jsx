import { useState, useEffect } from 'react';
import '../assets/Detalle.css';

export function Detalle({ id, onClose }) {
  const [datosPokemon, setDatosPokemon] = useState([]);

  useEffect(() => {
    if (id) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(response => response.json())
        .then(datos => setDatosPokemon([datos]))
        .catch(() => setDatosPokemon([]));
    }
  }, [id]);

  const mostrarDetalles = datosPokemon.map((datoPokemon) => (
    <div className="detallesPokemon" key={datoPokemon.id}>
      <button className="btn-close" onClick={onClose}>✖</button>
      <div className="contenido">
        <div className="img">
          <img src={datoPokemon.sprites.other['official-artwork'].front_default} alt={datoPokemon.species.name} className="imgDetalle" />
        </div>
        <div className="text">
          <h1 className="nombrePokemon">{datoPokemon.species.name}</h1>
          <div className="information">
            <div className="typeAbility">
              <div className="types">
                <h2>Types</h2>
                <ul>
                  {datoPokemon.types.map((type, i) => (
                    <li className={type.type.name} key={i}>{type.type.name}</li>
                  ))}
                </ul>
              </div>
              <div className="abilities">
                <h2>Abilities</h2>
                <ul>
                  {datoPokemon.abilities.map((ability, i) => (
                    <li key={i}>{ability.ability.name}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="stats">
              <h2>Stats</h2>
              <ul>
                {datoPokemon.stats.map((stat, i) => (
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
          {datoPokemon.moves.map((move, i) => (
            <li key={i}>{move.move.name}</li>
          ))}
        </ul>
      </div>
    </div>
  ));

  return <>{mostrarDetalles}</>;
}
