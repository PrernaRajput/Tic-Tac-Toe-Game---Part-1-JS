// write your function

let board = [];
let playerNextX = true;
let winner = null;
let gameOver = false;

const restartGame = () => {
  board = Array.from({ length: 3 }, () => Array(3).fill(''));
  playerNextX = true;
  winner = null;
  gameOver = false;
    const playerTurn = document.getElementById('playerTurn');
    playerTurn.textContent = 'X';
    setBoard();
}

const checkWinner = () => {
  const lines = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]]
  ];

  for (const line of lines) {
    const values = line.map(([r, c]) => board[r][c]);
    const unique = new Set(values);
    if (unique.size === 1 && !unique.has('')) {
      return { winner: values[0], line };
    }
  }

  return null;
};

const isNextPlayerX = () => {
    if (playerNextX === true) {
        playerNextX = false;
        return 'X';
    } else {
        playerNextX = true;
        return 'O';
    }
}

const playerMove = (rowIndex, colIndex) => {
  if (!gameOver && board[rowIndex][colIndex]==="") {
    const turn = isNextPlayerX();
    board[rowIndex][colIndex] = turn;
    setBoard();
    const playerTurn = document.getElementById('playerTurn');
    playerTurn.textContent = playerNextX ? 'X' : 'O';
    const result = checkWinner();
    const resultDisplay = document.getElementById('result');

    if (result.winner) {
      winner = result.winner;
      const line = result.line;
      gameOver = true;
      resultDisplay.textContent = `Player ${winner} Won!`
      highlightWin(line)
    } else if (board.flat().every(c => c !== '')) {
        gameOver = true;
        resultDisplay.textContent = "It's a draw!";
      }
    
  }

}

    const highlightWin = (line) => {
      const cells = document.querySelectorAll('.cell');
      line.forEach(([r,c]) => {
        const idx = r*3 + c;
        cells[idx].classList.add('win');
      });
    };

const setBoard = () =>{
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = `
  ${board
    .map((row, rowIndex) => {
      return row
        .map((col, colIndex) => {
          return `<div class="cell" id='${row}_${col}' onclick='playerMove(${rowIndex}, ${colIndex})'>${board[rowIndex][colIndex]}</div>`;
        })
        .join("");
    })
    .join("")}
`;
}

restartGame();