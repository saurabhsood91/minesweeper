const scores = (state = {}, action) => {
    switch(action.type) {
        case 'LOAD_SCORES_SUCCESS':
            return {
                scores: action.scores
            }
        default:
            return {
                ...state,
                scores: []
            }
    }
};

export default scores;