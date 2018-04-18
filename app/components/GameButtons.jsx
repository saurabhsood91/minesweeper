import React from 'react';
import {connect} from 'react-redux';

import {restartGame} from '../actions';

class GameButtons extends React.Component {
    constructor(props) {
        super(props);
        this.handleRestart = this.handleRestart.bind(this);
    }

    handleRestart() {
        let {restartGame} = this.props;
        restartGame(this.playerName.value);
    }

    renderNameControl() {
        return (
            <input placeholder="Enter Name:" type="text" ref={(playerName) => this.playerName = playerName} />
        );
    }

    renderRestartGameButton() {
        return (
            <button className="btn btn-primary" onClick={this.handleRestart}>
                Start Game
            </button>
        );
    }

    render() {
        return (
            <div>
                {this.renderNameControl()}
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
        restartGame: (playerName) => {
            dispatch(restartGame(playerName));
        }
    }
};

const GameButtonsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GameButtons);

export default GameButtonsContainer;
