import React from 'react';
import {connect} from 'react-redux';
import Score from './Score';

class Leaderboard extends React.Component {
    render() {
        let {scores} = this.props.scores;

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

const mapStateToProps = (state) => {
    return {
        scores: state.scores
    }
};

const mapDispatchToProps =(dispatch) => {
    return {};
};

const LeaderboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Leaderboard);

export default LeaderboardContainer;