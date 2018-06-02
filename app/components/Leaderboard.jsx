import React from 'react';
import Score from './Score';

class Leaderboard extends React.Component {
    render() {
        let {scores} = this.props;

        let scoreList = scores.map((score) => {
            return (
                <Score score={score} key={score.ID}></Score>
            );
        });

        return (
            <div>
                <h4>Leaderboard</h4>
                <table className="leaderboard">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Time</th>
                            <th>Grid</th>
                            <th># Mines</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scoreList}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Leaderboard;