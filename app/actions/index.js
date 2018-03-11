export const gridCreated = grid => {
    return {
        type: 'GRID_CREATED',
        grid
    };
};

export const revealSquares = (i, j) => {
    return {
        type: 'REVEAL_SQUARES',
        row: i,
        column: j
    }
};

export const startGame = () => {
    return {
        type: 'START_GAME'
    }
};

export const gameOver = () => {
    return {
        type: 'GAME_OVER'
    }
};

export const flagSquare = (i, j) => {
    return {
        type: 'FLAG_SQUARE',
        row: i,
        column: j
    }
};