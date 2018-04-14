import React from 'react';
import {connect} from 'react-redux';

import {incrementTime} from '../actions';
import {getFormattedTime} from '../utils/time';


class Timer extends React.Component {
    constructor(props) {
        super(props);
    }

    renderTime() {
        let {gameStarted, seconds} = this.props.gameState;
        if(!gameStarted) {
            return '00:00';
        } else {
            return getFormattedTime(seconds);
        }
    }

    startTimer() {
        this.interval = setInterval(this.increment.bind(this), 1000);
    }

    increment() {
        let {seconds} = this.props.gameState;
        let {incrementTime} = this.props;
        let newTime = seconds + 1;
        incrementTime(newTime);
    }

    stopTimer() {
        clearInterval(this.interval);
        this.interval = null;
    }

    render() {
        let {isGameOver, isGameWon, gameStarted} = this.props.gameState;
        if(isGameOver || isGameWon) {
            // need to stop the timer
            this.stopTimer();
        } else if(!this.interval && gameStarted) {
            this.startTimer();
        }
        return (
            <p className="timer">
                {this.renderTime()}
            </p>
        );
    }
}

const mapStateToProps = state => {
    return {
        gameState: state.grid.gameState
    }
};

const mapDispatchToProps = dispatch => {
    return {
        incrementTime: (seconds) => {
            dispatch(incrementTime(seconds));
        }
    }
};

const TimerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Timer);

export default TimerContainer;