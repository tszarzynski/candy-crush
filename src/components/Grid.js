import React, { useCallback, useContext } from "react";
import { Actions } from "../state";
import { StateContext } from "../state/provider";
import styles from "./Grid.module.css";
import GridItem from "./GridItem";

function Grid() {
  const [{ grid }, dispatch] = useContext(StateContext);

  const findNeighbours = useCallback(
    index => dispatch({ type: Actions.FIND_NEIGHBOURS, payload: { index } }),
    [dispatch]
  );

  return (
    <ul className={styles.list}>
      {grid.map((gridItem, index) => (
        <GridItem
          key={`${index}-${gridItem}`}
          color={gridItem}
          index={index}
          handleClick={findNeighbours}
        ></GridItem>
      ))}
    </ul>
  );
}

export default Grid;
