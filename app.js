const cells = document.querySelectorAll(".board .cell");
const reset = document.getElementById("reset");
const player = document.getElementById("player");
const footer = document.querySelector(".app__footer");
const playerNo = document.getElementById("playerNo");
const board = document.querySelector(".board");
const playerName = document.querySelector(".playerName");
const styleSheet = document.styleSheets[0];
const winner_img = document.querySelector(".winner-img");
const pyro = document.querySelector(".pyro");

let currentPlayer = "×";
let isGameOver = false;
const block_center = "7rem / 2";
winner_img.onclick = function () {
  console.log("done");
};

// fill board
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (isGameOver) {
      return;
    }

    // check if cell is empty
    if (cell.innerText !== "") {
      return;
    }
    cell.innerText = currentPlayer;
    if (currentPlayer === "×") {
      currentPlayer = "o";
      cell.style.color = "var(--x-color)";
      player.innerText = "o";
      footer.style.color = "var(--o-color)";
    } else {
      footer.style.color = "var(--x-color)";
      player.innerText = "×";
      cell.style.color = "var(--o-color)";
      currentPlayer = "×";
    }

    checkDraw();
    checkWinner();
  });
});

// reset all
reset.addEventListener("click", () => {
  currentPlayer = "×";
  cells.forEach((cell) => {
    cell.innerText = "";
    player.innerText = "×";
    footer.style.color = "var(--x-color)";
    playerNo.innerHTML = "Player 1's <small>turn</small>";
    playerName.classList.remove("winner-animation");
    pyro.style.display = "none";
    isGameOver = false;
    resetBoard();
  });
});

// check winner
function checkWinner() {
  // check first row
  if (
    cells[0].innerText === cells[1].innerText &&
    cells[1].innerText === cells[2].innerText &&
    cells[0].innerText !== ""
  ) {
    winnerEffect(cells[0].innerText, 3);
    return;
  }
  // check second row
  if (
    cells[3].innerText === cells[4].innerText &&
    cells[3].innerText === cells[5].innerText &&
    cells[3].innerText !== ""
  ) {
    winnerEffect(cells[3].innerText, 1.5);
    return;
  }

  // check third row
  if (
    cells[6].innerText === cells[7].innerText &&
    cells[6].innerText === cells[8].innerText &&
    cells[6].innerText !== ""
  ) {
    winnerEffect(cells[6].innerText, 1);
    return;
  }
  // check first column
  if (
    cells[0].innerText === cells[3].innerText &&
    cells[0].innerText === cells[6].innerText &&
    cells[0].innerText !== ""
  ) {
    winnerEffect(cells[0].innerText, 3, "virtical");
  }

  // check second column
  if (
    cells[1].innerText === cells[4].innerText &&
    cells[1].innerText === cells[7].innerText &&
    cells[1].innerText !== ""
  ) {
    winnerEffect(cells[1].innerText, 1.5, "virtical");
  }

  // check third column
  if (
    cells[2].innerText === cells[5].innerText &&
    cells[2].innerText === cells[8].innerText &&
    cells[2].innerText !== ""
  ) {
    winnerEffect(cells[2].innerText, 1, "virtical");
  }

  // check left diagonal
  if (
    cells[0].innerText === cells[4].innerText &&
    cells[0].innerText === cells[8].innerText &&
    cells[0].innerText !== ""
  ) {
    winnerEffect(cells[0].innerText, 1, "diag_l");
  }

  // check right diagonal
  if (
    cells[2].innerText === cells[4].innerText &&
    cells[2].innerText === cells[6].innerText &&
    cells[2].innerText !== ""
  ) {
    winnerEffect(cells[2].innerText, 1, "diag_r");
  }
}

// winner effect
function winnerEffect(winner, ratio, pos = "horizontal") {
  player.innerText = "🎉";
  let color = winner === "×" ? "var(--x-color)" : "var(--o-color)";
  footer.style.color = color;
  playerNo.innerText = `Player ${winner === "×" ? "1" : "2"} won!`;
  playerName.classList.add("winner-animation");

  board.classList.add(setWinnerClass(pos));
  insertRule(
    pos === "horizontal"
      ? "h"
      : pos === "virtical"
      ? "v"
      : pos === "diag_r"
      ? "diag_r"
      : "diag_l",
    pos == "horizontal" ? "top" : pos === "virtical" ? "left" : "",
    ratio,
    color
  );
  winner_img.style.display = "block";
  isGameOver = true;

  pyro.style.display = "block";
}

// insert rule for pseudo-elements
function insertRule(dir, pos, ratio, color) {
  // Update the pseudo-element style dynamically

  styleSheet.insertRule(
    `
    .winner-${dir}-line::before {
      ${pos}: calc(100% / ${ratio} - ${block_center});
      border-color:${color};
    }
  `,
    styleSheet.cssRules.length
  );
}

function resetBoard() {
  board.classList.remove(
    "winner-h-line",
    "winner-v-line",
    "winner-diag_l-line",
    "winner-diag_r-line"
  );
  winner_img.style.display = "none";
}

function setWinnerClass(pos) {
  switch (pos) {
    case "horizontal":
      return "winner-h-line";
    case "virtical":
      return "winner-v-line";
    case "diag_l":
      return "winner-diag_l-line";
    case "diag_r":
      return "winner-diag_r-line";
    default:
      return "";
  }
}

// check draw
function checkDraw() {
  const isAllCellsFilled = [...cells].every((cell) => cell.innerText !== "");

  if (isAllCellsFilled && !isGameOver) {
    player.innerText = "🤷‍♂️";
    playerNo.innerText = "Draw!";
    footer.style.color = "var(--drow-color) !important";
    playerName.classList.add("winner-animation");
    isGameOver = true;
  }
}
