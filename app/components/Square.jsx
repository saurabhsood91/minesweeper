import React from 'react';
import {connect} from 'react-redux';
import {revealSquares, flagSquare, gameOver, unflagSquare, questionMarkSquare, burstReveal} from '../actions';

import FontAwesome from 'react-fontawesome';

class Square extends React.Component {
    constructor(props) {
        super(props);
        // Makes `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
    }

    minesNearMe() {
        let {minesNearMe} = this.props;
        return (
            <span className="mines-near-me">
                {minesNearMe}
            </span>
        );
    }

    renderSquare() {
        let {hasMine, isRevealed, isFlagged, isQuestionMarked, minesNearMe} = this.props;
        if(isRevealed) {
            if(hasMine) {
                return <FontAwesome name="bomb" />
            } else {
                return this.minesNearMe();
            }
        } else if(isFlagged) {
            return <FontAwesome name="flag" />;
        } else if(isQuestionMarked) {
            return <FontAwesome name="question" />;
        }
    }

    handleRightClick(e) {
        e.preventDefault();
        // Flag the square
        let {isFlagged, isQuestionMarked, isRevealed, flagSquare, questionMarkSquare, unflagSquare, row, column} = this.props;
        if(!isFlagged && !isQuestionMarked && !isRevealed) {
            // Flag the square
            flagSquare(row, column);
        } else if(isFlagged && !isQuestionMarked) {
            // Question Mark the square
            questionMarkSquare(row, column);
        } else {
            // leave in unrevealed state
            unflagSquare(row, column);
        }
    }

    handleClick(e) {
        let {row, column, onSquareClicked, hasMine, handleGameOver, isFlagged, isQuestionMarked, burstReveal} = this.props;
        if(isQuestionMarked) {
            burstReveal(row, column);
            onSquareClicked(row, column);
        } else if(hasMine) {
            handleGameOver();
        } else {
            if(!isFlagged) {
                onSquareClicked(row, column);
            }
        }
    }

    gameOver() {
        return (
            <div className="square align-left">
                {this.renderSquare()}
            </div>
        );
    }

    render() {
        let {isGameOver, isGameWon} = this.props.gameState;
        if(isGameOver || isGameWon) {
            return this.gameOver();
        }
        return (
            <div className="square align-left" onClick={this.handleClick} onContextMenu={this.handleRightClick}>
                {this.renderSquare()}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSquareClicked: (i, j) => {
            dispatch(revealSquares(i, j));
        },
        handleGameOver: () => {
            dispatch(gameOver());
        },
        flagSquare: (i, j) => {
            dispatch(flagSquare(i, j));
        },
        unflagSquare: (i, j) => {
            dispatch(unflagSquare(i, j));
        },
        questionMarkSquare: (i, j) => {
            dispatch(questionMarkSquare(i, j));
        },
        burstReveal: (i, j) => {
            dispatch(burstReveal(i, j));
        }
    }
};
const mapStateToProps = state => {
    return {
        gameState: state.grid.gameState
    };
};

const SquareContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Square);

export default SquareContainer;