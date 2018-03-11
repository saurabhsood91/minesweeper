const game = (state = {}, action) => {
    switch(action.type) {
        case 'START_GAME':
            return {
                ...state,
                gameState: {
                    seconds: 0,
                    minesCorrectlyFlagged: 0,
                    isGameOver: false,
                    gameStarted: false
                }
            }
        default:
            return {
                ...state,
                gameState: {}
            }
    }
};

export default game;