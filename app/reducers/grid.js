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
            let count = getGridValue(grid, i-1, j-1) + getGridValue(grid, i-1, j) + getGridValue(grid, i-1, j+1) + getGridValue(grid, i, j-1) + getGridValue(grid, i, j+1) + getGridValue(grid, i+1, j-1) + getGridValue(grid, i+1, j) + getGridValue(grid, i+1, j+1);
            grid[i][j] = count;
        }
    }
    console.log('NEW GRID', grid);
    return grid;
};

const grid = (state = {}, action) => {
    switch (action.type) {
        case 'GRID_CREATED':
            return updateCounts(action.grid);
    }
    return state;
}

export default grid;