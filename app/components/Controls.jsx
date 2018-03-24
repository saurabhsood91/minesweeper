import React from 'react';
import {connect} from 'react-redux';

import TimerContainer from './Timer';

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
    render() {
        return (
          <div>
              {this.renderStatus()}
              {this.renderTimer()}
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