const boxLength = 9;
const restartButton = document.getElementById("restart-game");
const game = [];
const gameStatus = document.getElementById("game-status");
let turn = "X";

function restartGame() {
    gameStatus.innerText = "";
    turn = "X";
    game.length = 0;
    for (let i = 0; i < boxLength; i++) {
        const box = document.getElementById(`box-${i}`);
        box.innerText = "";
        box.style.color = "black";
    }
}

function checkWin() {
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

    if (!game.includes(undefined)) {
        gameStatus.innerText = "It's a draw!";
    }
}

restartButton.addEventListener("click", restartGame);

const gameBoard = document.getElementById("game-board");
for (let i = 0; i < boxLength; i++) {
    game.push(undefined);
    const box = document.createElement("button");
    box.classList.add("box");
    box.id = `box-${i}`;
    gameBoard.appendChild(box);

    box.addEventListener("click", () => {
        if (box.innerText !== "") return;
        box.innerText = turn;
        game[i] = turn;
        console.log(game);
        turn = turn === "X" ? "O" : "X";
        if (turn === "X") box.style.color = "red";
        else box.style.color = "blue";
        checkWin();
    });
}
document.addEventListener("DOMContentLoaded", () => {
    restartGame();
});