import React from "react";
import styles from "./Paginated.module.css"

const Paginate = ({
    DogsPerPage,
    dogState,
    nextPag,
    prevPag,
    CurrentPag,
    firstPag,
    lastPag,
}) => {
    return (
        <nav className={styles.all}>
            <button className={styles.button} onClick={firstPag}>First Page</button>
            <button className={styles.button} disabled={CurrentPag === 1} onClick={prevPag}>Prev</button>
            <button className={styles.button} disabled={CurrentPag === Math.ceil(dogState / DogsPerPage)} onClick={nextPag}>Next</button>
            <button className={styles.button} onClick={lastPag}>Last Page</button>
        </nav>
    )
}

export default Paginate