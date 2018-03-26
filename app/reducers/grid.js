import constants from '../constants';

const getGridValue = (grid, i, j) => {
    if(i < 0 || j < 0) {
        return 0;
    }
    if(i >= grid.length || j >= grid[i].length) {
        return 0;
    }
    if(grid[i][j].hasMine) {
        // It is a mine
        return 1;
    }
    return 0;
};


const seedNonMines = (numRows, numCols, numMines) => {
    let tileCount = 0;
    let max = (numCols * numRows) - 1;
    let tilesToGenerate = Math.max(((numRows * numCols) - numMines), 0);
    let nonMineNumbers = [];

    while(tileCount !== tilesToGenerate) {
        let seedNumber = Math.floor(Math.random() * Math.floor(max));
        if(nonMineNumbers.indexOf(seedNumber) !== -1) {
            continue;
        } else {
            nonMineNumbers.push(seedNumber);
            tileCount += 1;
        }
    }

    // Now that we have non mine numbers
    // Find the mine numbers
    let mineNumbers = [];
    for(let i = 0; i <= max; i++) {
        if(nonMineNumbers.indexOf(i) === -1) {
            mineNumbers.push(i);
        }
    }
    return mineNumbers;
};


const seedGrid = (numRows, numCols, numMines) => {
    let mineCount = 0;
    let mineNumbers = [];

    let max = (numCols * numRows) - 1;
    if(numMines > max / 2) {
        return seedNonMines(numRows, numCols, numMines);
    }
    while(mineCount !== numMines) {
        let seedNumber = Math.floor(Math.random() * Math.floor(max));
        if(mineNumbers.indexOf(seedNumber) !== -1) {
            continue;
        } else {
            mineNumbers.push(seedNumber);
            mineCount += 1;
        }
    }
    return mineNumbers;
};

const createGrid = (numRows = constants.GRID_ROWS, numCols = constants.GRID_COLS, numMines = constants.MAX_MINES) => {
    let grid = [];
    let mineNumbers = seedGrid(numRows, numCols, numMines);
    for(let i = 0; i < numRows; i++) {
        let row = [];
        for(let j = 0; j < numCols; j++) {
            let currentIndex = (i * numCols) + j;
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
                isQuestionMarked: false,
                isRevealed: false
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
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            if(grid[i][j] === -2) {
                // it is a mine. do not compute
                continue;
            }
            let count = getGridValue(grid, i-1, j-1) + getGridValue(grid, i-1, j) + getGridValue(grid, i-1, j+1) + getGridValue(grid, i, j-1) + getGridValue(grid, i, j+1) + getGridValue(grid, i+1, j-1) + getGridValue(grid, i+1, j) + getGridValue(grid, i+1, j+1);
            grid[i][j].minesNearMe = count;
        }
    }
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
        squares.push(square);
        let squareX = square[0];
        let squareY = square[1];
        let gridElement = grid[square[0]][square[1]];
        if(gridElement.minesNearMe === 0 && !gridElement.hasMine) {
            // get adjacent squares and add them to the queue
            let adjacent = getAdjacentSquares(grid, squareX, squareY, queue, squares);
            adjacent.forEach((element) => {
                if(queue.indexOf(element) === -1 && squares.indexOf(element) === -1) {
                    queue.push(element)
                }
            });
        }
    }
    return squares;
};

const willSquareWillBeRevealed = (squaresToBeRevealed, row, column) => {
    for(let i = 0; i < squaresToBeRevealed.length; i++) {
        if(squaresToBeRevealed[i][0] === row && squaresToBeRevealed[i][1] ===column) {
            return true;
        }
    }
    return false;
};

const revealSquares = (grid, x, y) => {
    let squaresToReveal = getSquaresToReveal(grid, x, y);
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            if(willSquareWillBeRevealed(squaresToReveal, i, j)) {
                grid[i][j].isRevealed = true;
            }
        }
    }
    return grid;
};

const revealAllMines = (grid) => {
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            if(grid[i][j].hasMine) {
                grid[i][j].isRevealed = true;
            }
        }
    }
    return grid;
};

