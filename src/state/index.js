import { findNeighbours, dropItems, randomNum } from '../utils'

export const Actions = {
    FIND_NEIGHBOURS: 'FindNeighbours'
};

const availableColors = ['red', 'green', 'blue', 'yellow'];
const gridSize = 10;

export const initialState = {
    grid: Array.from({ length: gridSize * gridSize }, () => availableColors[randomNum(0, availableColors.length - 1)])
};

export const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {

        case Actions.FIND_NEIGHBOURS:
            const { index } = action.payload;

            const neighbours = findNeighbours(state.grid, gridSize, index)

            // no neighbours
            if (neighbours.length < 2) {
                return state
            }

            const newGrid = dropItems(state.grid, gridSize, neighbours)

            return { ...state, grid: newGrid };

        default:
            return state;
    }
};