function createGameboard() {
    const availablePlaces = [1,2,3,4,5,6,7,8,9];
    const x = [];
    const o = [];

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

    function renderBoard() {
        let board = '';
        for (let i = 1; i <= 9; i++) {
            let mark = ' ';
            if (x.includes(i)) {
                mark = 'X';
            } else if (o.includes(i)) {
                mark = 'O';
            } else {
                mark = i.toString();
            }

            board += ` ${mark} `;
            if (i % 3 === 0) {
                board += '\n';
                if (i !== 9) board += '---+---+---\n';
            } else {
                board += '|';
            }
        }
        console.log(board);
    }

    function play(player, position) {
        if (!availablePlaces.includes(position)) return;
        availablePlaces.splice(availablePlaces.indexOf(position), 1);

        const playerArray = player === 'X' ? x : o;
        playerArray.push(position);

        renderBoard();

        if (evaluate(playerArray)) {
            console.log(`${player} wins!`);
        }
    }

    return {
        renderBoard,
        playX: pos => play('X', pos),
        playO: pos => play('O', pos),
    };
}
