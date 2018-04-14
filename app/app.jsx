
// Use ES6 destructuring to import stuff needed for React Routing
// var Route = require('react-router').Route // Otherwise

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {getTopScores} from './actions';

import GameContainer from 'app/components/Game';

import minesweeper from './reducers';

require('style!css!sass!applicationStyles');

let store = createStore(
    minesweeper,
    applyMiddleware(thunk)
);

store.dispatch(getTopScores());

ReactDOM.render(
    <Provider store={store}>
            <GameContainer />
    </Provider>,
    document.getElementById('app')
);
