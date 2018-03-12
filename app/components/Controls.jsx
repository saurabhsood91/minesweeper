import React from 'react';

import {connect} from 'react-redux';

class Controls extends React.Component {
    render() {
        let {isGameOver, isGameWon} = this.props.gameState;
        if(isGameOver) {
            return 'STATUS: YOU LOST!!!';
        } else if(isGameWon) {
            return 'STATUS: YOU WON!!!';
        }
        return 'STATUS:'
    }
}

const mapDispatchToProps = dispatch => {
    return {}
};

const mapStateToProps = state => {
    return {
        gameState: state.grid.gameState
    };
};

const ControlsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Controls);

export default ControlsContainer;