import React from 'react';
import {connect} from 'react-redux';

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
            <div>
                <p><b>Number of Rows</b></p>
                <input type="number" min="8" defaultValue="8" ref={(rows) => this.rows = rows} />
            </div>
        );
    }

    renderColumnControl() {
        return (
            <div>
                <p><b>Number of Columns</b></p>
                <input type="number" min="8" defaultValue="8" ref={(cols) => this.cols = cols} />
            </div>
        );
    }

    renderNumberOfMinesControl() {
        return (
            <div>
                <p><b>Number of Mines</b></p>
                <input type="number" min="10" defaultValue="10" ref={(mines) => this.mines = mines} />
            </div>
        );
    }

    renderCreateGridButton() {
        return (
            <div>
                <button onClick={this.recreateGrid}>
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