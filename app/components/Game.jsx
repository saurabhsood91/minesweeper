import React from 'react';
import {connect} from 'react-redux';

import {startGame} from '../actions';

import GridContainer from './Grid';

class Game extends React.Component {
    constructor(props) {
        super(props);
        let {startGame} = this.props;
        startGame();
    }
    render() {
        let {isGameOver} = this.props.gameState;
        console.log('GAME OVER', isGameOver);
        return (
            <div>
                <GridContainer />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startGame: () => {
            dispatch(startGame())
        }
    }
};
const mapStateToProps = (state) => {
    return {
        gameState: state.grid.gameState
    };
};

const GameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);


export default GameContainer;