import React from 'react';

import {connect} from 'react-redux';
import SquareContainer from './Square';
import constants from '../constants';

import {gridCreated} from '../actions';


class Grid extends React.Component {
    constructor(props) {
        super(props);
    }

    createRow(i) {
        let {grid} = this.props.grid;
        return (
            <div key={i} className="main-row">
                {
                    [...Array(constants.GRID_COLS).keys()].map((j) => {
                        let key = (i * constants.GRID_ROWS) + j;
                        let gridProps = grid[i][j];
                        return <SquareContainer key={key} {...gridProps} />
                    })
                }
                <br />
            </div>
        );
    }

    showGrid() {
        return (
            <div>
                {
                    [...Array(constants.GRID_ROWS).keys()].map((i) => {
                        return this.createRow(i)
                    })
                }
            </div>
        );
    }

    render() {
        let gridItems = this.showGrid();
        return (
            <div>
                {gridItems}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
    };
};

const mapStateToProps = state => {
    return {
        grid: state.grid
    };
};

const GridContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Grid);

export default GridContainer;