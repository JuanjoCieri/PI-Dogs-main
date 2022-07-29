import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../redux/actions";
import styles from "./SearchBar.module.css"

export default function SearchBar () {

    const dispatch = useDispatch()

    const [name, setName] = useState("")

    const handleInput = (e) => {
        e.preventDefault()
        setName(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault()
        dispatch(getDogByName(name))
        setName("")
    }
       
    return (
        <div className={styles.searchBar}>
            <input className={styles.input} type="Text" value={name} placeholder="Search..." onChange={e => handleInput(e)}/>
            <button className={styles.btn} onClick={e => handleClick(e)}>Search</button>
        </div>
    )
}