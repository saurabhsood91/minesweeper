import React from 'react';
import {connect} from 'react-redux';

import {startGame} from '../actions';

import ControlsContainer from './Controls';
import GridContainer from './Grid';

class Game extends React.Component {
    constructor(props) {
        super(props);
        let {startGame} = this.props;
        startGame();
    }
    render() {
        return (
            <div>
                <GridContainer />
                <br /><br />
                <ControlsContainer />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        startGame: () => {
            dispatch(startGame())
        }
    }
};
const mapStateToProps = (state) => {
    return {
        gameState: state.grid.gameState
    };
};

const GameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);


export default GameContainer;