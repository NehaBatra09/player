import './App.css'
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom'
import NewPlayerScreen from './components/newPlayerScreen';
import PlayerSelectionScreen from './components/playerSelectionScreen';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path="/" Component={PlayerSelectionScreen} />
          <Route path="/new-player" Component={NewPlayerScreen} />

        </Routes>

      </BrowserRouter >

    </>
  );
}

export default App;
