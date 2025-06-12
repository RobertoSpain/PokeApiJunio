import { useState, useEffect } from "react";
import "../assets/jugar.css";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Jugar() {
  const [pokemon, setPokemon] = useState(null);
  const [respuesta, setRespuesta] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [revelar, setRevelar] = useState(false);
  const [intentos, setIntentos] = useState(0);
  const [puntos, setPuntos] = useState(0);
  const [record, setRecord] = useState(
    localStorage.getItem("recordPuntos") || 0
  );
  const [pista, setPista] = useState("");
  const [contadorPista, setContadorPista] = useState(0);
  const [intentosRestantes, setIntentosRestantes] = useState(3);
  const [botonSonidoDesbloqueado, setBotonSonidoDesbloqueado] = useState(false);

  useEffect(() => {
    cargarPokemon();
  }, []);

  useEffect(() => {
    if (contadorPista > 0) {
      const timer = setTimeout(() => {
        setContadorPista(contadorPista - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (contadorPista === 0 && intentos >= 3 && pokemon) {
      const tipos = pokemon.types.map((tipo) => tipo.type.name).join(", ");
      setPista(`Pista: Es de tipo ${tipos}`);
    }
  }, [contadorPista, intentos, pokemon]);

  function cargarPokemon() {
    const id = Math.floor(Math.random() * 1010) + 1;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        setRevelar(false);
        resetEstado();
      })
      .catch(() => setMensaje("Error al cargar el Pokémon. Inténtalo nuevamente."));
  }

  function resetEstado() {
    setMensaje("");
    setRespuesta("");
    setIntentos(0);
    setIntentosRestantes(3);
    setContadorPista(0);
    setPista("");
    setBotonSonidoDesbloqueado(false);
  }

  function reproducirSonido() {
    if (pokemon && pokemon.cries && pokemon.cries.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.play();
    }
  }

  // Función para guardar la puntuación en Firestore
  async function guardarPuntuacion(puntos) {
    try {
      await addDoc(collection(db, "rankings"), {
        puntos: puntos,
        timestamp: new Date(),
      });
    } catch (err) {
      console.error("Error al guardar la puntuación:", err);
    }
  }

  function verificarRespuesta() {
    if (!pokemon || respuesta.trim() === "") {
      setMensaje("Por favor, escribe una respuesta antes de verificar.");
      return;
    }
    if (respuesta.toLowerCase() === pokemon.name.toLowerCase()) {
      setMensaje(`¡Correcto! Era ${pokemon.name}`);
      setRevelar(true);
      const nuevosPuntos = puntos + 1;
      if (nuevosPuntos > record) {
        setRecord(nuevosPuntos);
        localStorage.setItem("recordPuntos", nuevosPuntos);
        guardarPuntuacion(nuevosPuntos); // Guarda en Firestore si es récord
      }
      setPuntos(nuevosPuntos);
      setTimeout(cargarPokemon, 1500);
    } else {
      manejarFallo();
    }
  }

  function manejarFallo() {
    const nuevoIntento = intentos + 1;
    setIntentos(nuevoIntento);
    setRespuesta("");
    setIntentosRestantes(3 - nuevoIntento);
    if (nuevoIntento === 3) {
      setMensaje("Fallaste 3 veces. La pista aparecerá en 5 segundos...");
      setContadorPista(5);
    } else if (nuevoIntento === 4) {
      setMensaje("Te queda 1 fallo para desbloquear el sonido.");
    } else if (nuevoIntento === 5) {
      setMensaje("Se ha desbloqueado el sonido del Pokémon.");
      setBotonSonidoDesbloqueado(true);
    } else {
      setMensaje("");
    }
  }

  return (
    <div className="juego-container">
      <h1 className="titulo">Adivina el Pokémon</h1>
      <h2 className="record">Puntos: {puntos} | Récord: {record}</h2>
      {pokemon && (
        <>
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={`Silueta de ${pokemon.name}`}
            className="pokemon-imagen"
            style={{ filter: revelar ? "none" : "grayscale(100%) contrast(0%)" }}
          />
          <br />
          <input
            type="text"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            placeholder="Escribe el nombre del Pokémon"
            className="input-texto"
          />
          <button onClick={verificarRespuesta} className="boton">
            Verificar
          </button>
          <button onClick={cargarPokemon} className="boton">
            Nuevo Pokémon
          </button>
          <p className="mensaje">{mensaje}</p>
          {intentosRestantes > 0 && intentos < 3 && (
            <p className="intentos-restantes">
              Te quedan {intentosRestantes} intentos antes de la pista.
            </p>
          )}
          {contadorPista > 0 && <p className="contador-pista">La pista aparecerá en {contadorPista} segundos...</p>}
          {pista && <p className="pista">{pista}</p>}
          {botonSonidoDesbloqueado && (
            <button onClick={reproducirSonido} className="boton boton-sonido">
              Escuchar sonido del Pokémon
            </button>
          )}
        </>
      )}
    </div>
  );
}
