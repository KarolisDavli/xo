const Player = (name, symbol) => {
  const playerName = name;
  const playerSymbol = symbol;

  return {
    playerName,
    playerSymbol,
  };
};

const Game = (() => {
  const player1 = Player("p1", "x");
  const player2 = Player("p2", "o");

  const board = document.getElementById("board");
  const gameBoard = ["", "", "", "", "", "", "", "", ""];
  let activePlayer = player1;

  const setActivePlayer = () => {
    if (activePlayer == player1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;
    }
    return activePlayer;
  };

  const takeTurn = (e) => {
    if (e.target.innerHTML === "") {
      e.target.textContent = activePlayer.playerSymbol;
      e.target.style.backgroundImage = `url('./img/${activePlayer.playerSymbol}mark.png')`;
      let PushIndex = e.target.getAttribute("index");
      gameBoard.splice(PushIndex, 1, activePlayer.playerSymbol);
      setActivePlayer();
      _checkWinner();
    } else if (e.target.innerHTML != "") {
      alert("Choose a different tile");
    }
  };

  const renderGameBoard = () => {
    let count = 0;
    gameBoard.map((cell) => {
      const square = document.createElement("div");
      square.setAttribute("index", count);
      square.classList.add("cell");
      square.addEventListener("click", takeTurn);
      square.append(cell);
      board.append(square);
      count++;
    });
  };

  const _checkRows = () => {
    row1 = [gameBoard[0], gameBoard[1], gameBoard[2]];
    row2 = [gameBoard[3], gameBoard[4], gameBoard[5]];
    row3 = [gameBoard[6], gameBoard[7], gameBoard[8]];

    allRows = [row1, row2, row3];
    console.log(allRows);

    allRows.forEach((row) => {
      if (row.every((i) => i == "x") || row.every((i) => i == "o")) {
        console.log("linija");
      }
    });
  };

  const _checkColumns = () => {
    col1 = [gameBoard[0], gameBoard[3], gameBoard[6]];
    col2 = [gameBoard[1], gameBoard[4], gameBoard[7]];
    col3 = [gameBoard[2], gameBoard[5], gameBoard[8]];

    allCols = [col1, col2, col3];

    allCols.forEach((col) => {
      if (col.every((i) => i == "x") || col.every((i) => i == "o")) {
        console.log("stulpelis");
      }
    });
  };

  const _checkDiagonal = () => {
    diag1 = [gameBoard[0], gameBoard[4], gameBoard[8]];
    diag2 = [gameBoard[2], gameBoard[4], gameBoard[6]];

    allDiags = [diag1, diag2];

    allDiags.forEach((diag) => {
      if (diag.every((i) => i == "x") || diag.every((i) => i == "o")) {
        console.log("diagnole");
      }
    });
  };

  const _checkWinner = () => {
    _checkColumns();
    _checkRows();
    _checkDiagonal();
  };

  return {
    activePlayer,
    renderGameBoard,
    setActivePlayer,
  };
})();

Game.renderGameBoard();
