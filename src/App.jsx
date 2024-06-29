import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning_combinations"
import GameOver from "./components/GameOver";

const PLAYRS = {
  X : 'player 1',
  O : 'player 2'
}

const INITIAL_GAME_BOARD = [
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

function driveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for(const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}


function driveWinner(gameBoard, player) {
  let winner;

  for(const combinations of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combinations[0].row][combinations[0].col];
    const secondSquare = gameBoard[combinations[1].row][combinations[1].col];
    const thirdSquare = gameBoard[combinations[2].row][combinations[2].col];

    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare) {
      winner = player[firstSquare];
    }
  }
  return winner
}

//the main App function
function App() {
  const [player, setPlayer] = useState(PLAYRS);
  const [gameTurns, setGameTurns] = useState([]);
  const activePalyer = driveActivePlayer(gameTurns);
  const gameBoard = driveGameBoard(gameTurns);
  const winner = driveWinner(gameBoard, player);
  const hasDraw = !winner && gameTurns.length === 9;

  function handeSelectSquare (rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currentPlayer = driveActivePlayer(prevTurns);

      const updatedTurns = [
        { square:{ row: rowIndex, col: colIndex}, player:currentPlayer},
        ...prevTurns];
        return updatedTurns;
    });
  }

  function handelRestart() {
    setGameTurns([]);
  }

  function handelPlayerNameChange(symbol, newName) {
    setPlayer(prevPlayer => {
      return {
        ...prevPlayer,
        [symbol] : newName
      };
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYRS.X} symbol="X" isActive={activePalyer === 'X'} onChangeName={handelPlayerNameChange}/>
          <Player initialName={PLAYRS.O} symbol="O" isActive={activePalyer === 'O'} onChangeName={handelPlayerNameChange}/>
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handelRestart}/>}
        <GameBoard onSelectSquare={handeSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
