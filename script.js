function createGameboard() {
    let availablePlaces = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let x = [];
    let o = [];
    let currentPlayer = 'X';
    const statusDiv = document.getElementById('status');

    const winningCombos = [
        [1,2,3], [4,5,6], [7,8,9],
        [1,4,7], [2,5,8], [3,6,9],
        [1,5,9], [3,5,7]
    ];

    function evaluate(positions) {
        return winningCombos.some(combo =>
            combo.every(pos => positions.includes(pos))
        );
    }

    function play(position) {
        if (!availablePlaces.includes(position)) return;

        availablePlaces = availablePlaces.filter(p => p !== position);

        const cell = document.getElementById(`cell-${position}`);
        cell.textContent = currentPlayer;
        cell.disabled = true;

        const playerArray = currentPlayer === 'X' ? x : o;
        playerArray.push(position);

        if (evaluate(playerArray)) {
            statusDiv.textContent = `${currentPlayer} wins!`;
            disableAllCells();
            return;
        }

        if (availablePlaces.length === 0) {
            statusDiv.textContent = `It's a draw!`;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDiv.textContent = `${currentPlayer}'s turn`;
    }

    function disableAllCells() {
        for (let i = 1; i <= 9; i++) {
            const cell = document.getElementById(`cell-${i}`);
            cell.disabled = true;
        }
    }

    function resetBoard() {
        availablePlaces = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        x = [];
        o = [];
        currentPlayer = 'X';
        statusDiv.textContent = `X's turn`;

        for (let i = 1; i <= 9; i++) {
            const cell = document.getElementById(`cell-${i}`);
            cell.textContent = '';
            cell.disabled = false;
        }
    }

    return {
        play,
        resetBoard
    };
}

const game = createGameboard();

function cellClick(position) {
    game.play(position);
}

function restartGame() {
    game.resetBoard();
}