const flagSquare = (grid, i, j) => {
    grid[i][j].isFlagged = true;
    grid[i][j].isQuestionMarked = false;
    return grid;
};

const getMinesCorrectlyFlagged = (grid) => {
    let correctlyFlagged = 0;
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            let square = grid[i][j];
            if(square.isFlagged && square.hasMine) {
                correctlyFlagged += 1;
            }
        }
    }
    return correctlyFlagged;
};

const questionMarkSquare = (grid, i, j) => {
    grid[i][j].isQuestionMarked = true;
    grid[i][j].isFlagged = false;
    return grid;
};

const unFlagSquare = (grid, i, j) => {
    grid[i][j].isFlagged = false;
    grid[i][j].isQuestionMarked = false;
    return grid;
};

const isGameWon = (grid) => {
    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[i].length; j++) {
            let square = grid[i][j];
            if(!square.hasMine && !square.isRevealed) {
                return false;
            }
        }
    }
    return true;
};

const grid = (state = {}, action) => {
    switch (action.type) {
        case 'START_GAME':
            return {
                grid: createGrid(),
                gameState: {
                    seconds: 0,
                    minesCorrectlyFlagged: 0,
                    isGameOver: false,
                    gameStarted: false,
                    isGameWon: false,
                    totalMines: constants.MAX_MINES,
                    rows: constants.GRID_ROWS,
                    cols: constants.GRID_COLS
                }
            };
        case 'REVEAL_SQUARES':
            let gridAfterRevealing = revealSquares(state.grid, action.row, action.column);
            let {gameStarted, seconds} = state.gameState;
            let timeInSeconds = !gameStarted ? 0:seconds;
            let gameStateAfterReveal = {
                ...state.gameState,
                seconds: timeInSeconds,
                isGameWon: isGameWon(gridAfterRevealing),
                gameStarted: true
            };
            return {
                grid: gridAfterRevealing,
                gameState: gameStateAfterReveal
            };
        case 'GAME_OVER':
            let grid = revealAllMines(state.grid);
            return {
                grid,
                gameState: {
                    ...state.gameState,
                    minesCorrectlyFlagged: getMinesCorrectlyFlagged(grid),
                    isGameOver: true,
                    gameStarted: true,
                    isGameWon: false
                }
            };
        case 'FLAG_SQUARE':
            let flaggedGrid = flagSquare(state.grid, action.row, action.column);
            let correctlyFlaggedMines = getMinesCorrectlyFlagged(state.grid);
            let gameState = {
                ...state.gameState,
                minesCorrectlyFlagged: correctlyFlaggedMines
            };
            return {
                gameState,
                grid: flaggedGrid
            };
        case 'QUESTIONMARK_SQUARE':
            let newGrid = questionMarkSquare(state.grid, action.row, action. column);
            let newGameState = {
                ...state.gameState,
                minesCorrectlyFlagged: getMinesCorrectlyFlagged(newGrid)
            };
            return {
                grid: newGrid,
                gameState: newGameState
            };
        case 'UNFLAG_SQUARE':
            return {
                ...state,
                grid: unFlagSquare(state.grid, action.row, action.column)
            };
        case 'INCREMENT_TIME':
            return {
                ...state,
                gameState: {
                    ...state.gameState,
                    seconds: action.seconds
                }
            };
        case 'RESTART_GAME':
            let {rows, cols, mines} = state.gameState;
            return {
                grid: createGrid(rows, cols, mines),
                gameState: {
                    ...state.gameState,
                    seconds: 0,
                    minesCorrectlyFlagged: 0,
                    isGameOver: false,
                    gameStarted: false,
                    isGameWon: false,
                }
            };
        case 'REINITIALIZE_GRID':
            return {
                grid: createGrid(action.rows, action.cols, action.mines),
                gameState: {
                    seconds: 0,
                    minesCorrectlyFlagged: 0,
                    isGameOver: false,
                    gameStarted: false,
                    isGameWon: false,
                    totalMines: action.mines,
                    rows: action.rows,
                    cols: action.cols
                }
            };
        default:
            return {
                gameState: {},
                grid: []
            }
    }
    return state;
}

export default grid;