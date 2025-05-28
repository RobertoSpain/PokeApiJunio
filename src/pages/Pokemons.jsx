import { useEffect, useState } from 'react';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

function Pokemons() {
  const [pokemones, setPokemones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [pagina, setPagina] = useState(0);
  const [busqueda, setBusqueda] = useState('');
  const [total, setTotal] = useState(0);
  const [seleccionado, setSeleccionado] = useState(null);
  const [error, setError] = useState('');

  // Obtener pokemones paginados
  useEffect(() => {
    if (busqueda) return;
    setCargando(true);
    fetch(`${API_URL}?limit=12&offset=${pagina * 12}`)
      .then(res => res.json())
      .then(data => {
        setPokemones(data.results);
        setTotal(data.count);
        setCargando(false);
        setSeleccionado(null);
      });
  }, [pagina, busqueda]);

  // Buscar por nombre
  const manejarBusqueda = (e) => {
    e.preventDefault();
    if (!busqueda) return;
    setCargando(true);
    fetch(`${API_URL}/${busqueda.toLowerCase()}`)
      .then(res => {
        if (!res.ok) throw new Error('No encontrado');
        return res.json();
      })
      .then(data => {
        setPokemones([{ name: data.name, url: `${API_URL}/${data.id}/` }]);
        setTotal(1);
        setCargando(false);
        setSeleccionado(null);
      })
      .catch(() => {
        setPokemones([]);
        setTotal(0);
        setCargando(false);
        setError('Pokémon no encontrado');
      });
  };

}

export default Pokemons;
