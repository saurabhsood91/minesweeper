import React from 'react';
import {getFormattedTime} from '../utils/time';

class Score extends React.Component {
    renderGridSize() {
        let {score} = this.props;
        return `${score.rows}x${score.cols}`;
    }
    render() {
        let {score} = this.props;
        return (
            <tr>
                <td>{score.name}</td>
                <td>{getFormattedTime(score.seconds)}</td>
                <td>{this.renderGridSize()}</td>
                <td>{score.mines}</td>
            </tr>
        );
    }
}

export default Score;