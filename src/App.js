import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import PlayersScreen from './components/playerScreen';
import NewPlayerScreen from './components/newPlayerScreen';
import PlayerSelectionScreen from './components/playerSelectionScreen';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<PlayersScreen />} />
          <Route path="/new-player" element={<NewPlayerScreen />} />
          <Route path="/player-selection" element={<PlayerSelectionScreen />} />

        </Routes>

      </BrowserRouter >

    </>
  );
}

export default App;
