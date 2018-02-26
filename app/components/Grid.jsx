import React from 'react';

import Square from './Square';
import constants from '../constants';

console.log('GRID_ROWS', constants.GRID_ROWS);

class Grid extends React.Component {

    renderRow(i) {
        return (
            <div key={i} className="main-row">
                {
                    [...Array(constants.GRID_COLS).keys()].map((j) => {
                        return <Square row={i} column={j} key={i + j}/>
                    })
                }
                <br />
            </div>
        );
    }

    renderGrid() {
        return (
            <div>
                {
                    [...Array(constants.GRID_ROWS).keys()].map((i) => {
                        return this.renderRow(i)
                    })
                }
            </div>
        );
    }


    render() {
        return this.renderGrid();
    }
}

export default Grid;