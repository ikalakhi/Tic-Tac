import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning_combinations"

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function driveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player == 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePalyer = driveActivePlayer(gameTurns);

  let gameBoard = initialGameBoard;
  let winner;

  for(const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard[row][col] = player;
  }

  for(const combinations of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combinations[0].row][combinations[0].col];
    const secondSquare = gameBoard[combinations[1].row][combinations[1].col];
    const thirdSquare = gameBoard[combinations[2].row][combinations[2].col];

    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = firstSquare;
    }
  }

  function handeSelectSquare (rowIndex, colIndex) {
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
        {winner && <p>You won,${winner}!</p>}
        <GameBoard onSelectSquare={handeSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
