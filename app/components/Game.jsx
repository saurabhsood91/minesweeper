import React from 'react';
import {connect} from 'react-redux';
import {Grid} from 'react-bootstrap';

import {submitScore} from '../actions';

import Controls from './Controls';
import GridContainer from './Grid';
import Header from './Header';
import Leaderboard from './Leaderboard';

class Game extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let {rows, cols, totalMines, playerName, seconds, isGameWon} = this.props.gameState;
        let {submitScore, scores} = this.props;
        if(isGameWon) {
            submitScore(rows, cols, totalMines, playerName, seconds);
        }
        return (
            <Grid className="app">
                <Header />
                <GridContainer />
                <br /><br />
                <Controls />
                <Leaderboard scores={scores} />
            </Grid>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        submitScore: (rows, cols, mines, name, seconds) => {
            dispatch(submitScore(rows, cols, mines, name, seconds));
        }
    }
};
const mapStateToProps = (state) => {
    return {
        gameState: state.grid.gameState,
        scores: state.scores.scores
    };
};

const GameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);


export default GameContainer;