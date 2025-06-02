import { useEffect, useState } from 'react';

const API_URL = 'https://pokeapi.co/api/v2/pokemon';

function Pokemons() {
  const [pokemones, setPokemones] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [pagina, setPagina] = useState(0);
  const [busqueda, setBusqueda] = useState('');
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
        setCargando(false);
        setSeleccionado(null);
      })
      .catch(() => {
        setPokemones([]);
        setCargando(false);
        setError('Pokémon no encontrado');
      });
  };

  // Mostrar detalles
  const mostrarDetalle = (url) => {
    setCargando(true);
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setSeleccionado(data);
        setCargando(false);
      });
  };

  // Volver al listado
  const volverALista = () => setSeleccionado(null);

  // Cambiar la lógica de paginación a "Cargar más"
const cargarMasPokemones = () => {
  setCargando(true);
  fetch(`${API_URL}?limit=12&offset=${pokemones.length}`)
    .then((res) => res.json())
    .then((data) => {
      setPokemones((prev) => [...prev, ...data.results]);
      setCargando(false);

      // Mantener la posición del scroll
      setTimeout(() => {
        const scrollY = window.scrollY;
        window.scrollTo({ top: scrollY, behavior: 'smooth' });
      }, 0);
    });
};

  return (
    <section style={{maxWidth:'900px',margin:'0 auto',padding:'1rem'}}>
      <h2>Pokémons</h2>
      <form onSubmit={manejarBusqueda} style={{marginBottom:'1rem'}}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={e => { setBusqueda(e.target.value); setError(''); }}
          style={{padding:'0.5rem',fontSize:'1rem',borderRadius:'8px',border:'1px solid #ccc'}}
        />
        <button type="submit" style={{marginLeft:'0.5rem',padding:'0.5rem 1rem',borderRadius:'8px',border:'none',background:'#1976d2',color:'#fff'}}>Buscar</button>
        {busqueda && <button type="button" onClick={()=>{setBusqueda('');setPagina(0);}} style={{marginLeft:'0.5rem'}}>Limpiar</button>}
      </form>
      {error && <div style={{color:'red'}}>{error}</div>}
      {cargando && <div>Cargando...</div>}
      {!seleccionado && !cargando && (
        <>
          <div style={{display:'flex',flexWrap:'wrap',gap:'1.5rem',justifyContent:'center'}}>
            {pokemones.map(p => {
              // Obtener el id del Pokémon desde la URL
              const id = p.url.split('/').filter(Boolean).pop();
              return (
                <div key={p.name} style={{background:'#f8f8f8',padding:'1rem',borderRadius:'12px',width:'150px',textAlign:'center',cursor:'pointer',boxShadow:'0 2px 8px #0001'}} onClick={()=>mostrarDetalle(p.url)}>
                  <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                    alt={p.name}
                    style={{width:'100px',height:'100px',objectFit:'contain',marginBottom:'0.5rem'}}
                  />
                  <b style={{textTransform:'capitalize'}}>{p.name}</b>
                </div>
              );
            })}
          </div>
          {!busqueda && (
            <div style={{marginTop:'2rem',display:'flex',justifyContent:'center'}}>
              <button onClick={cargarMasPokemones} disabled={cargando} style={{padding:'0.5rem 1rem',borderRadius:'8px',border:'none',background:'#1976d2',color:'#fff',cursor:'pointer'}}>
                {cargando ? 'Cargando...' : 'Cargar más'}
              </button>
            </div>
          )}
        </>
      )}
      {seleccionado && (
        <div style={{marginTop:'2rem',background:'#fff',padding:'2rem',borderRadius:'16px',boxShadow:'0 2px 8px #0002',maxWidth:'400px',marginLeft:'auto',marginRight:'auto'}}>
          <button onClick={volverALista} style={{marginBottom:'1rem'}}>Volver</button>
          <h3 style={{textTransform:'capitalize'}}>{seleccionado.name}</h3>
          <img src={seleccionado.sprites?.other?.dream_world?.front_default || seleccionado.sprites?.front_default} alt={seleccionado.name} style={{width:'200px', height:'200px', objectFit:'contain', marginBottom:'1rem'}} />
          <ul style={{textAlign:'left',margin:'1rem auto',maxWidth:'300px'}}>
            <li><b>ID:</b> {seleccionado.id}</li>
            <li><b>Altura:</b> {seleccionado.height}</li>
            <li><b>Peso:</b> {seleccionado.weight}</li>
            <li><b>Tipos:</b> {seleccionado.types.map(t=>t.type.name).join(', ')}</li>
            <li><b>Habilidades:</b> {seleccionado.abilities.map(a=>a.ability.name).join(', ')}</li>
            <li><b>Experiencia base:</b> {seleccionado.base_experience}</li>
          </ul>
        </div>
      )}
    </section>
  );
}

export default Pokemons;
