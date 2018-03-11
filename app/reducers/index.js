import {combineReducers} from 'redux';

import grid from './grid';
import game from './game';

const minesweeper = combineReducers({
    grid,
    game
});

export default minesweeper;