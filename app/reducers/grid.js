import constants from '../constants';

const getGridValue = (grid, i, j) => {
    if(i < 0 || j < 0) {
        return 0;
    }
    if(i >= constants.GRID_ROWS || j >= constants.GRID_COLS) {
        return 0;
    }
    if(grid[i][j] === -2) {
        // It is a mine
        return 1;
    }
    return 0;
};

const updateCounts = (grid) => {
    if(!grid) {
        return;
    }
    for(let i = 0; i < constants.GRID_ROWS; i++) {
        for(let j = 0; j < constants.GRID_COLS; j++) {
            if(grid[i][j] === -2) {
                // it is a mine. do not compute
                continue;
            }
            let count = getGridValue(grid, i-1, j-1) + getGridValue(grid, i-1, j) + getGridValue(grid, i-1, j+1) + getGridValue(grid, i, j-1) + getGridValue(grid, i, j+1) + getGridValue(grid, i+1, j-1) + getGridValue(grid, i+1, j) + getGridValue(grid, i+1, j+1);
            grid[i][j] = count;
        }
    }
    console.log('NEW GRID', grid);
    return grid;
};

const getAdjacentSquares = (grid, i, j, queue, seen) => {
    let adjacentSquares = [];
    if(typeof grid[i-1] !== 'undefined' && typeof grid[i-1][j-1] !== 'undefined' && grid[i-1][j-1] !== null) {
        if(queue.indexOf([i-1, j-1]) === -1 && seen.indexOf([i-1, j-1]) === -1) {
            adjacentSquares.push([i-1, j-1]);
        }
    }
    if(typeof grid[i-1] !== 'undefined' && typeof grid[i-1, j] !== 'undefined' && grid[i-1][j] !== null) {
        if(queue.indexOf([i-1, j]) === -1 && seen.indexOf([i-1, j]) === -1) {
            adjacentSquares.push([i - 1, j]);
        }
    }
    if(typeof grid[i-1] !== 'undefined' && typeof grid[i-1][j+1] !== 'undefined' && grid[i][j] !== null) {
        if(queue.indexOf([i-1, j+1]) === -1 && seen.indexOf([i-1, j+1]) === -1) {
            adjacentSquares.push([i-1, j+1]);
        }
    }
    if(typeof grid[i] !== 'undefined' && typeof grid[i][j-1] !== 'undefined' && grid[i][j-1] !== null) {
        if(queue.indexOf([i, j-1]) === -1 && seen.indexOf([i, j-1]) === -1) {
            adjacentSquares.push([i, j-1]);
        }
    }
    if(typeof grid[i] !== 'undefined' && typeof grid[i][j+1] !== 'undefined' && grid[i][j+1] !== null) {
        if(queue.indexOf(i, j+1) === -1 && seen.indexOf(i, j+1) === -1) {
            adjacentSquares.push([i, j+1]);
        }
    }
    if(typeof grid[i+1] !== 'undefined' && typeof grid[i+1][j-1] !== 'undefined' && grid[i+1][j-1]) {
        if(queue.indexOf(i+1, j-1) === -1 && seen.indexOf(i+1, j-1) === -1) {
            adjacentSquares.push([i+1, j-1]);
        }
    }
    if(typeof grid[i+1] !== 'undefined' && typeof grid[i+1][j] !== 'undefined' && grid[i+1][j] !== null) {
        if(queue.indexOf(i+1, j) === -1 && seen.indexOf(i+1, j) === -1) {
            adjacentSquares.push([i+1, j]);
        }
    }
    if(typeof grid[i+1] !== 'undefined' && typeof grid[i+1][j+1] !== 'undefined' && grid[i+1][j+1] !== null) {
        if(queue.indexOf(i+1, j+1) === -1 && queue.indexOf(i+1, j+1) === -1) {
            adjacentSquares.push([i+1, j+1]);
        }
    }
    return adjacentSquares;
};

const getSquaresToReveal = (grid, x, y) => {
    let queue = [];
    let squares = [];

    queue.push([x, y]);

    queue.indexOf = (square) => {
        for(let i = 0; i < queue.length; i++) {
            if(queue[i][0] === square[0] && queue[i][1] === square[1]) {
                return 0;
            }
        }
        return -1;
    };

    squares.indexOf = (square) => {
        for(let i = 0; i < squares.length; i++) {
            if(squares[i][0] === square[0] && squares[i][1] === square[1]) {
                return 0;
            }
        }
        return -1;
    };

    while(queue.length > 0) {
        // pop a square from a queue
        let square = queue.shift();
        // console.log('SQUARE', square);
        squares.push(square);
        let squareX = square[0];
        let squareY = square[1];
        if(grid[square[0]][square[1]] === 0) {
            // get adjacent squares and add them to the queue
            queue.push(...getAdjacentSquares(grid, squareX, squareY, queue, squares));
        }
    }
    return squares;
};

const grid = (state = {}, action) => {
    switch (action.type) {
        case 'GRID_CREATED':
            return updateCounts(action.grid);
        case 'REVEAL_SQUARES':
            return getSquaresToReveal(state.grid, action.row, action.column);
    }
    return state;
}

export default grid;