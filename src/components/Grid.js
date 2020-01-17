import React, { useCallback } from "react";
import { Actions } from "../state";
import { useStateValue } from "../state/provider";
import styles from "./Grid.module.css";
import GridItem from "./GridItem";


function Grid() {
    const [{ grid }, dispatch] = useStateValue();

    const findNeighbours = useCallback(
        index => dispatch({ type: Actions.FIND_NEIGHBOURS, payload: { index } }),
        [dispatch]
    );

    const gridItems = grid.map((gridItem, index) => <li className={styles.listItem} key={index}><GridItem color={gridItem} index={index} onClick={findNeighbours}></GridItem></li>);

    return (<ul className={styles.list}>{gridItems}</ul>)
}

export default Grid;