import React from "react";
import styles from "./Loading.module.css"

export default function Loading () {

    return (
        <div className={styles.all}>
            <h3>Loading...</h3>
            <img src="https://www.gifsanimados.org/data/media/202/perro-imagen-animada-0931.gif" alt="" width="300px"/>
        </div>
    )

}