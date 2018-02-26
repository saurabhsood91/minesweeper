const grid = (state = {}, action) => {
    console.log('ACTION GRID', action.grid);
    switch (action.type) {
        case 'GRID_CREATED':
            return action.grid;
    }
    return state;
}

export default grid;