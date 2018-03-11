import React from 'react';
import {connect} from 'react-redux';

import {startGame} from '../actions';

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
const mapStateToProps = () => {
    return {};
};

const GameContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);


export default GameContainer;