import {combineReducers} from 'redux';

import grid from './grid';
import scores from './scores';

const minesweeper = combineReducers({
    grid,
    scores
});

export default minesweeper;