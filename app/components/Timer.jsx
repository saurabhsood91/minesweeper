import React from 'react';
import {connect} from 'react-redux';

import {incrementTime} from '../actions';


class Timer extends React.Component {
    constructor(props) {
        super(props);
    }
    renderFormattedTime() {
        let {seconds} = this.props.gameState;

        let timeInSeconds = seconds % 60;
        let minutes = Math.floor(seconds / 60);

        if(timeInSeconds < 10) {
            timeInSeconds = '0' + timeInSeconds;
        }

        if(minutes < 10) {
            minutes = '0' + minutes;
        }

        return `${minutes}:${timeInSeconds}`;
    }

    renderTime() {
        let {gameStarted} = this.props.gameState;
        if(!gameStarted) {
            return '00:00';
        } else {
            return this.renderFormattedTime();
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
            <div>
                {this.renderTime()}
            </div>
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