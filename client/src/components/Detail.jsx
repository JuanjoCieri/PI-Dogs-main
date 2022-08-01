import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDog, clearDetails } from "../redux/actions";
import styles from "./Detail.module.css"
import Navbar from "./Navbar";
import Loading from "./Loading";

export default function Detail (props) {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDog(props.match.params.id))
        return () => {
            dispatch(clearDetails())
        }
    }, [dispatch])

    const dog = useSelector((state) => state.dog)

    return (
        <div className={styles.all}>
            {Object.entries(dog).length === 0 ? (<Loading />) : (
                <div className={styles.all}>
                    <div className={styles.Navbar}>
                        <Navbar />
                    </div> 
                    <div className={styles.details}>
                        <h1 className={styles.name}>{dog.name}</h1>
                        <img className={styles.image} src={dog.image} alt="" width="200px"/>
                        <h3 className={styles.temperaments}>Temperaments: {dog.temperament}</h3>
                        <h4 className={styles.height}>Height: {dog.height} Cm</h4>
                        <h4 className={styles.height}>Weight: {dog.weight} {dog.weight_min} Kg</h4>
                        <h4 className={styles.life}>{dog.life_span}</h4>
                    </div>     
                </div>
            )}
        </div>
    )
}