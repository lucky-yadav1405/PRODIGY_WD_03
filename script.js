const cells = document.querySelectorAll('[data-cell]');
const restartButton = document.getElementById('restartButton');
const message = document.getElementById('message');
let currentPlayer = 'X';

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

function handleClick(e) {
    const cell = e.target;
    if (cell.textContent === '') {
        cell.textContent = currentPlayer;
        if (checkWin(currentPlayer)) {
            message.textContent = `${currentPlayer} Wins!`;
            endGame();
        } else if (isDraw()) {
            message.textContent = "It's a Draw!";
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin(player) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].textContent === player;
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.textContent !== '';
    });
}

function endGame() {
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

function startGame() {
    currentPlayer = 'X';
    cells.forEach(cell => {
        cell.textContent = '';
        cell.addEventListener('click', handleClick, { once: true });
    });
    message.textContent = '';
}

restartButton.addEventListener('click', startGame);

startGame();
