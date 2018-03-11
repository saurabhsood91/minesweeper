import React from 'react';
import {connect} from 'react-redux';
import {revealSquares} from '../actions';

class Square extends React.Component {
    constructor(props) {
        super(props);
        // Makes `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
    }
    renderSquare() {
        let {hasMine, isRevealed, minesNearMe} = this.props;
        if(hasMine) {
            return "MINE";
        } else {
            if(isRevealed) {
                return minesNearMe;
            }
        }
    }

    handleClick() {
        let {row, column, onSquareClicked} = this.props;
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