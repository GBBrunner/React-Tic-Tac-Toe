import React, { useEffect, useState } from 'react'
import './App.css'
import { Box } from './componenets/Box.jsx';
import { PrevTurn } from './componenets/PrevTurn.jsx';
import TestDiv from "./componenets/TestDiv";

let player = "X";
let round = [];
const game = new Array(9).fill(null);
const boxLength = 9;
const gameHistory = [];

function setBoardTurnClass(currentTurn) {
  const board = document.getElementById("game-board");
  if (board) {
    board.classList.remove("player-x", "player-o");
    board.classList.add(currentTurn === "X" ? "player-x" : "player-o");
  }
}
function checkWin() {
  const gameStatus = document.getElementById("game-status");
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  
  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (game[a] && game[a] === game[b] && game[a] === game[c]) {
      gameStatus.innerText = `Player ${game[a]} wins!`;
      return;
    }
  }
  if (!game.includes(null)) {
    gameStatus.innerText = "It's a draw!";
  }
}
let turn = 0;
function App() {
  const [testDivs, setTestDivs] = useState([]);
  const [nextId, setNextId] = useState(0);

  const restartGame = () => {
    turn = 0;
    const gameStatus = document.getElementById("game-status");
    if (gameStatus) gameStatus.innerText = "";
    player = "X";
    game.fill(null);
    for (let i = 0; i < boxLength; i++) {
      const box = document.getElementById(`box-${i}`);
      if (box) {
        box.innerText = "";
        box.style.backgroundColor = "";
        box.style.color = "";
      }
    }
    setTestDivs([]);
    setNextId(0);
    setBoardTurnClass(player);
  }

  const PrevBtnClick = (index) => {
    console.log('test');
    for (let i = 0; gameHistory.length > index; i++) {
      console.log(gameHistory);
      gameHistory.pop();
      turn--;
    }
    game = [...gameHistory[gameHistory.length - 1] || new Array(9).fill(null)];
    for (let i = 0; i < boxLength; i++) {
      const box = document.getElementById(`box-${i}`);
      if (box) {
        box.innerText = game[i] || "";
        box.style.backgroundColor = "";
        box.style.color = "";
      }
    }
  };

  const boxClick = (index) => {
    const box = document.getElementById(`box-${index}`);
    console.log('Box clicked:', index);

    if (box.innerText !== "" || document.getElementById("game-status").innerText !== "") return;
    turn = turn + 1;
    console.log('Turn:', turn);
    round = [turn, player];
    box.innerText = player;
    game[index] = player;
    console.log(game);
    console.log(round);
    gameHistory.push([...game]);
    // create a new TestDiv entry for this click
    setTestDivs(prev => [...prev, { id: nextId, box: index, mark: game[index] }]);
    setNextId(n => n + 1);
    player = player === "X" ? "O" : "X";
    if (player === "X") box.style.color = "red";
    else box.style.color = "blue";
    setBoardTurnClass(player);
    checkWin();
}

  useEffect(() => {
    setBoardTurnClass(player);
  }, []);
  return (
    <>
      <div id="game-board">
        {Array.from({ length: boxLength }).map((_, i) => (
          <Box key={i} index={i} onClick={() => boxClick(i)} />
        ))}
      </div>
      <div id="test-divs-container">
        {testDivs.map(td => (
          <TestDiv key={td.id} turn={td.id + 1} onClick={() => PrevBtnClick(td.id + 1)} />
        ))}
      </div>
      <div>
        <button id="restart-game" onClick={() => restartGame()}>Restart Game</button>
        <p id="game-status"></p>
      </div>
    </>
  )
}

export default App
