import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-yellow-800 flex w-full items-center h-20 justify-around">
      <Link to={"/home"}>
        <button className="text-yellow-500 text-2xl font-semibold">Home</button>
      </Link>
      <Link to={"/form"}>
        <button className="text-yellow-500 text-2xl font-semibold">Create</button>
      </Link>
      <Link to={"/about"}>
        <button className="text-yellow-500 text-2xl font-semibold">About</button>
      </Link>
    </nav>
  );
}
