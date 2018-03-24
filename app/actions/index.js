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

export const unflagSquare = (i, j) => {
    return {
        type: 'UNFLAG_SQUARE',
        row: i,
        column: j
    }
};

export const questionMarkSquare = (i, j) => {
    return {
        type: 'QUESTIONMARK_SQUARE',
        row: i,
        column: j
    }
};

export const incrementTime = (seconds) => {
    return {
        type: 'INCREMENT_TIME',
        seconds: seconds
    }
};

export const restartGame = () => {
    return {
        type: 'RESTART_GAME'
    }
};

export const reinitializeGrid = (rows, cols, mines) => {
    return {
        type: 'REINITIALIZE_GRID',
        rows: rows,
        cols: cols,
        mines: mines
    }
};