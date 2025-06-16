import { useState, useEffect } from "react";
import "../assets/jugar.css";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

// Componente principal del juego "Adivina el Pokémon"
export default function Jugar() {
  // Estado que guarda el Pokémon actual a adivinar
  const [pokemon, setPokemon] = useState(null);
  // Estado para la respuesta escrita por el usuario
  const [respuesta, setRespuesta] = useState("");
  // Mensaje de feedback para el usuario (acierto, error, etc)
  const [mensaje, setMensaje] = useState("");
  const [revelar, setRevelar] = useState(false);
  // Número de intentos fallidos en la ronda actual
  const [intentos, setIntentos] = useState(0);
  // Puntos acumulados en la sesión
  const [puntos, setPuntos] = useState(0);
  const [record, setRecord] = useState(
    localStorage.getItem("recordPuntos") || 0
  );
  // Texto de pista (tipo del Pokémon)
  const [pista, setPista] = useState("");
  // Contador para mostrar la pista tras fallar 3 veces
  const [contadorPista, setContadorPista] = useState(0);
  // Intentos restantes antes de mostrar la pista
  const [intentosRestantes, setIntentosRestantes] = useState(3);
  // Si es true, se habilita el botón para escuchar el sonido del Pokémon
  const [botonSonidoDesbloqueado, setBotonSonidoDesbloqueado] = useState(false);

  // Al montar el componente, carga un Pokémon aleatorio
  useEffect(() => {
    cargarPokemon();
  }, []);

  // Controla el temporizador para mostrar la pista tras fallar 3 veces
  useEffect(() => {
    if (contadorPista > 0) {
      const timer = setTimeout(() => {
        setContadorPista(contadorPista - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (contadorPista === 0 && intentos >= 3 && pokemon) {
      // Cuando el contador llega a 0, muestra la pista (tipo del Pokémon)
      const tipos = pokemon.types.map((tipo) => tipo.type.name).join(", ");
      setPista(`Pista: Es de tipo ${tipos}`);
    }
  }, [contadorPista, intentos, pokemon]);

  // Función para cargar un Pokémon aleatorio de la PokéAPI
  function cargarPokemon() {
    const id = Math.floor(Math.random() * 1010) + 1; 
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        setRevelar(false);
        resetEstado(); // Resetea los estados de la ronda
      })
      .catch(() => setMensaje("Error al cargar el Pokémon. Inténtalo nuevamente."));
  }

  // Resetea los estados de la ronda (intentos, pista, etc)
  function resetEstado() {
    setMensaje("");
    setRespuesta("");
    setIntentos(0);
    setIntentosRestantes(3);
    setContadorPista(0);
    setPista("");
    setBotonSonidoDesbloqueado(false);
  }

  // Reproduce el sonido del Pokémon (si está desbloqueado)
  function reproducirSonido() {
    if (pokemon && pokemon.cries && pokemon.cries.latest) {
      const audio = new Audio(pokemon.cries.latest);
      audio.play();
    }
  }

  // Guarda la puntuación en Firestore (ranking global)
  function guardarPuntuacion(puntos) {
    const usuario = localStorage.getItem('usuario') || 'Anónimo';
    addDoc(collection(db, "rankings"), {
      usuario: usuario,
      puntos: puntos,
      timestamp: new Date(),
    })
    .then(() => {
      // Opcional: mensaje de éxito
    })
    .catch((err) => {
      console.error("Error al guardar la puntuación:", err);
    });
  }

  // Verifica si la respuesta del usuario es correcta
  function verificarRespuesta() {
    if (!pokemon || respuesta.trim() === "") {
      setMensaje("Por favor, escribe una respuesta antes de verificar.");
      return;
    }
    // Si acierta el nombre
    if (respuesta.toLowerCase() === pokemon.name.toLowerCase()) {
      setMensaje(`¡Correcto! Era ${pokemon.name}`);
      setRevelar(true); // Muestra el Pokémon a color
      const nuevosPuntos = puntos + 1;
      // Si supera el récord, lo guarda en localStorage y en Firestore
      if (nuevosPuntos > record) {
        setRecord(nuevosPuntos);
        localStorage.setItem("recordPuntos", nuevosPuntos);
        guardarPuntuacion(nuevosPuntos); // Guarda en Firestore si es récord
      }
      setPuntos(nuevosPuntos);
      setTimeout(cargarPokemon, 1500); // Carga otro Pokémon tras 1,5s
    } else {
      manejarFallo(); // Si falla, gestiona los intentos y pistas
    }
  }

  // Lógica para gestionar los fallos y desbloqueo de pistas/sonido
  function manejarFallo() {
    const nuevoIntento = intentos + 1;
    setIntentos(nuevoIntento);
    setRespuesta("");
    setIntentosRestantes(3 - nuevoIntento);
    if (nuevoIntento === 3) {
      setMensaje("Fallaste 3 veces. La pista aparecerá en 5 segundos...");
      setContadorPista(5); // Empieza cuenta atrás para la pista
    } else if (nuevoIntento === 4) {
      setMensaje("Te queda 1 fallo para desbloquear el sonido.");
    } else if (nuevoIntento === 5) {
      setMensaje("Se ha desbloqueado el sonido del Pokémon.");
      setBotonSonidoDesbloqueado(true); // Permite escuchar el sonido
    } else {
      setMensaje("");
    }
  }

  // Renderizado del juego
  return (
    <div className="juego-container">
      <h1 className="titulo">Adivina el Pokémon</h1>
      <h2 className="record">Puntos: {puntos} | Récord: {record}</h2>
      {pokemon && (
        <>
          {/* Imagen del Pokémon. Si no se ha acertado, se muestra en silueta (blanco y negro) */}
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={`Silueta de ${pokemon.name}`}
            className="pokemon-imagen"
            style={{ filter: revelar ? "none" : "grayscale(100%) contrast(0%)" }}
          />
          <br />
          {/* Input para escribir la respuesta */}
          <input
            type="text"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
            placeholder="Escribe el nombre del Pokémon"
            className="input-texto"
          />
          {/* Botón para comprobar la respuesta */}
          <button onClick={verificarRespuesta} className="boton">
            Verificar
          </button>
          {/* Botón para saltar a otro Pokémon */}
          <button onClick={cargarPokemon} className="boton">
            Nuevo Pokémon
          </button>
          {/* Mensaje de feedback (acierto, error, etc) */}
          <p className="mensaje">{mensaje}</p>
          {/* Muestra los intentos restantes antes de la pista */}
          {intentosRestantes > 0 && intentos < 3 && (
            <p className="intentos-restantes">
              Te quedan {intentosRestantes} intentos antes de la pista.
            </p>
          )}
          {/* Cuenta atrás para mostrar la pista */}
          {contadorPista > 0 && <p className="contador-pista">La pista aparecerá en {contadorPista} segundos...</p>}
          {/* Pista del tipo de Pokémon */}
          {pista && <p className="pista">{pista}</p>}
          {/* Botón para escuchar el sonido del Pokémon (si está desbloqueado) */}
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
