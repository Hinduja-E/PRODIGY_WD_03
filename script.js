const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleClick(event) {
  const cellIndex = event.target.getAttribute("data-index");

  if (boardState[cellIndex] !== "" || !gameActive) return;

  boardState[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkWin()) {
    message.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (boardState.every((cell) => cell !== "")) {
    message.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
}

function checkWin() {
  return winningConditions.some((condition) => {
    const [a, b, c] = condition;
    return (
      boardState[a] &&
      boardState[a] === boardState[b] &&
      boardState[a] === boardState[c]
    );
  });
}

function resetGame() {
  boardState = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = "X";
  gameActive = true;
  message.textContent = "";
}

cells.forEach((cell) => cell.addEventListener("click", handleClick));
resetButton.addEventListener("click", resetGame);
