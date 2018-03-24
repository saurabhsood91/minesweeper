import React from 'react';
import {connect} from 'react-redux';
import {Grid} from 'react-bootstrap';

import {startGame} from '../actions';

import ControlsContainer from './Controls';
import GridContainer from './Grid';
import Header from './Header';

class Game extends React.Component {
    constructor(props) {
        super(props);
        let {startGame} = this.props;
        startGame();
    }
    render() {
        return (
            <Grid>
                <Header />
                <GridContainer />
                <br /><br />
                <ControlsContainer />
            </Grid>
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