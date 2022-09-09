import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperament } from "../redux/actions";
import Card from "./Card";

export default function DetailTemperament (props) {

    const dispatch = useDispatch()

    let temperament = useSelector((state) => state.temperament)

    console.log(temperament)

    useEffect(() => {
        dispatch(getTemperament(props.match.params.id))
    }, [dispatch])

    return (
        <div>
            <div>
                <h1>{temperament.name}</h1>
            </div>
            <div>
                {temperament.dog.map((d) => (
                    <Card name={d.name} image={d.image} temperaments={d.temperaments} weightMin={d.weightMin} weightMax={d.weightMax} weight={d.weight}/>
                ))}
            </div>
        </div>
    )
}