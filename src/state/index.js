import { findNeighbours, calcFall, performFall } from '../utils'

export const Actions = {
    FIND_NEIGHBOURS: 'FindNeighbours'
};


const availableColors = ['red', 'green', 'blue', 'yellow'];
const gridSize = 10;
const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const initialState = {
    grid: Array.from({ length: gridSize * gridSize }, () => availableColors[randomNum(0, availableColors.length - 1)])
};

export const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {

        case Actions.FIND_NEIGHBOURS:
            const { index } = action.payload;

            const neighbours = findNeighbours(state.grid, index)

            // no neighbours
            if (neighbours.length < 2) {
                return state
            }
            console.log(neighbours)
            const fall = calcFall(state.grid, neighbours);
            console.log(fall)

            const newGrid = performFall(state.grid, fall, neighbours)

            return { ...state, grid: newGrid };

        default:
            return state;
    }
};