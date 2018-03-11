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
    }

    render() {
        return (
            <div className="square align-left" onClick={this.handleClick}>
                {this.renderMine()}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
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