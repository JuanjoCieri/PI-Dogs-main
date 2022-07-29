import React from "react";
import styles from "./Card.module.css"
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { deleteDog } from "../redux/actions";


export default function Card ({id, name, image, temperaments, weightMax, weightMin, weight, createdInDb}) {

    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(deleteDog(id))
    // }, [dispatch, id])

    return (
        <div className={styles.all}>
            {/* <div>
                {createdInDb ?
                <button onClick={deleteDog(id)}>X</button>
                : false
                }
            </div> */}
            <div className={styles.image}>
                <img src={image} alt="" width='150px' height="100px"/>
            </div>
            <div className={styles.name}>
                <h2>{name}</h2>
            </div>
            <div className={styles.temps}>
                <h4>Temperaments: {function (temperaments) {
                if (typeof (temperaments) === 'string') {
                    return temperaments;
                }
                if (Array.isArray(temperaments)) {
                    let temps = temperaments.map(el => el.name);
                    return temps.join(', ');
                }
            }(temperaments)}</h4>
            </div>
            <div className={styles.weight}>
                <h4>Weight: {weightMin} - {weightMax} {weight}</h4>
            </div>
        </div>
    )

}