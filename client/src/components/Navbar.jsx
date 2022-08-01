import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css"

export default function Navbar () {
    
    return (
        <div className={styles.nav}>
            <div className={styles.navAll}>
                <Link to={"/home"}>
                    <button className={styles.button}>Home</button>
                </Link>
                <Link to={"/form"}>
                    <button className={styles.button}>Create</button>
                </Link>
                {/* <Link to={"/about"}> */}
                    <button className={styles.button}>About</button>
                {/* </Link> */}
            </div>
        </div>
    )

}