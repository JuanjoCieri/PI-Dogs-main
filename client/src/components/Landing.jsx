import React from "react";
import { Link } from "react-router-dom"
import styles from "./Landing.module.css"
import dog from "../image/dog.png"

export default function Landing () {
    return (
        <div className={styles.all}>
            <h1 className={styles.tittle}>DOGS</h1>
            <h2 className={styles.see}>Enter and see all about dogs...</h2>
            <Link to="/home">
                <button className={styles.button}>ENTER NOW</button>
            </Link>
            <div className={styles.imagee}>
            <img className={styles.image} src={dog} alt=""/>
            </div>
        </div>
    )
}