export const randomNum = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const getCoordsFromIndex = (gridSize) => (index) => ({
    x: index % gridSize,
    y: Math.floor(index / gridSize)
});

const getIndexFromCoords = gridSize => ({ x, y }) => y * gridSize + x



export function findNeighbours(grid, gridSize, index) {
    const getCoordsFromIndexForSize = getCoordsFromIndex(gridSize)
    const getIndexFromCoordsForSize = getIndexFromCoords(gridSize)
    const color = grid[index]

    let candidates = [];
    let matches = []
    let point = getCoordsFromIndexForSize(index)
    let nextPoint;
    let pointIndex;

    // add clicked point to the candidates list
    candidates.push(point)

    while (candidates.length > 0) {
        point = candidates.pop();
        pointIndex = getIndexFromCoordsForSize(point)

        // if point already added then ignore
        if (matches.indexOf(pointIndex) !== -1) {
            continue;
        }
        else {
            matches.push(pointIndex);
        }

        // north
        if (point.y - 1 >= 0) {
            nextPoint = { x: point.x, y: point.y - 1 }
            if (grid[getIndexFromCoordsForSize(nextPoint)] === color) {
                candidates.push(nextPoint);
            }
        }
        // east
        if (point.x + 1 < gridSize) {
            nextPoint = { x: point.x + 1, y: point.y }
            if (grid[getIndexFromCoordsForSize(nextPoint)] === color) {
                candidates.push(nextPoint);
            }
        }
        // south
        if (point.y + 1 < gridSize) {
            nextPoint = { x: point.x, y: point.y + 1 }
            if (grid[getIndexFromCoordsForSize(nextPoint)] === color) {
                candidates.push(nextPoint);

            }
        }
        // west
        if (point.x - 1 >= 0) {
            nextPoint = { x: point.x - 1, y: point.y }
            if (grid[getIndexFromCoordsForSize(nextPoint)] === color) {
                candidates.push(nextPoint);
            }
        }
    }

    return matches;
}

export function dropItems(grid, gridSize, itemsToRemove) {
    const getCoordsFromIndexForSize = getCoordsFromIndex(gridSize)
    const getIndexFromCoordsForSize = getIndexFromCoords(gridSize)
    let newGrid = [...grid];

    // find columns that require dropping items
    const columnsToDrop = itemsToRemove.reduce((acc, i) => {
        const point = getCoordsFromIndexForSize(i)
        acc[point.x] = true
        return acc
    }, [])


    columnsToDrop.forEach((col, colIndex) => {

        // find all elements in the column that are not to be deleted
        const column = grid
            .filter((gridItem, i) => (i % 10 === colIndex) && (itemsToRemove.indexOf(i) === -1))


        // overwrite original column with dropped items
        for (let y = 9; y >= 0; y--) {
            newGrid[getIndexFromCoordsForSize({ x: colIndex, y })] = column.pop() || null
        }

    })


    return newGrid
}



