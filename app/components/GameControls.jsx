import React from 'react';
import {Row} from 'react-bootstrap';

import GameButtonsContainer from './GameButtons';
import GridControlsContainer from './GridControls';

class GameControls extends React.Component {
    render() {
        return (
            <Row className="game-controls">
                <GameButtonsContainer/>
                <GridControlsContainer/>
            </Row>
        );
    }
}

export default GameControls;