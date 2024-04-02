const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const boardContainer = document.querySelector('.board');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = parseInt(cell.id);
        if (board[index] === '' && gameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `It's ${currentPlayer}'s turn`;
        }
    });
});

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            message.textContent = `${board[a]} wins!`;
            highlightWinningCells(combo);
            return;
        }
    }

    if (!board.includes('')) {
        gameActive = false;
        message.textContent = 'It\'s a tie!';
    }
}

function highlightWinningCells(combo) {
    combo.forEach(index => {
        cells[index].classList.add('winner');
    });
    boardContainer.classList.add('game-over');
}
