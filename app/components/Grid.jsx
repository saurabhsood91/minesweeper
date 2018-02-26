import React from 'react';

import Square from './Square';
import constants from '../constants';

class Grid extends React.Component {
    constructor(props) {
        super(props);

        // create a list of grid items
        this.items = this.createGrid();
        console.log('Items', this.items);
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

    createGrid() {
        let mineNumbers = this.seedGrid();
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

export default Grid;