import React from "react";
import styles from "./Card.module.css"

export default function Card ({id, name, image, temperaments, weightMax, weightMin, weight, createdInDb}) {

    return (
        <div className={styles.all}>
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
                {createdInDb ?
                <h4>Weight: {weight} Kg</h4> :
                <h4>Weight: {weightMin} - {weightMax} Kg</h4>}
            </div>
        </div>
    )

}