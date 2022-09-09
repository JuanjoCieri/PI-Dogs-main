import React from "react";
import { useState } from "react";

export default function About () {

    const [cont, setCont] = useState(0)

    const sum = () => {
        setCont(cont + 1)
    }

    const rest = () => {
        setCont(cont - 1)
    }

    console.log(cont)

    return (
        <div>
            <div>
                {cont}
            </div>
            <div>
                <button onClick={sum}>Sum</button>
                <button onClick={rest}>Res</button>
            </div>
        </div>
    )
}