import React from "react";
import { Link } from "react-router-dom";

export default function Nothing () {
    return (
        <div>
            <h2>There's nothing here!</h2>
            <Link to={"/home"}>
                <button>Back home</button>
            </Link>
        </div>
    )
}