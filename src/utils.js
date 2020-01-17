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

export function calcFall(grid, matches) {
    const fall = matches.reduce((acc, i) => {

        const point = getCoordsFromIndex10(i)
        console.log(point)
        if (acc[point.x]) {
            acc[point.x] = { count: acc[point.x].count + 1, base: Math.max(acc[point.x].base, point.y) }
        } else {
            acc[point.x] = { count: 1, base: point.y };
        }

        return acc
    }, [])
    return fall
}

export function performFall(grid, fall, neighbours) {

    let newGrid = [];

    for (let i = grid.length - 1; i >= 0; i--) {
        let gridItem = grid[i];
        let point = getCoordsFromIndex10(i);
        const isNeighbour = neighbours.indexOf(i) !== -1

        // check if point belongs to column that needs to fall
        let f = fall[point.x];
        if (f && f.base > point.y && !isNeighbour) {
            let newPoint = { x: point.x, y: point.y + f.count }

            newGrid[getIndexFromCoords10(newPoint)] = gridItem;

            if (point.y < f.count) {
                newGrid[i] = null
            }
        } else if (isNeighbour) {
            newGrid[i] = null

        } else {
            newGrid[i] = gridItem
        }
    }

    return newGrid;

}