const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const PLAYER_X = 'X';
const PLAYER_O = 'O';
let currentPlayer = PLAYER_X;
let boardState = ['', '', '', '', '', '', '', '', ''];

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.dataset.index;

    if (boardState[index] !== '') {
        return;
    }

    boardState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin(currentPlayer)) {
        setTimeout(() => alert(`${currentPlayer} wins!`), 100);
        return;
    }

    if (boardState.every(cell => cell !== '')) {
        setTimeout(() => alert('It\'s a draw!'), 100);
        return;
    }

    currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;

    if (currentPlayer === PLAYER_O) {
        makeAIMove();
    }
}

function makeAIMove() {
    const emptyCells = boardState
        .map((cell, index) => (cell === '' ? index : null))
        .filter(index => index !== null);
    const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    boardState[randomIndex] = PLAYER_O;
    cells[randomIndex].textContent = PLAYER_O;

    if (checkWin(PLAYER_O)) {
        setTimeout(() => alert(`${PLAYER_O} wins!`), 100);
        return;
    }

    if (boardState.every(cell => cell !== '')) {
        setTimeout(() => alert('It\'s a draw!'), 100);
        return;
    }

    currentPlayer = PLAYER_X;
}

function checkWin(player) {
    return winningCombinations.some(combination =>
        combination.every(index => boardState[index] === player)
    );
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = PLAYER_X;
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
