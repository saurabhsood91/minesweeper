import React from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import {reinitializeGrid} from '../actions';


class GridControls extends React.Component {
    constructor(props) {
        super(props);
        this.recreateGrid = this.recreateGrid.bind(this);
    }

    recreateGrid(e) {
        let {reinitializeGrid} = this.props;
        reinitializeGrid(this.rows.value, this.cols.value, this.mines.value);
    }

    renderRowControl() {
        return (
            <Row className="grid-rows-control">
                <Col md={4}>
                    <b>Rows: </b>
                </Col>
                <Col md={4}>
                    <input type="number" min="1" defaultValue="8" ref={(rows) => this.rows = rows} />
                </Col>
            </Row>
        );
    }

    renderColumnControl() {
        return (
            <Row className="grid-cols-control">
                <Col md={4}>
                    <b>Columns: </b>
                </Col>
                <Col md={4}>
                    <input type="number" min="1" defaultValue="8" ref={(cols) => this.cols = cols} />
                </Col>
            </Row>
        );
    }

    renderNumberOfMinesControl() {
        return (
            <Row className="grid-mines-control">
                <Col md={4}>
                    <b>Mines: </b>
                </Col>
                <Col md={4}>
                    <input type="number" min="1" defaultValue="10" ref={(mines) => this.mines = mines} />
                </Col>

            </Row>
        );
    }

    renderCreateGridButton() {
        return (
            <div>
                <button className="btn btn-danger" onClick={this.recreateGrid}>
                    Recreate Grid
                </button>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderRowControl()}
                {this.renderColumnControl()}
                {this.renderNumberOfMinesControl()}
                <br />
                {this.renderCreateGridButton()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {
        reinitializeGrid: (rows, cols, mines) => {
            dispatch(reinitializeGrid(rows, cols, mines))
        }
    };
};

const GridControlsContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(GridControls);

export default GridControlsContainer;