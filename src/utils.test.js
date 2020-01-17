import {
  randomNum,
  getCoordsFromIndex,
  getIndexFromCoords,
  findNeighbours,
  dropItems
} from "./utils";

test("randomNum returns correct results", () => {
  expect(randomNum(0, 10, 0.5)).toBe(5);
});

test("getCoordsFromIndex returns correct results", () => {
  expect(getCoordsFromIndex(10)(20)).toStrictEqual({ x: 0, y: 2 });
});

test("getIndexFromCoords returns correct results", () => {
  expect(getIndexFromCoords(10)({ x: 0, y: 2 })).toBe(20);
});

test("findNeighbours returns correct results", () => {
  let grid = ["green", "green", "green", "green"];

  expect(findNeighbours(grid, 2, 0).sort()).toEqual([0, 1, 2, 3]);

  grid = ["green", "blue", "blue", "blue"];

  expect(findNeighbours(grid, 2, 0).sort()).toEqual([0]);

  grid = ["green", "blue", "blue", "green"];

  expect(findNeighbours(grid, 2, 0).sort()).toEqual([0]);

  grid = ["green", "green", "blue", "blue"];

  expect(findNeighbours(grid, 2, 0).sort()).toEqual([0, 1]);
});

test("dropItems returns correct results", () => {
  let grid = ["green", "blue", "green", "blue"];
  let itemsToRemove = [0, 2];

  expect(dropItems(grid, 2, itemsToRemove)).toEqual([
    null,
    "blue",
    null,
    "blue"
  ]);

  grid = ["green", "green", "blue", "blue"];
  itemsToRemove = [2, 3];

  expect(dropItems(grid, 2, itemsToRemove)).toEqual([
    null,
    null,
    "green",
    "green"
  ]);

  grid = ["green", "green", "blue", "blue"];
  itemsToRemove = [0, 1];

  expect(dropItems(grid, 2, itemsToRemove)).toEqual([
    null,
    null,
    "blue",
    "blue"
  ]);
});
