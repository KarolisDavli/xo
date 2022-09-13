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
  const app = document.getElementById("app");

  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let activePlayer = player1;
  let winner;

  const renderGameBoard = () => {
    let count = 0;
    renderResetButton();
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

  const renderResetButton = () => {
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset Game";
    resetButton.classList.add("btn");
    resetButton.addEventListener("click", resetGame);
    app.append(resetButton);
  };

  const resetGame = () => {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    activePlayer = player1;
    winner = "";
    const tile = document.getElementsByClassName("cell");
    const allTiles = [...tile];
    console.log(allTiles);
    allTiles.map((tile) => tile.removeAttribute("style"));
    allTiles.map((tile) => (tile.textContent = ""));
  };

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
      // console.log(e.target);
      e.target.textContent = activePlayer.playerSymbol;
      e.target.style.backgroundImage = `url('./img/${activePlayer.playerSymbol}mark.png')`;
      let PushIndex = e.target.getAttribute("index");
      gameBoard.splice(PushIndex, 1, activePlayer.playerSymbol);
      _checkWinner();
      setActivePlayer();
    } else if (e.target.innerHTML != "") {
      alert("Choose a different tile");
    }
  };

  const _setWinner = (threeInARow) => {
    if (threeInARow.every((i) => i == "x")) {
      winner = activePlayer.playerName;
      return winner;
    } else if (threeInARow.every((i) => i == "o")) {
      winner = activePlayer.playerName;
      return winner;
    }
  };

  const _announceWinner = () => {
    const announcementText = document.createElement("h1");
    announcementText.textContent = `${winner} bitch`;
    app.append(announcementText);
    // if (winner == "p1") {
    //   app.append(announcementText);
    // } else if (winner == "p2") {
    //   alert("Player 2 is a winner");
    // } else if (_checkIfDraw() == true) {
    //   alert("Draw");
    // }
  };

  const _checkIfDraw = () => {
    return gameBoard.every((i) => i != "");
  };

  const _checkRows = () => {
    row1 = [gameBoard[0], gameBoard[1], gameBoard[2]];
    row2 = [gameBoard[3], gameBoard[4], gameBoard[5]];
    row3 = [gameBoard[6], gameBoard[7], gameBoard[8]];
    allRows = [row1, row2, row3];
    return allRows.some(_setWinner);
  };

  const _checkColumns = () => {
    col1 = [gameBoard[0], gameBoard[3], gameBoard[6]];
    col2 = [gameBoard[1], gameBoard[4], gameBoard[7]];
    col3 = [gameBoard[2], gameBoard[5], gameBoard[8]];
    allCols = [col1, col2, col3];
    return allCols.some(_setWinner);
  };

  const _checkDiagonal = () => {
    diag1 = [gameBoard[0], gameBoard[4], gameBoard[8]];
    diag2 = [gameBoard[2], gameBoard[4], gameBoard[6]];
    allDiags = [diag1, diag2];
    allDiags.some(_setWinner);
  };

  const _checkWinner = () => {
    _checkIfDraw();
    _checkColumns();
    _checkRows();
    _checkDiagonal();
    winner != undefined && _announceWinner();
  };

  return {
    activePlayer,
    renderGameBoard,
    setActivePlayer,
  };
})();

Game.renderGameBoard();
