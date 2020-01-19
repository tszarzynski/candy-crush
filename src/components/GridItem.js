import React from "react";
import styles from "./GridItem.module.css";

function GridItem({ color, index, handleClick }) {
  return (
    <li
      className={`${styles.item} ${styles[color] || ""}`}
      onClick={() => handleClick(index)}
    ></li>
  );
}

export default React.memo(GridItem);
