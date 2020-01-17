import React from "react";
import styles from "./GridItem.module.css";


function GridItem({ color, index, onClick }) {
    return (
        <button className={`${styles.btn} ${styles[color] || ''}`} onClick={() => onClick(index)} disabled={color === null}>
        </button >
    );
}

export default GridItem;