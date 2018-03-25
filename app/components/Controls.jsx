import React from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';

import StatusController from './Status';
import GameControls from './GameControls';

class Controls extends React.Component {
    render() {
        return (
          <Row>
              <Col md={2} mdOffset={2}>
                  <StatusController />
              </Col>
              <Col className="grid-controls" md={2} mdOffset={4}>
                  <GameControls/>
              </Col>

          </Row>
        );
    }
}

export default Controls;