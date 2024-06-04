import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning_combinations"

function driveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player == 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePalyer, setActivePalyer] = useState('X');

  const activePalyer = driveActivePlayer(gameTurns);

  function handeSelectSquare (rowIndex, colIndex) {
    // setActivePalyer((currentActivePalyer) => currentActivePalyer === 'X' ? 'O': 'X');
    setGameTurns(prevTurns => {
      const currentPlayer = driveActivePlayer(prevTurns);

      const updatedTurns = [
        { square:{ row: rowIndex, col: colIndex}, player:currentPlayer},
        ...prevTurns];
        return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePalyer === 'X'}/>
          <Player initialName="Player 2" symbol="O" isActive={activePalyer === 'O'}/>
        </ol>
        <GameBoard onSelectSquare={handeSelectSquare} turns={gameTurns}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
