import React from 'react';

import {connect} from 'react-redux';
import Square from './Square';
import constants from '../constants';

import {gridCreated} from '../actions';


const getGridFromMineNumbers = (mineNumbers) => {
    console.log('MINE GRID', mineNumbers);
    let grid = [];
    let k = 0;
    for(let i = 0; i < constants.GRID_ROWS; i++) {
        let row = [];
        for(let j = 0; j < constants.GRID_COLS; j++) {
            if(mineNumbers.indexOf(k) !== -1) {
                // MINE = 1
                // NO MINE = 0
                row.push(1)
            } else {
                row.push(0)
            }
        }
        grid.push(row);
    }
    return grid;
};


class Grid extends React.Component {
    constructor(props) {
        super(props);

        // Create Mines
        let mineNumbers = this.seedGrid();

        // create a list of grid items
        this.items = this.createGrid(mineNumbers);

        // Create the grid
        let grid = getGridFromMineNumbers(mineNumbers);
        console.log('GRID', grid);
        //Dispatch the grid created action
        this.props.onGridCreated(grid);

    }

    createRow(i, mineNumbers) {
        return (
            <div key={i} className="main-row">
                {
                    [...Array(constants.GRID_COLS).keys()].map((j) => {
                        let indexSum = (i * constants.GRID_ROWS) + j;
                        if(mineNumbers.indexOf(indexSum) !== -1) {
                            return <Square row={i} column={j} key={indexSum} hasMine={true} />
                        }
                        return <Square row={i} column={j} key={indexSum} hasMine={false} />
                    })
                }
                <br />
            </div>
        );
    }

    createGrid(mineNumbers) {

        return (
            <div>
                {
                    [...Array(constants.GRID_ROWS).keys()].map((i) => {
                        return this.createRow(i, mineNumbers)
                    })
                }
            </div>
        );
    }

    seedGrid() {
        let mineCount = 0;
        let mineNumbers = [];
        let max = (constants.GRID_COLS * constants.GRID_ROWS) - 1;
        while(mineCount != constants.MAX_MINES) {
            // console.log('MINE COUNT', mineCount);
            // get a number between 0 and 63.
            // If we already used this number, fetch another one
            let seedNumber = Math.floor(Math.random() * Math.floor(max));
            // console.log('SEED NUMBER', seedNumber);
            if(mineNumbers.indexOf(seedNumber) !== -1) {
                continue;
            } else {
                mineNumbers.push(seedNumber);
                mineCount += 1;
            }
        }
        console.log('MINE NUMBERS', mineNumbers);
        return mineNumbers;
    }


    render() {

        return (
            <div>
                {this.items}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGridCreated: grid => {
            dispatch(gridCreated(grid));
        }
    };
};

const mapStateToProps = state => {
    return state;
};

const GridContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Grid);

export default GridContainer;