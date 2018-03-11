import React from 'react';
import {connect} from 'react-redux';
import {revealSquares, flagSquare, gameOver} from '../actions';

class Square extends React.Component {
    constructor(props) {
        super(props);
        // Makes `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
    }
    renderSquare() {
        let {hasMine, isRevealed, isFlagged, minesNearMe} = this.props;
        if(isRevealed) {
            if(hasMine) {
                return "MINE";
            } else {
                return minesNearMe;
            }
        } else if(isFlagged) {
            return 'F';
        }
    }

    handleRightClick(e) {
        e.preventDefault();
        // Flag the square
        let {isFlagged, isQuestionMarked, isRevealed, flagSquare, row, column} = this.props;
        if(!isFlagged && !isQuestionMarked && !isRevealed) {
            // Flag the square
            flagSquare(row, column);
        }
    }

    handleClick(e) {
        let {row, column, onSquareClicked, hasMine, handleGameOver} = this.props;
        if(hasMine) {
            handleGameOver();
        }
        console.log('SQUARE clicked', row, column);
        onSquareClicked(row, column);
    }

    render() {
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
        }
    }
};
const mapStateToProps = state => {
    return {};
};

const SquareContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Square);

export default SquareContainer;