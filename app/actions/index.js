import axios from 'axios';
import { BASE_URL } from '../utils/env';

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

export const restartGame = (playerName) => {
    return {
        type: 'RESTART_GAME',
        playerName
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

export const burstReveal = (i, j) => {
    return {
        type: 'BURST_REVEAL',
        row: i,
        col: j
    }
};

export const loadScoresSuccess = (scores) => {
    return {
        type: 'LOAD_SCORES_SUCCESS',
        scores
    };
};

export const getTopScores = () => {
    return (dispatch) => {
        let url = BASE_URL + '/api/get/topten';
        return fetch(url).then(
            (response) => {
                return response.json();
            }
        )
            .then((data) => {
                dispatch(loadScoresSuccess(data.scores));
            });
    };
};

export const submitScore = (rows, cols, mines, name, seconds) => {
    return (dispatch) => {
        let url = BASE_URL + '/api/add/score';
        return axios.post(url, {
            rows,
            cols,
            mines,
            name,
            seconds
        }).then((response) => {
        }).then((error) => {
            console.log('ERROR', error);
        });
    }
};