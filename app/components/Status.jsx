import React from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import TimerContainer from './Timer';


class Status extends React.Component {
    renderStatus() {
        let {isGameOver, isGameWon} = this.props.gameState;
        if(isGameOver) {
            return <p className="lost">YOU LOST!!!</p>;
        } else if(isGameWon) {
            return <p className="won">YOU WON!!!</p>;
        }
        return null;
    }

    renderTimer() {
        return (
            <TimerContainer />
        );
    }

    renderNumberOfMines() {
        let {totalMines} = this.props.gameState;
        return (
            <p className="mine-text">
                Total Mines: {totalMines}
            </p>
        );
    }

    render() {
        return (
            <Row className="status">
                {this.renderStatus()}
                {this.renderTimer()}
                {this.renderNumberOfMines()}
            </Row>
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

const StatusContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Status);

export default StatusContainer;