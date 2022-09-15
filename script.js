const Player = (name, symbol) => {
  const playerName = name;
  const playerSymbol = symbol;

  return {
    playerName,
    playerSymbol,
  };
};

const Game = (() => {
  const board = document.getElementById("board");
  const app = document.getElementById("app");

  const inputBox = document.createElement("div");
  inputBox.classList.add("input-box");
  const inputOne = document.createElement("input");
  const inputTwo = document.createElement("input");
  inputOne.type = "text";
  inputOne.placeholder = "Player one name";
  inputTwo.type = "text";
  inputTwo.placeholder = "Player two name";

  const player1 = Player("p1", "x");
  const player2 = Player("p2", "o");
  inputBox.append(inputOne, inputTwo);
  app.append(inputBox);

  const heading = document.createElement("h1");
  heading.setAttribute("id", "announcement");
  heading.textContent = "No winner yet";
  app.append(heading);

  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  let activePlayer = player1;
  let winner = "";
  let gameOn = false;

  const renderGameBoard = () => {
    let count = 0;
    player1.playerName = inputOne.value;
    player2.playerName = inputTwo.value;
    inputBox.style.display = "none";
    if (gameOn != true) {
      gameBoard.map((cell) => {
        const square = document.createElement("div");
        square.setAttribute("index", count);
        square.classList.add("cell");
        square.addEventListener("click", takeTurn);
        square.append(cell);
        board.append(square);
        count++;
      });
    } else {
      alert("Game already runnning");
    }
    gameOn = true;
  };

  const getPlayerNames = () => {};

  const renderResetButton = () => {
    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset Game";
    resetButton.disabled = true;
    resetButton.setAttribute("id", "reset");
    resetButton.addEventListener("click", resetGame);
    app.append(resetButton);
  };

  const resetGame = () => {
    activePlayer = player1;
    heading.textContent = `Previous winner: ${winner}`;
    winner = "";
    const removeCells = document.querySelectorAll(".cell");
    removeCells.forEach((i) => i.remove());
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameOn = false;
    renderGameBoard();
    document.getElementById("reset").disabled = true;
  };

  const renderStartButton = () => {
    const startButton = document.createElement("button");
    startButton.textContent = "Start Game";
    startButton.setAttribute("id", "start");
    startButton.addEventListener("click", renderGameBoard);
    app.append(startButton);
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
      _stopGame();
      winner = activePlayer.playerName;
    } else if (threeInARow.every((i) => i == "o")) {
      _stopGame();
      winner = activePlayer.playerName;
    }
  };

  const _announceWinner = () => {
    _stopGame();
    heading.textContent = `${winner} bitch`;
    document.getElementById("reset").disabled = false;
  };

  const _checkIfDraw = () => {
    return gameBoard.every((i) => i != "");
  };

  const _announceDraw = () => {
    _stopGame();
    document.getElementById("reset").disabled = false;
    heading.textContent = "No winner bitch. Reset to play again";
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
    _checkIfDraw() && _announceDraw();
    _checkColumns();
    _checkRows();
    _checkDiagonal();
    winner !== "" && _announceWinner();
  };

  const _stopGame = () => {
    console.log("Game is stopped, dont press anything");
    // board.innerHTML = "";
    const disabledCells = document.querySelectorAll(".cell");
    disabledCells.forEach((i) => {
      i.removeEventListener("click", takeTurn);
    });
  };

  return {
    activePlayer,
    setActivePlayer,
    renderResetButton,
    renderStartButton,
  };
})();

Game.renderResetButton();
Game.renderStartButton();
