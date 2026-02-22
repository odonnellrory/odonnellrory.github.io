const playerText = document.getElementById('playerText');
const restartButton = document.getElementById('restartButton');
const boxes = Array.from(document.getElementsByClassName('box'));
const xScoreText = document.getElementById('xScore');
const oScoreText = document.getElementById('oScore');

const O_TEXT = 'O';
const X_TEXT = 'X';

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const state = {
  xScore: 0,
  oScore: 0,
  currentPlayer: X_TEXT,
  gameActive: true,
  spaces: Array(9).fill(null),
};

function getWinningCombo() {
  for (const [a, b, c] of winningCombos) {
    if (state.spaces[a] && state.spaces[a] === state.spaces[b] && state.spaces[a] === state.spaces[c]) {
      return [a, b, c];
    }
  }
  return null;
}

function isDraw() {
  return state.spaces.every((space) => space !== null);
}

function updateScoreDisplay() {
  xScoreText.textContent = String(state.xScore);
  oScoreText.textContent = String(state.oScore);
}

function updateScore(winner) {
  if (winner === X_TEXT) {
    state.xScore += 1;
  } else if (winner === O_TEXT) {
    state.oScore += 1;
  }
  updateScoreDisplay();
}

function togglePlayer() {
  state.currentPlayer = state.currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
}

function onBoxClick(event) {
  if (!state.gameActive) {
    return;
  }

  const id = Number(event.currentTarget.id);
  if (Number.isNaN(id) || state.spaces[id]) {
    return;
  }

  state.spaces[id] = state.currentPlayer;
  event.currentTarget.textContent = state.currentPlayer;

  const winningCombo = getWinningCombo();
  if (winningCombo) {
    state.gameActive = false;
    playerText.textContent = `${state.currentPlayer} has won!`;
    winningCombo.forEach((boxIndex) => boxes[boxIndex].classList.add('winner'));
    updateScore(state.currentPlayer);
    return;
  }

  if (isDraw()) {
    state.gameActive = false;
    playerText.textContent = "It's a draw!";
    return;
  }

  togglePlayer();
}

function restartGame() {
  state.spaces.fill(null);
  state.currentPlayer = X_TEXT;
  state.gameActive = true;
  playerText.textContent = 'Tic Tac Toe';

  boxes.forEach((box) => {
    box.textContent = '';
    box.classList.remove('winner');
  });
}

function startGame() {
  boxes.forEach((box) => {
    box.addEventListener('click', onBoxClick);
  });
  restartButton.addEventListener('click', restartGame);
  updateScoreDisplay();
}

startGame();
