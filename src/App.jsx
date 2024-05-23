import { useState } from "react"
import GameBoard from "./components/GameBoard"
import Player from "./components/Player"

function App() {
  const [activePalyer, setActivePalyer] = useState('X');

  function handeSelectSquare () {
    setActivePalyer((currentActivePalyer) => currentActivePalyer === 'X' ? 'O': 'X');
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePalyer === 'X'}/>
          <Player initialName="Player 2" symbol="O" isActive={activePalyer === 'O'}/>
        </ol>
        <GameBoard onSelectSquare={handeSelectSquare} activePlayerSymbol={activePalyer}/>
      </div>
    </main>
  )
}

export default App
