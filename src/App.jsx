import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './components/Landing';
import Jugar from './components/Jugar';
import { Listado } from './components/Listado';
import { Detalle } from './components/Detalle';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/jugar" element={<Jugar />} />
        <Route path="/listado" element={<Listado />} />
        <Route path="/detalles/:id" element={<Detalle />} />
      </Routes>
    </Router>
  );
}

export default App;
