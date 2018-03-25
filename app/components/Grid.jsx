import React from 'react';
import {Row, Col} from 'react-bootstrap';

import {connect} from 'react-redux';
import SquareContainer from './Square';
import constants from '../constants';


class Grid extends React.Component {
    constructor(props) {
        super(props);
    }

    createRow(i) {
        let {grid} = this.props.grid;
        return (
            <div key={i} className="main-row">
                {
                    [...Array(grid[i].length).keys()].map((j) => {
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
        let {grid} = this.props.grid;
        return (
            <div>
                {
                    [...Array(grid.length).keys()].map((i) => {
                        return this.createRow(i)
                    })
                }
            </div>
        );
    }

    render() {
        let gridItems = this.showGrid();
        return (
            <Row className="main-grid">
                <Col mdOffset={4}>
                    {gridItems}
                </Col>
            </Row>
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