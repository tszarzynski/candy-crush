const getCoordsFromIndex = (gridSize) => (index) => ({
    x: index % gridSize,
    y: Math.floor(index / gridSize)
});
const getCoordsFromIndex10 = getCoordsFromIndex(10)
const getIndexFromCoords = gridSize => ({ x, y }) => y * gridSize + x
const getIndexFromCoords10 = getIndexFromCoords(10)


export function findNeighbours(grid, index) {
    let candidates = [];
    let matches = []
    let point = getCoordsFromIndex10(index)
    let pointIndex;

    const gridSize = 10;
    const color = grid[index]

    // add clicked point to the candidates list
    candidates.push(point)

    while (candidates.length > 0) {
        point = candidates.pop();
        pointIndex = getIndexFromCoords10(point)


        if (matches.indexOf(pointIndex) !== -1) {
            continue;
        }
        else {
            matches.push(pointIndex);
        }

        // north
        if (point.y - 1 >= 0) {
            if (grid[getIndexFromCoords10({ x: point.x, y: point.y - 1 })] === color) {
                candidates.push({ x: point.x, y: point.y - 1 });
            }
        }
        // east
        if (point.x + 1 < gridSize) {
            if (grid[getIndexFromCoords10({ x: point.x + 1, y: point.y })] === color) {
                candidates.push({ x: point.x + 1, y: point.y });
            }
        }
        // south
        if (point.y + 1 < gridSize) {

            if (grid[getIndexFromCoords10({ x: point.x, y: point.y + 1 })] === color) {
                candidates.push({ x: point.x, y: point.y + 1 });

            }
        }
        // west
        if (point.x - 1 >= 0) {
            if (grid[getIndexFromCoords10({ x: point.x - 1, y: point.y })] === color) {
                candidates.push({ x: point.x - 1, y: point.y });
            }
        }
    }

    return matches;
}

export function dropItems(grid, itemsToRemove) {
    let newGrid = [...grid];

    const columnsToDrop = itemsToRemove.reduce((acc, i) => {
        const point = getCoordsFromIndex10(i)
        acc[point.x] = true
        return acc
    }, [])

    columnsToDrop.forEach((col, colIndex) => {

        const column = grid
            .filter((gridItem, i) => (i % 10 === colIndex) && (itemsToRemove.indexOf(i) === -1))


        for (let y = 9; y >= 0; y--) {
            newGrid[getIndexFromCoords10({ x: colIndex, y })] = column.pop() || null
        }

    })


    return newGrid
}



