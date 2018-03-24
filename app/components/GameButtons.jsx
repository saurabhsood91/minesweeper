import React from 'react';
import {connect} from 'react-redux';

import {restartGame} from '../actions';

class GameButtons extends React.Component {
    constructor(props) {
        super(props);
        this.handleRestart = this.handleRestart.bind(this);
    }

    handleRestart() {
        console.log('Woot! Restart');
        let {restartGame} = this.props;
        restartGame();
    }

    renderRestartGameButton() {
        return (
            <button onClick={this.handleRestart}>
                Restart Game
            </button>
        );
    }

    render() {
        return (
            <div>
                {this.renderRestartGameButton()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        gameState: state.gameState
    };
};

const mapDispatchToProps = dispatch => {
    return {
        restartGame: () => {
            dispatch(restartGame());
        }
    }
};

const GameButtonsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameButtons);

export default GameButtonsContainer;
