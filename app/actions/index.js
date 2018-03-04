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