const Player = (name, symbol) => {
  const playerName = name;
  const playerSymbol = symbol;

  // const move = () => {
  //   console.log(Game.activePlayer);
  //   Game.setActivePlayer();
  // };

  return {
    playerName,
    playerSymbol,
    // move,
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
      console.log(gameBoard);
      // Tuo paciu turiu idet simboliuka i gameBoard array
      setActivePlayer();
    } else if (e.target.innerHTML != "") {
      alert("Choose a different tile");
    }
    console.log(e.target);
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

  return {
    activePlayer,
    renderGameBoard,
    setActivePlayer,
  };

  // const playerMove = (activePlayer, event) => {
  //   console.log(activePlayer);
  //   console.log(event);
  //   console.log(
  //     `${activePlayer.playerName} is making a move. ${activePlayer.name} symbol is ${activePlayer.playerSymbol}`
  //   );
  //   console.log(activePlayer.target);
  //   // setActivePlayer();
  // };
})();

Game.renderGameBoard();
