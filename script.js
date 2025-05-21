let playerRed = "R";
let playerYellow = "Y";
let currPlayer = playerRed;

let gameOver = false;
let board;
let currColumns;

let rows = 6;
let columns = 7;

window.onload = function () {
  setGame();
};

function setGame() {
  board = [];
  currColumns = [5, 5, 5, 5, 5, 5, 5];

  for (let r = 0; r < rows; r++) {
    let row = [];
    for (let c = 0; c < columns; c++) {
      row.push(" ");

      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      document.getElementById("board").append(tile);
    }
    board.push(row);
  }
}

function setPiece() {
  if (gameOver) return;

  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  r = currColumns[c];
  if (r < 0) return;

  board[r][c] = currPlayer;
  let tile = document.getElementById(r.toString() + "-" + c.toString());

  if (currPlayer == playerRed) {
    tile.classList.add("red-piece");
    currPlayer = playerYellow;
  } else {
    tile.classList.add("yellow-piece");
    currPlayer = playerRed;
  }

  currColumns[c] = r - 1;

  checkWinner();
}

function checkWinner() {
  // Horizontal
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (
        board[r][c] != " " &&
        board[r][c] == board[r][c + 1] &&
        board[r][c + 1] == board[r][c + 2] &&
        board[r][c + 2] == board[r][c + 3]
      ) {
        highlightTiles([
          [r, c],
          [r, c + 1],
          [r, c + 2],
          [r, c + 3],
        ]);
        setWinner(r, c);
        return;
      }
    }
  }

  // Vertical
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (
        board[r][c] != " " &&
        board[r][c] == board[r + 1][c] &&
        board[r + 1][c] == board[r + 2][c] &&
        board[r + 2][c] == board[r + 3][c]
      ) {
        highlightTiles([
          [r, c],
          [r + 1, c],
          [r + 2, c],
          [r + 3, c],
        ]);
        setWinner(r, c);
        return;
      }
    }
  }

  // Diagonal ↘
  for (let r = 0; r < rows - 3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (
        board[r][c] != " " &&
        board[r][c] == board[r + 1][c + 1] &&
        board[r + 1][c + 1] == board[r + 2][c + 2] &&
        board[r + 2][c + 2] == board[r + 3][c + 3]
      ) {
        highlightTiles([
          [r, c],
          [r + 1, c + 1],
          [r + 2, c + 2],
          [r + 3, c + 3],
        ]);
        setWinner(r, c);
        return;
      }
    }
  }

  // Diagonal ↙
  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (
        board[r][c] != " " &&
        board[r][c] == board[r - 1][c + 1] &&
        board[r - 1][c + 1] == board[r - 2][c + 2] &&
        board[r - 2][c + 2] == board[r - 3][c + 3]
      ) {
        highlightTiles([
          [r, c],
          [r - 1, c + 1],
          [r - 2, c + 2],
          [r - 3, c + 3],
        ]);
        setWinner(r, c);
        return;
      }
    }
  }
}

function setWinner(r, c) {
  const winner = document.getElementById("winner");
  if (board[r][c] == playerRed) {
    winner.innerText = "🔴 Red Wins!";
  } else {
    winner.innerText = "🟡 Yellow Wins!";
  }
  gameOver = true;
  document.getElementById("play-again-btn").style.display = "inline-block";
}

function highlightTiles(positions) {
  for (let [r, c] of positions) {
    const tile = document.getElementById(`${r}-${c}`);
    tile.classList.add("winning-tile");
  }
}

document.getElementById("play-again-btn").addEventListener("click", () => {
  document.getElementById("board").innerHTML = "";
  document.getElementById("winner").innerText = "";
  document.getElementById("play-again-btn").style.display = "none";

  currPlayer = playerRed;
  gameOver = false;
  setGame();
});
