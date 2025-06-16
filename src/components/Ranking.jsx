// Página de ranking de puntuaciones usando Firestore y promesas
// Importa hooks de React para estado y efectos
import { useEffect, useState } from "react";
// Importa la instancia de Firestore
import { db } from "../firebase";
// Importa funciones de Firestore para consultar la base de datos
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
// Importa los estilos del ranking
import "../assets/ranking.css";

// Componente principal de Ranking
export default function Ranking() {
  // Estado para guardar los datos del ranking
  const [rankings, setRankings] = useState([]);
  // Estado para mostrar si está cargando
  const [cargando, setCargando] = useState(true);
  // Estado para mostrar errores
  const [error, setError] = useState("");

  // useEffect para cargar el ranking al montar el componente
  useEffect(() => {
    // Crea una consulta a Firestore: top 10 por puntos descendente
    const q = query(collection(db, "rankings"), orderBy("puntos", "desc"), limit(10));
    // Ejecuta la consulta y obtiene los datos
    getDocs(q)
      .then((snapshot) => {
        // Extrae los datos de cada documento
        const datos = snapshot.docs.map((doc) => doc.data());
        setRankings(datos); // Guarda los datos en el estado
        setCargando(false); // Deja de mostrar el loading
      })
      .catch(() => {
        setError("Error al cargar el ranking"); // Muestra error si falla
        setCargando(false);
      });
  }, []);

  // Renderiza la tabla de ranking
  return (
    <section className="ranking-section">
      <h2>Ranking de Puntuaciones</h2>
      {/* Mensaje de carga */}
      {cargando && <div className="ranking-cargando">Cargando...</div>}
      {/* Mensaje de error */}
      {error && <div className="ranking-error">{error}</div>}
      {/* Tabla de ranking si hay datos */}
      {!cargando && !error && (
        <table className="ranking-table">
          <thead>
            <tr>
              <th>Posición</th>
              <th>Usuario</th>
              <th>Puntos</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((r, i) => (
              <tr key={i}>
                <td>{i + 1}</td> {/* Posición en el ranking */}
                <td>{r.usuario}</td> {/* Nombre del usuario */}
                <td>{r.puntos}</td> {/* Puntos obtenidos */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
