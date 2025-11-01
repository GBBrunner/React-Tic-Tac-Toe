import { useState } from 'react'
import './App.css'
import { Box } from './componenets/Box.jsx';

let turn = "X";
const game = new Array(9).fill(null);
const boxLength = 9;

function boxClick(index){
  const box = document.getElementById(`box-${index}`);
  console.log('Box clicked:', index);

  if (box.innerText !== "" || document.getElementById("game-status").innerText !== "") return;
  box.innerText = turn;
  game[index] = turn;
  console.log(game);
  turn = turn === "X" ? "O" : "X";
  if (turn === "X") box.style.color = "red";
  else box.style.color = "blue";
  checkWin();

}

function restartGame() {
    const gameStatus = document.getElementById("game-status");
    gameStatus.innerText = "";
    turn = "X";
  game.fill(null);
    for (let i = 0; i < boxLength; i++) {
        const box = document.getElementById(`box-${i}`);
        box.innerText = "";
        box.style.color = "black";
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
function TicTacToe() {
  return (
    <>
      <div id="game-board">
        {Array.from({ length: boxLength }).map((_, i) => (
          <Box key={i} index={i} onClick={() => boxClick(i)} />
        ))}
      </div>
      <div>
        <button id="restart-game" onClick={() => restartGame()}>Restart Game</button>
        <p id="game-status"></p>
      </div>
    </>
  )
}

export default TicTacToe