import {combineReducers} from 'redux';

import grid from './grid';

const minesweeper = combineReducers({
    grid
});

export default minesweeper;