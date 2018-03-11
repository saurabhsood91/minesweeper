import React from 'react';
import {connect} from 'react-redux';
import {revealSquares, gameOver} from '../actions';

class Square extends React.Component {
    constructor(props) {
        super(props);
        // Makes `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    renderSquare() {
        let {hasMine, isRevealed, minesNearMe} = this.props;
        if(isRevealed) {
            if(hasMine) {
                return "MINE";
            } else {
                return minesNearMe;
            }
        }
    }

    handleClick() {
        let {row, column, onSquareClicked, hasMine, handleGameOver} = this.props;
        if(hasMine) {
            handleGameOver();
        }
        console.log('SQUARE clicked', row, column);
        onSquareClicked(row, column);
    }

    render() {
        return (
            <div className="square align-left" onClick={this.handleClick}>
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