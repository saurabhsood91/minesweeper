import React from 'react';
import {Col, Row} from 'react-bootstrap';

class Header extends React.Component {
    render() {
        return (
            <Row className="show-grid">
                <Col md={4} mdOffset={5}>
                    <h1 className="header">
                        Minesweeper
                    </h1>
                </Col>
            </Row>
        );
    }
}

export default Header;