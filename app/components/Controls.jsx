import React from 'react';
import {connect} from 'react-redux';

import TimerContainer from './Timer';
import GameButtonsContainer from './GameButtons';
import GridControlsContainer from './GridControls'

class Controls extends React.Component {
    renderStatus() {
        let {isGameOver, isGameWon} = this.props.gameState;
        if(isGameOver) {
            return <p>STATUS: YOU LOST!!!</p>;
        } else if(isGameWon) {
            return <p>STATUS: YOU WON!!!</p>;
        }
        return null;
    }

    renderTimer() {
        return (
            <TimerContainer startTimer={true} />
        );
    }

    renderNumberOfMines() {
        let {totalMines} = this.props.gameState;
        return (
            <p>
                Total Mines: {totalMines}
            </p>
        );
    }

    renderGameButtons() {
        return (
            <GameButtonsContainer />
        );
    }

    renderGridControls() {
        return (
            <GridControlsContainer />
        );
    }

    render() {
        return (
          <div>
              {this.renderStatus()}
              {this.renderTimer()}
              {this.renderNumberOfMines()}
              {this.renderGameButtons()}
              {this.renderGridControls()}
          </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {}
};

const mapStateToProps = state => {
    return {
        gameState: state.grid.gameState
    };
};

const ControlsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Controls);

export default ControlsContainer;