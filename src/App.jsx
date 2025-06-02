import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing';
import Pokemons from './pages/Pokemons';
import Jugar from './pages/Jugar';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pokemons" element={<Pokemons />} />
        <Route path="/jugar" element={<Jugar />} />
      </Routes>
    </Router>
  );
}

export default App;
