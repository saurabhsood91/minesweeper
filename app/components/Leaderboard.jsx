import React from 'react';
import {connect} from 'react-redux';


class Leaderboard extends React.Component {
    render() {
        let {scores} = this.props.scores;
        console.log('SCORES LB', scores);
        let scoreList = scores.map((score) => {
            return (
                <p>
                    {score.ID}
                </p>
            );
        });
        return (
            <div>
                <h4>Leaderboard</h4>
                {scoreList}
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