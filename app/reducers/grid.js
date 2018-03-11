import constants from '../constants';

const getGridValue = (grid, i, j) => {
    if(i < 0 || j < 0) {
        return 0;
    }
    if(i >= constants.GRID_ROWS || j >= constants.GRID_COLS) {
        return 0;
    }
    if(grid[i][j].hasMine) {
        // It is a mine
        return 1;
    }
    return 0;
};


const seedGrid = () => {
    let mineCount = 0;
    let mineNumbers = [];
    let max = (constants.GRID_COLS * constants.GRID_ROWS) - 1;
    while(mineCount != constants.MAX_MINES) {
        // console.log('MINE COUNT', mineCount);
        // get a number between 0 and 63.
        // If we already used this number, fetch another one
        let seedNumber = Math.floor(Math.random() * Math.floor(max));
        // console.log('SEED NUMBER', seedNumber);
        if(mineNumbers.indexOf(seedNumber) !== -1) {
            continue;
        } else {
            mineNumbers.push(seedNumber);
            mineCount += 1;
        }
    }
    console.log('MINE NUMBERS', mineNumbers);
    return mineNumbers;
};

const createGrid = () => {
    let grid = [];
    let mineNumbers = seedGrid();
    const numberOfRows = constants.GRID_COLS;
    const numberOfColumns = constants.GRID_COLS;
    for(let i = 0; i < numberOfRows; i++) {
        let row = [];
        for(let j = 0; j < numberOfColumns; j++) {
            let currentIndex = (i * numberOfRows) + j;
            let hasMine = false;
            if(mineNumbers.indexOf(currentIndex) !== -1) {
                hasMine = true;
            }
            row.push({
                row: i,
                column: j,
                minesNearMe: 0,
                hasMine: hasMine,
                isFlagged: false,
                isQuestionMarked: false
            });
        }
        grid.push(row);
    }
    return computeGridCounts(grid);
};

const computeGridCounts = (grid) => {
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
            grid[i][j].minesNearMe = count;
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
            let adjacent = getAdjacentSquares(grid, squareX, squareY, queue, squares);
            adjacent.forEach((element) => {
                if(queue.indexOf(element) === -1) {
                    queue.push(element)
                }
            });
        }
    }
    return squares;
};

const grid = (state = {}, action) => {
    switch (action.type) {
        case 'START_GAME':
            return {
                ...state,
                grid: createGrid()
            }
        default:
            return {
                ...state,
                grid: [],
            }
    }
    return state;
}

export default grid;