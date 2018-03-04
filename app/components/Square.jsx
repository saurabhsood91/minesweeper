import React from 'react';
import {connect} from 'react-redux';
import {revealSquares} from '../actions';

class Square extends React.Component {
    constructor(props) {
        super(props);
        // Makes `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    renderMine() {
        let {hasMine} = this.props;
        if(hasMine) {
            return "MINE";
        }
    }

    handleClick() {
        let {row, column} = this.props;
        console.log('SQUARE clicked', row, column);
        this.props.onSquaresRevealed(row, column);
    }

    handleReveal() {
        let {squaresToReveal, row, column, grid} = this.props;
        // console.log("SQUARES TO REVEAL", squaresToReveal);
        if(squaresToReveal.indexOf([row, column]) !== -1) {
            return grid[row][column];
        }
        return null;
    }

    render() {
        return (
            <div className="square align-left" onClick={this.handleClick}>
                {this.renderMine()}
                {this.handleReveal()}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSquaresRevealed: (i, j) => {
            dispatch(revealSquares(i, j));
        }
    }
};
const mapStateToProps = state => {
    return {
        squaresToReveal: state.grid.squaresToReveal,
        grid: state.grid.grid
    };
};

const SquareContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Square);

export default SquareContainer;