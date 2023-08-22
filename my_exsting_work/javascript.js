//  Accessing elementys in th DOM
const tiles = Array.from(document.querySelectorAll(".tile"));
const strtBtn = document.getElementById("startBtn");
let board = ["", "", "", "", "", "", "", "", ""];
var ply1 = document.getElementById("Player1").innerHTML;
var ply2 = document.getElementById("Player2").innerHTML;
//    unicode forcross and tick  symbols in javascript code
const X = "\u2A2F";
const O = "\u2713";
// GLOBAL VARIABLES
let currentPlayer = X;
let isGameActive = true;
const COMPUTER_WON = "COMPUTER_WON";
const PLAYERX_WON = "PLAYERX_WON";
const PLAYERO_WON = "PLAYERO_WON";
const TIE = "TIE";
let computerSymbol = O;
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
//function to ask user for game MOde (Single player OR Multiplyer)
swal
  .fire({
    title: "please select the Playing Mode",
    icon: "info",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Multiplyer",
    denyButtonText: `Single Player`,
  })
  .then((result) => {
    //if player select Multiplyer Game  then Ask for Player Names
    if (result.isConfirmed) {
      Swal.fire({
        title: "Enter Player Names",
        html: `<input type="text" id="p1Value"  placeholder="Player1 ">
				  <input type="text" id="P2Value"  placeholder="Player2">`,
        confirmButtonText: "submit",
        showCancelButton: true,
        cancelButtonColor: "#8CD4F5",
        focusConfirm: false,
        allowEscapeKey: false,
        allowOutsideClick: false,
        preConfirm: () => {
          const p1 = document.getElementById("p1Value").value;
          const p2 = document.getElementById("P2Value").value;

          if (p1 === "" || p2 === "") {
            Swal.showValidationMessage("Please enter both Player Names");
          }

          $("#player1Name").text(p1);
          $("#player1Symbol").text(X);
          $("#player2Name").text(p2);
          $("#player2Symbol").text(O);
        },
      }).then((result) => {
        if (result.isDenied) {
          isGameActive = false;
        }
      });
      // add eventListener on each box

      tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => userAction(tile, index));
      });
    }
    // if user select single player game MOde
    else if (result.isDenied) {
      tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => {
          if (isMarked(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            board[index] = currentPlayer;
            computerTurn();
          }
        });
      });
    } else {
      isGameActive = false;
    }
  });

// checks whether the specefic title is  already marked or not
const isMarked = (tile) => {
  if (tile.innerText === X || tile.innerText === O) {
    return false;
  }

  return true;
};

// function to display the name of winner
let DisplayResult = (mode) => {
  let player1Name = $("#player1Name").text();
  let player2Name = $("#player2Name").text();

  if (player1Name === "" || player2Name === "") {
    player1Name = "Player 1";
    player2Name = "Player 2";
  }

  switch (mode) {
    case PLAYERO_WON:
      Swal.fire({
        icon: "Success",
        title: `${player2Name} wins match`,
      });
      break;
    case PLAYERX_WON:
      Swal.fire({
        icon: "Success",
        title: `${player1Name} wins match`,
      });
      break;
    case COMPUTER_WON:
      Swal.fire({
        icon: "success",
        title: "Computer Wins  Match",
      });
      break;
    case TIE:
      Swal.fire({
        icon: "error",
        title: "Match Tie",
      });
  }
};
// function for computer turn in case of sigle player game MOde
function computerTurn() {
  let flag = true;
  let random = 0;
  tiles.forEach((tile, index) => {
    if (isMarked && flag === true) {
      random = Math.ceil(Math.random() * 8);
      console.log("random", random);
      console.log("tiles[random]", tiles[random]);
      if (tiles[random].innerHTML === "") {
        board[random] = computerSymbol;
        tiles[random].innerHTML = computerSymbol;
      } else {
        tiles.forEach((tile, index) => {
          if (tile.innerHTML === "" && flag) {
            // board[indexof(tile)]=computerSymbol;
            tile.innerHTML = computerSymbol;
            board[index] = computerSymbol;
            flag = false;
            return;
          }
        });
      }

      console.log("tiles", tiles);
      console.log("board[random]:", board[random]);
      console.log("board", board);
      flag = false;
      computerResultValidation();

      return;
    }
  });
}

function computerResultValidation() {
  let mode = "";
  let playerWins = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];

    const a = board[winCondition[0]];

    const b = board[winCondition[1]];

    const c = board[winCondition[2]];

    if (a === b && b === c && c === X) {
      mode = PLAYERX_WON;
      playerWins = true;
      break;
    } else if (a === b && b === c && c === computerSymbol) {
      mode = COMPUTER_WON;
      playerWins = true;
      break;
    }
    // BAS
  }
  if (playerWins) {
    DisplayResult(mode === PLAYERX_WON ? PLAYERX_WON : COMPUTER_WON);
    isGameActive = false;
    return;
  }
  console.log("board", board);
  if (mode != PLAYERX_WON && COMPUTER_WON && !board.includes("")) {
    DisplayResult(TIE);
  }
}

//    function to check the winning Conditions is true or not
function handleResultValidation() {
  let playerWins = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];

    const a = board[winCondition[0]];

    const b = board[winCondition[1]];

    const c = board[winCondition[2]];

    if (a === "" || b === "" || c === "") {
      continue;
    }

    if (a === b && b === c) {
      playerWins = true;
      break;
    }
  }
  if (playerWins) {
    DisplayResult(currentPlayer === X ? PLAYERX_WON : PLAYERO_WON);
    isGameActive = false;
    return;
  }

  if (!board.includes("")) DisplayResult(TIE);
}

//function to change player
const changePlayer = () => {
  currentPlayer = currentPlayer === X ? O : X;
};

const userAction = (tile, index) => {
  if (isMarked(tile) && isGameActive) {
    tile.innerText = currentPlayer;

    board[index] = currentPlayer;

    handleResultValidation();
    changePlayer();
  }
};

// function to start New game

function resetgame() {
  board = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;

  tiles.forEach((tile) => {
    tile.innerText = "";
  });
}

strtBtn.addEventListener("click", resetgame);
