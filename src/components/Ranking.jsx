// Página de ranking de puntuaciones usando Firestore y promesas
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import "../assets/ranking.css";

export default function Ranking() {
  const [rankings, setRankings] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Consulta a Firestore para obtener los 10 mejores
    const q = query(collection(db, "rankings"), orderBy("puntos", "desc"), limit(10));
    getDocs(q)
      .then((snapshot) => {
        const datos = snapshot.docs.map((doc) => doc.data());
        setRankings(datos);
        setCargando(false);
      })
      .catch(() => {
        setError("Error al cargar el ranking");
        setCargando(false);
      });
  }, []);

  return (
    <section className="ranking-section">
      <h2>Ranking de Puntuaciones</h2>
      {cargando && <div className="ranking-cargando">Cargando...</div>}
      {error && <div className="ranking-error">{error}</div>}
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
                <td>{i + 1}</td>
                <td>{r.usuario}</td>
                <td>{r.puntos}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
