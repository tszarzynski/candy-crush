import { findNeighbours, dropItems, randomNum } from "../utils";

export const Actions = {
  FIND_NEIGHBOURS: "FindNeighbours"
};

const availableColors = ["red", "green", "blue", "yellow"];
const gridSize = 10;

// creates grid filled with random colour values
const makeGrid = (gridSize, availableColors) =>
  Array.from(
    { length: gridSize * gridSize },
    () => availableColors[randomNum(0, availableColors.length - 1)]
  );

export const initialState = {
  grid: makeGrid(gridSize, availableColors)
};

export const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case Actions.FIND_NEIGHBOURS:
      const { index } = action.payload;

      // find neighbours of clicked item
      const neighbours = findNeighbours(state.grid, gridSize, index);

      // no neighbours
      if (neighbours.length < 2) {
        return state;
      }

      // perform items dropping
      const newGrid = dropItems(state.grid, gridSize, neighbours);

      // check if grid is empty or no more blocks can be removed
      // rebuild grid if necessary
      if (
        newGrid.filter(gridItem => gridItem != null).length === 0 ||
        newGrid.reduce((acc, gridItem, i) => {
          if (gridItem === null) return acc;
          else return acc + findNeighbours(newGrid, gridSize, i).length - 1;
        }, 0) === 0
      )
        return { ...state, grid: makeGrid(gridSize, availableColors) };

      return { ...state, grid: newGrid };

    default:
      return state;
  }
};
